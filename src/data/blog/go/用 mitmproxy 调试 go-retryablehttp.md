---
title: "用 mitmproxy 调试 go-retryablehttp"
author: "Charles"
description: ""
tags:
  - go
slug: "go-retryablehttp"
pubDatetime: 2025-03-20T20:06:11.000+08:00
modDatetime: 2025-03-20T20:06:11.000+08:00
featured: false
draft: false
---

服务调用外部接口时要处理异常状态，**502 Bad Gateway** 需要进行自动重试。本文将结合 **mitmproxy** 和 Go 的 **retryablehttp** 库，演示如何模拟接口 502 错误并调试重试逻辑，助你构建健壮的 HTTP 请求处理机制。

---

## 工具与环境准备
1. **mitmproxy**  
   Windows 到[官网](https://www.mitmproxy.org/)手动下载安装
   ```bash
   brew install mitmproxy
   ```

3. **Go RetryableHttp**  
   ```bash
   go get github.com/hashicorp/go-retryablehttp
   ```

4. **证书**  
   mitmproxy 需[安装 CA 证书](https://docs.mitmproxy.org/stable/concepts-certificates/#installing-the-mitmproxy-ca-certificate-manually)以拦截 HTTPS 流量。
   ```bash
   sudo security add-trusted-cert -d -p ssl -p basic -k /Library/Keychains/System.keychain ~/.mitmproxy/mitmproxy-ca-cert.pem
   ```

---

## mitmproxy 脚本
```python
# 文件名：simulate_502.py
from mitmproxy import http

class Simulate502:
    def __init__(self):
        self.intercept_count = 0

    def request(self, flow: http.HTTPFlow):
        ctx.log.info(f"[请求] 收到请求: {flow.request.pretty_url}")

        if "gitlab" in flow.request.pretty_url or "github" in flow.request.pretty_url:
            if self.intercept_count < 3:
                flow.response = http.Response.make(
                    502,
                    b"Blocked by Mitmproxy",
                    {"Content-Type": "text/plain"}
                )
                self.intercept_count += 1
                ctx.log.info(f"[拦截] 第 {self.intercept_count} 次阻断请求: {flow.request.url}")
            else:
                ctx.log.info("[放行] 已达最大拦截次数，流量正常转发")

addons = [Simulate502()]
```

启动代理服务：
```bash
mitmweb -p 8888 -s simulate_502.py  # 启动 Web 界面便于调试
```

---

## Go 客户端
```go
package main

import (
	"log"
	"net/http"
	"net/url"
	"time"

	"github.com/hashicorp/go-retryablehttp"
)

func main() {
	// 1. 创建 retryablehttp 客户端
	client := retryablehttp.NewClient()
	client.RetryMax = 4                // 最大重试次数
	client.RetryWaitMin = 1 * time.Second // 最小重试间隔
	client.RetryWaitMax = 5 * time.Second // 最大重试间隔

	// 2. 设置代理（指向 mitmproxy）
	proxyURL, _ := url.Parse("http://localhost:8888")
	client.HTTPClient.Transport = &http.Transport{
		Proxy: http.ProxyURL(proxyURL),
	}

	// 3. 发起请求并处理重试
	req, _ := retryablehttp.NewRequest("GET", "https://github.com", nil)
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("请求失败: %v", err)
	}
	defer resp.Body.Close()

	log.Printf("最终状态码: %d", resp.StatusCode)
}
```

**官方网站**：  
• [mitmproxy](https://mitmproxy.org/)  
• [go-retryablehttp](https://github.com/hashicorp/go-retryablehttp)

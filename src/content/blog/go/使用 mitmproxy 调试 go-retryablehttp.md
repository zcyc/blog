---
title: "使用 mitmproxy 调试 go-retryablehttp"
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

在分布式系统中，接口稳定性至关重要。当服务端返回 **502 Bad Gateway** 时，客户端需要具备自动重试能力以保障业务连续性。本文将结合 **mitmproxy** 和 Go 的 **retryablehttp** 库，演示如何模拟接口 502 错误并调试重试逻辑，助你构建健壮的 HTTP 请求处理机制。

---

#### 一、工具与环境准备
1. **mitmproxy**  
   一个开源的 HTTP 代理工具，支持拦截、修改请求和响应。通过其脚本功能，可动态返回 502 状态码以模拟服务端错误。
   ```bash
   brew install mitmproxy  # 安装命令
   ```

2. **Go RetryableHttp**  
   基于 Go 标准库 `net/http` 的增强库，提供自动重试、超时控制等功能，适用于处理临时性网络故障。
   ```bash
   go get github.com/hashicorp/go-retryablehttp
   ```

3. **证书配置**  
   mitmproxy 需[安装 CA 证书](https://docs.mitmproxy.org/stable/concepts-certificates/#installing-the-mitmproxy-ca-certificate-manually)以拦截 HTTPS 流量。
   ```bash
   sudo security add-trusted-cert -d -p ssl -p basic -k /Library/Keychains/System.keychain ~/.mitmproxy/mitmproxy-ca-cert.pem
   ```

---

#### 二、mitmproxy 脚本：动态返回 502 错误
通过编写 Python 脚本，拦截目标接口并修改其响应状态码：
```python
# 文件名：simulate_502.py
from mitmproxy import http

class Simulate502:
    def response(self, flow: http.HTTPFlow):
        # 匹配目标接口（按需修改URL）
        if "your-api-endpoint" in flow.request.url:
            # 强制返回 502 状态码和自定义内容
            flow.response = http.Response.make(
                502,
                b"Bad Gateway Simulation",
                {"Content-Type": "text/plain"}
            )

addons = [Simulate502()]
```
**关键点**：
• 使用 `response` 钩子拦截请求，修改状态码为 502。
• 可通过正则表达式匹配多个接口或动态控制触发条件。

启动代理服务：
```bash
mitmweb -p 8888 -s simulate_502.py  # 启动 Web 界面便于调试
```

---

#### 三、Go 客户端：配置 RetryableHttp 重试逻辑
以下代码演示如何集成 retryablehttp，并针对 502 错误设置重试策略：
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
	client.RetryMax = 3                // 最大重试次数
	client.RetryWaitMin = 1 * time.Second // 最小重试间隔
	client.RetryWaitMax = 5 * time.Second // 最大重试间隔

	// 2. 设置代理（指向 mitmproxy）
	proxyURL, _ := url.Parse("http://localhost:8888")
	client.HTTPClient.Transport = &http.Transport{
		Proxy: http.ProxyURL(proxyURL),
	}

	// 3. 发起请求并处理重试
	req, _ := retryablehttp.NewRequest("GET", "https://your-api-endpoint", nil)
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("请求失败: %v", err)
	}
	defer resp.Body.Close()

	log.Printf("最终状态码: %d", resp.StatusCode)
}
```
**关键配置**：
• **重试条件**：默认对 5xx 错误和网络问题自动重试。
• **代理集成**：通过 `http.Transport` 指向 mitmproxy，确保流量经过代理。
• **日志调试**：启用 `client.Logger` 可输出详细重试日志。

---

#### 四、测试与验证
1. **启动 mitmproxy** 和 Go 程序，观察代理界面是否捕获请求。
2. **检查重试行为**：客户端应尝试 3 次请求（首次 + 2 次重试），最终输出日志如下：
   ```
   2025/03/20 12:00:00 最终状态码: 502
   ```
3. **进阶调试**：
   • 修改脚本，使 502 错误**随机触发**，模拟真实环境的不稳定性。
   • 结合 **Appium** 或自动化框架，实现端到端测试流程。

---

#### 五、常见问题与解决方案
| 问题                          | 解决方法                                                                 |
|-------------------------------|--------------------------------------------------------------------------|
| HTTPS 证书错误                 | 在 Go 客户端中跳过证书验证：`Transport.TLSClientConfig.InsecureSkipVerify = true` |
| 代理未生效                     | 检查防火墙设置，确保 mitmproxy 监听端口与客户端配置一致             |
| 重试策略不符合预期             | 自定义 `CheckRetry` 函数，按业务需求过滤状态码                     |

---

#### 六、总结
通过 mitmproxy 模拟接口异常，开发者能够低成本验证客户端的容错能力。结合 retryablehttp 的重试机制，可显著提升系统在弱网或服务端故障场景下的鲁棒性。这一方案已在实际项目中验证，尤其适用于金融、电商等高可靠性要求的领域。

**官方网站**：  
• [mitmproxy](https://mitmproxy.org/)  
• [go-retryablehttp](https://github.com/hashicorp/go-retryablehttp)

---
title: "使用 whistle 调试 resty"
author: "Charles"
description: ""
tags:
  - go
slug: "go-resty"
pubDatetime: 2025-12-04T15:06:11.000+08:00
modDatetime: 2025-12-04T19:26:11.000+08:00
featured: false
draft: false
---

服务调用外部接口时要处理异常状态，**502 Bad Gateway** 需要进行自动重试。本文将结合 **whistle** 和 Go 的 **resty** 库，演示如何模拟接口 502 错误并调试重试逻辑，助你构建健壮的 HTTP 请求处理机制。

之前写过另一篇文章，[《使用 mitmproxy 调试 go-retryablehttp》](https://blog.d8s.fun/posts/go/go-retryablehttp/)。

---

## 工具与环境准备
1. **whistle**  
   ```bash
   npm i -g whistle
   ```
2. **lack**  
   ```bash
   npm i -g lack
   ```

3. **resty**  
   ```bash
   go get resty.dev/v3
   ```

4. **证书**  
   whistle 需[安装 CA 证书](https://github.com/avwo/whistle#%E5%AE%89%E8%A3%85)以拦截 HTTPS 流量。
   ```bash
   w2 ca
   ```

---

## whistle 脚本
使用 lack init 初始化 rulesServer 项目，并将 rulesServer.js 替换为以下内容：
```javascript
const requestCountMap = {};

export default (server, options) => {
  server.on('request', (req, res) => {
    const fullUrl = req.originalReq.fullUrl || '';
    const host = req.originalReq.hostValue || '';

    if (!/github/i.test(fullUrl) && !/github/i.test(host)) {
      res.end('');
      return;
    }

    const currentCount = (requestCountMap[host] || 0) + 1;
    requestCountMap[host] = currentCount;

    console.log(`[RulesServer] 主机: ${host}, 计数: ${currentCount}`);

    if (currentCount <= 3) {
      console.log(` -> 第${currentCount}次，返回502拦截规则`);
      const rule = `${fullUrl} statusCode://502 resBody://"Blocked by Whistle"`;
      res.end(rule);
    } else {
      res.end('');
    }
  });
};
```

启动 whistle：
```bash
w2 start
```

启动插件：
```bash
lack watch
```

---

## Go 客户端
```go
package main

import (
	"log"
	"time"

	"resty.dev/v3"
)

func main() {
	// 1. 创建 Resty 客户端
	client := resty.New().
		SetRetryCount(4).                    // 最大重试次数
		SetRetryWaitTime(1 * time.Second).   // 最小重试间隔
		SetRetryMaxWaitTime(5 * time.Second) // 最大重试间隔
	defer client.Close()

	// 2. 设置代理（指向 mitmproxy）
	client.SetProxy("http://localhost:8899")

	// 3. 发起请求并处理重试
	resp, err := client.R().
		Get("https://github.com")
	if err != nil {
		log.Fatalf("请求失败: %v", err)
	}

	log.Printf("最终状态码: %d", resp.StatusCode())
}
```

**官方网站**：  
• [whistle](https://github.com/avwo/whistle)  
• [lack](https://github.com/avwo/lack)  
• [Resty](https://github.com/go-resty/resty)


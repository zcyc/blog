---
title: "nginx allow iframe"
author: "Charles"
description: "Nginx 允许 iframe 和跨站 Set-Cookie"
tags:
  - nginx
slug: "nginx-allow-iframe"
pubDatetime: 2024-04-18T12:26:31.000+08:00
featured: false
draft: false
---

# 配置允许同源 iframe 和指定域名 iframe

```
add_header Content-Security-Policy "frame-ancestors 'self' *.test.com *.test.cn";
```

# 配置允许跨站 Set-Cookie

```
add_header Set-Cookie "SameSite=None; Secure" always;
```

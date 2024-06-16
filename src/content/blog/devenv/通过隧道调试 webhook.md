---
title: "通过隧道调试 webhook"
author: "Charles"
description: ""
tags:
  - env
slug: "devtunnel"
pubDatetime: 2024-06-16T16:39:32.000+08:00
featured: false
draft: false
---

最近调试 GitHub Webhook 需要用隧道，所以试用了市面上的各种隧道

# [smee](https://smee.io)

## 安装 cli
```bash
npm install --global smee-client
```

## 启动隧道
```bash
smee --url https://smee.io/new --path /integration/github/v3/webhook --port 8080
```

# [ngrok](https://dashboard.ngrok.com/)

## 安装 cli
```bash
brew install ngrok/ngrok/ngrok
```

## 写入 token
登录后查看 token
```bash
ngrok config add-authtoken XXX
```

## 启动隧道
```bash
ngrok http http://localhost:8080
```

# [dev tunnel](https://learn.microsoft.com/en-us/azure/developer/dev-tunnels/get-started?tabs=macos#install)

## 安装 cli
brew 安装启动时提示版本过旧
```bash
curl -sL https://aka.ms/DevTunnelCliInstall | bash
```

## 登录
-g 是 GitHub 登录，否则是微软登录
```bash
devtunnel user login -g
```

## 启动隧道
```bash
devtunnel host -p 8080
```
---
title: "WebRTC 基础服务搭建"
author: "Charles"
description: ""
tags:
  - WebRTC
ogImage: ""
slug: "webrtc-basic-service-setup"
pubDatetime: 2022-09-17T14:52:17.000Z
modDatetime: 2023-07-26T05:53:04.000Z
featured: false
draft: false
---

# WebSocket

## 搭建方法

搭建一个简易聊天室，用来交换 SDP，商用要根据业务需求和模型自己开发。

### 端口

tcp 8199

### 命令

```bash
./websocat.x86_64-unknown-linux-musl -t -E ws-l:127.0.0.1:8199 broadcast:mirror:&
```

## 下载地址

<https://github.com/vi/websocat/releases>

# WebRTC

## 搭建方法

### 端口

tcp 3478、5349、49152-65535
udp 3478、5349、49152-65535

### 命令

```bash
apt install coturn
vim /etc/turnserver.conf
systemctl restart coturn.service
```

```
listening-ip=0.0.0.0
external-ip=8.135.102.130
syslog
```

## 公开节点

无法 P2P 通信时使用中转服务器作为 ICE，可以用公开的测试节点，商用要自己搭建。
<https://gist.github.com/yetithefoot/7592580>

## 下载地址

<https://github.com/coturn/coturn/releases>

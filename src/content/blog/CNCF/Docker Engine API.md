---
title: "Docker Engine API"
author: "Charles"
description: ""
tags:
  - Docker
ogImage: ""
slug: "docker-engine-api"
pubDatetime: 2022-07-31T11:08:17.000Z
modDatetime: 2022-09-17T15:53:55.000Z
featured: false
draft: false
---

## macOS 无法访问 Docker Engine API
macOS Docker 默认未开启 Engine API，需要手动 fork socket 接口。

### Docker 方式
TCP-LISTEN 哪个端口，就要 -p 哪个端口。
```
docker run -it -d --name=socat -p 2375:2375 -v /var/run/docker.sock:/var/run/docker.sock bobrik/socat TCP-LISTEN:2375,fork,reuseaddr UNIX-CONNECT:/var/run/docker.sock
```

### socat 方式

#### 安装
```
brew install socat
```

#### 启动
```
socat TCP-LISTEN:2375,fork UNIX:/var/run/docker.sock
```

## API 文档
[https://docs.docker.com/engine/api/](https://docs.docker.com/engine/api/)
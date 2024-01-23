---
title: "SSH 相关"
author: "Charles"
description: ""
tags:
  - Linux
ogImage: ""
slug: "ssh"
pubDatetime: 2021-01-08T06:27:22.000Z
modDatetime: 2022-08-02T01:59:05.000Z
featured: false
draft: false
---

# 生成中间没有分隔符的 uuid

```shell
uuidgen | sed 's/-//g'
```

# 生成 ssh 密钥

```shell
ssh-keygen -t rsa -C "root@test.com"
```

# 复制过来的 ssh 提示不存在、不可用

```shell
#如果从其他地方拷贝了 .ssh 过来记得修改权限，不管从什么系统拷到什么系统，都会有权限问题。
chmod 755 ~/.ssh/
chmod 600 ~/.ssh/id_rsa ~/.ssh/id_rsa.pub
chmod 644 ~/.ssh/known_hosts
```

# 服务器端口映射到本地

```shell
#　将靶机端口映射到本地，前边是本地端口，后边是靶机端口，前边是本地IP，后边是服务器IP
ssh -L 3308:127.0.0.1:3306 -N -T root@192.168.1.2

#　通过跳板机将靶机端口映射到本地，前边是本地端口，后边是靶机端口，前边是跳板机IP，后边是靶机IP
ssh -fNg -i ~/.ssh/pub.key -p 22 root@跳板机 -L3308:靶机:3306 -v
```

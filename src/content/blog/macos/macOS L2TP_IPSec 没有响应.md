---
title: "macOS L2TP/IPSec 没有响应"
author: "Charles"
description: ""
tags:
  - macos
ogImage: ""
slug: "macos-l2tp-no-response"
pubDatetime: 2021-01-09T17:03:09.000+08:00
modDatetime: 2022-01-17T09:58:24.000+08:00
featured: false
draft: false
---

```shell
#由于国内运营商对 PPTP 封锁，所以自己本地组网必须使用 L2TP，和各大运营商确认过，L2TP 是不封锁的。
sudo vim /etc/ppp/options

#然后在文件中输入
plugin L2TP.ppp

```

---
title: "Flutter 遇到的问题"
author: "Charles"
description: ""
tags:
  - flutter
ogImage: ""
slug: "flutter-problems"
pubDatetime: 2020-10-22T07:58:04.000+08:00
modDatetime: 2021-08-11T17:27:05.000+08:00
featured: false
draft: false
---

# 进程锁

当你遇到 Waiting for another flutter command to release the startup lock

```shell
# Mac or Linux
killall -9 dart

# Windows
taskkill /F /IM dart.exe
```

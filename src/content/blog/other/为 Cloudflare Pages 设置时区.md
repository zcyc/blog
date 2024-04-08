---
title: "为 Cloudflare Pages 设置时区"
author: "Charles"
description: ""
tags:
  - other
ogImage: ""
slug: "cloudflare-pages-timezone"
pubDatetime: 2024-04-08T10:51:50.000+08:00
featured: false
draft: false
---

hugo、astro 等静态站点工具通过 Cloudflare Pages 编译时使用 0 时区 format 时间，导致显示时间比实际时间早 8 个小时，需要手动设置环境变量 TZ。

![Untitled](/assets/cloudflare-1.jpg)

[点我查看常用时区](https://help.aliyun.com/zh/maxcompute/user-guide/time-zones)

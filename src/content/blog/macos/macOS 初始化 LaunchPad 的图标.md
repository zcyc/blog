---
title: "macOS 初始化 LaunchPad 的图标"
author: "Charles"
description: ""
tags:
  - macos
ogImage: ""
slug: "macos-launchpad-reset"
pubDatetime: 2021-08-17T08:23:04.000+08:00
modDatetime: 2022-05-20T02:52:23.000+08:00
featured: false
draft: false
---

如果你 LaunchPad 有很多图标，摆来摆去不好看，总是有图标莫名奇妙的从你的图标夹跑出来，那不如直接让他默认全部展开。
这样的话第一页就是苹果官方的应用，后边就是你下载的应用，看起来乱，但是乱出了规律。

```bash
defaults write com.apple.dock ResetLaunchPad -bool true && killall Dock
```

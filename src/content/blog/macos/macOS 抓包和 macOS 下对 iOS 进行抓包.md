---
title: "macOS 抓包和 macOS 下对 iOS 进行抓包"
author: "Charles"
description: ""
tags:
  - macos
ogImage: ""
slug: "macos-wireshark-ios"
pubDatetime: 2021-08-11T16:53:03.000+08:00
modDatetime: 2021-12-15T08:55:33.000+08:00
featured: false
draft: false
---

# 环境

macOS 11.5.1 
iOS 14.7.1

# charles

## 按照官方教程步骤安装ssl证书

需要安装并且信任

## 然后设置ssl proxy

ip和port都填\*就行了

### 注意

如果只抓手机的话把 mac proxy 关掉，否则太多包影响查看

# wireshark

## 载入调试模块

```bash
sudo launchctl load -w /Library/Apple/System/Library/LaunchDaemons/com.apple.rpmuxd.plist
```

## 连接设备

rvictl -s 00008101-**\*\***\***\*\***

### 注意

首次连接需要重启系统载入调试模块

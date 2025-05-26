---
title: "macOS 常用命令备忘"
author: "Charles"
description: ""
tags:
  - macos
slug: "macos-command"
pubDatetime: 2021-11-12T07:15:05.000+08:00
modDatetime: 2022-06-29T15:45:18.000+08:00
featured: false
draft: false
---

# 一键更新 brew

```bash
brew update && brew upgrade && brew upgrade --greedy
```

# 隐藏桌面

```bash
defaults write com.apple.finder CreateDesktop -bool false && killall Finder
```

# 显示桌面

```bash
defaults write com.apple.finder CreateDesktop -bool true && killall Finder
```

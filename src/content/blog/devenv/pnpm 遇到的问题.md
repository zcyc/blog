---
title: "pnpm 遇到的问题"
author: "Charles"
description: ""
tags:
  - tool
slug: "pnpm-problems"
pubDatetime: 2024-04-02T10:09:32.000+08:00
featured: false
draft: false
---

## 问题
用 brew 安装 node，npm 安装 pnpm，执行 pnpm 命令报错不存在

## 原因
brew 安装 node 后提示将 bin 目录加入 PATH，未按要求操作导致。

## 解决方案
向 .zshrc 中写入以下内容，注意路径中的版本号：
```bash
export PATH="/opt/homebrew/opt/node@20/bin:$PATH"
export LDFLAGS="-L/opt/homebrew/opt/node@20/lib"
export CPPFLAGS="-I/opt/homebrew/opt/node@20/include"
```

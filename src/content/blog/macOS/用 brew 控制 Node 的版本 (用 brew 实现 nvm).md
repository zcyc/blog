---
title: "用 brew 控制 Node 的版本 (用 brew 实现 nvm)"
author: "Charles"
description: ""
tags:
  - blog
ogImage: ""
slug: "brew-node-version-control"
pubDatetime: 2020-09-26T06:28:41.000Z
modDatetime: 2021-01-10T16:33:04.000Z
featured: false
draft: false
---

在使用Node进行开发的时候，有时候需要在不同的Node版本中进行切换。
首先，跨平台的 [**NVM**(Node Version Manager)](https://github.com/creationix/nvm) 可以帮助我们很好的进行版本管理。
其次，**HomeBrew **也可以很方便的实现 Node 版本切换。
同理，**HomeBrew **也可以实现其他 runtime 的版本控制。

## 查看可用版本

```bash
$ brew search node
```

即可看到当前可用的版本
![Untitled](../Assets/brew-node-version-control-1.png)

## 安装需要的 Node 版本

```bash
$ brew install node@12
```

> 如果需要13.x.x中最新版本，可以使用

```bash
$ brew install node@12-lts
```

## 切换版本

- 首先取消当前版本

```bash
$ brew unlink node
```

- 切换到需要的版本

> 在切换版本的时候，可能会需要用到 –force命令，强制执行。

```bash
$ brew link node@12 [--force]
```

在切换版本时，可能会有一些文件需要删除，注意控制台的提示内容，执行即可
**例如：**

```bash
$ rm '/usr/local/include/node/pthread-fixes.h'
```

## 检查是否切换成功

```bash
$ node -v
```

## 添加到 Path

```bash
$ which node
$ export NODE_PATH='/usr/local/lib/node_modules' # <--- add this ~/.bashrc
```

## 删除所有 Node

```bash
$ brew uninstall node
# 或者 `brew uninstall --force node` 移除所有版本
$ brew prune
$ rm -f /usr/local/bin/npm /usr/local/lib/dtrace/node.d
$ rm -rf ~/.npm
```

## 写在最后

出现这个问题是在安装Yarn的时候遇到的。在使用`HomeBrew`安装`Node`的时候，需要`brew link node`，但是 link 之后的版本是最新的15。
本来新版本的 Node 带来了更多的特性，然而在使用`ng-cli`生成的项目中，打包的时候，`node-sass`一直出问题，这里不仅是网络问题，也有 Node 版本的问题，因此需要工具来管理 Node 版本，固有此总结。

> 现在最好的方式就是使用 dart-sass 代替 node-sass

Yarn是一个很方便的包管理器，推荐在安装包时尝试一下`Yarn`

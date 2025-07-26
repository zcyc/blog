---
title: "Web 游戏引擎选型"
author: "Charles"
description: ""
tags:
  - game
slug: "choosing-web-game-engine"
pubDatetime: 2025-07-25T23:00:00.000+08:00
featured: false
draft: false
---

## 前言
之前和小伙伴想做一款 2D Web 游戏，开个帖子记录一下技术选型过程。

## 要求
- 编程语言要常用
- 支持 Web 平台
- 有服务端 SDK
- 2D 优化好
- 加载快
- 有编辑器
- 免费

## 结论
- 没有服务端 SDK：Stencyl
- 编程语言小众：GameMaker、Stencyl
- 不支持 Web：Unreal
- 没有编辑器：PixiJS、Three.js
- 编辑器收费：Phaser
- 2D 支持差：Wonderland、BabylonJS
- 加载慢：Godot
- 收费：GDevelop、Construct
- 排除：Defold，Unity

排除 Defold，因为会让我和小伙伴想起工作时被 Lua 支配的恐惧。排除 Unity，因为国内只能用团结引擎。

最终满足需求的引擎有：PlayCanvas、LayaAir、Cocos Creator，但是我们选择用 Web 框架开发，暂定 Vue。这个选择多少有点冒昧，但能满足我们需求。虽然不是游戏引擎，但是加载很快，并且我们已经掌握。唯一问题就是没有编辑器，需要手搓布局。



## 参考
- [Poki Developer Guide](https://developers.poki.com/guide/web-game-engines)
- [CrazyGames Documentation](https://docs.crazygames.com/)
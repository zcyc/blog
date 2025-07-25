---
title: "Web 游戏引擎选型"
author: "Charles"
description: ""
tags:
  - game
slug: "choosing-web-game-engine"
pubDatetime: 2025-07-25T023:00:00.000+08:00
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
- 运行时小
- 有编辑器
- 免费

## 结论
- 不支持 Web：Unreal
- 运行时大：Unity、Godot
- 收费：GDevelop、Construct
- 没有编辑器：PixiJS、Three.js
- 编辑器收费：Phaser
- 没有服务端 SDK：Stencyl
- 编程语言小众：GameMaker、Stencyl
- 2D 支持差：Wonderland、BabylonJS
- 不喜欢语言：Defold
- 满足需求：PlayCanvas、LayaAir、Cocos Creator

虽然 Lua 是游戏行业常用语言，但我和小伙伴仍然记得工作时被 Lua 支配的恐惧，因此特别排除 Defold。一句话证明我用过 Lua，索引从 1 开始。

最终选择用 Vue 开发，因为 Web 框架能满足我们需求，而且我们已经掌握，虽然没有编辑器。



## 参考
[Poki Developer Guide](https://developers.poki.com/guide/web-game-engines)
[CrazyGames Documentation](https://docs.crazygames.com/)
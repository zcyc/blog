---
title: "Web 游戏引擎选型"
author: "Charles"
description: ""
tags:
  - game
slug: "choosing-web-game-engine"
pubDatetime: 2025-07-25T23:00:00.000+08:00
modDatetime: 2025-07-25T23:00:00.000+08:00
featured: false
draft: false
---

## 前言
之前和小伙伴想做一款 2D Web 游戏，开个帖子记录一下技术选型过程。

## 要求
- 支持 Web
- 有可视化编辑器
- 支持通用编程语言
- 有服务端 SDK
- 2D 支持好
- 免费

## 不满足要求的框架
- 不支持 Web：Unreal
- 没有可视化编辑器：PixiJS、Three.js
- 不支持通用编程语言：GameMaker、Stencyl
- 没有服务端 SDK：Stencyl
- 2D 支持差：Wonderland、BabylonJS
- 收费：GDevelop、Construct、PlayCanvas、Phaser（编辑器收费）

## 满足需求的框架
- Unity
- Godot
- Defold
- Cocos Creator
- LayaAir

## 特别排除的框架
- Unity：国内只能用团结引擎，使用国际版存在风险
- Defold：之前写过一段时间 Lua，不想再写了
- Godot：GDScript 不是通用编程语言，C# 不支持 Web，C++ 已经忘完了

## 最终可选的框架
- Cocos Creator
- LayaAir


## 参考
- [Poki Developer Guide](https://developers.poki.com/guide/web-game-engines)
- [CrazyGames Documentation](https://docs.crazygames.com/)

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
- 收费：GDevelop、Construct、PlayCanvas、Phaser

## 特别排除的框架
- 排除 Unity：国内只能用团结引擎，功能落后于原版，特供功能暂时用不到
- 排除 Defold：之前写过一段时间 Lua，不想再写了
- 排除 Godot：C# 不支持 Web，GDScript 不是通用编程语言

## 满足需求的框架
- Cocos Creator
- LayaAir


## 参考
- [Poki Developer Guide](https://developers.poki.com/guide/web-game-engines)
- [CrazyGames Documentation](https://docs.crazygames.com/)

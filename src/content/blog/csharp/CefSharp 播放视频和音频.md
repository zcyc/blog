---
title: "CefSharp 播放视频和音频"
author: "Charles"
description: ""
tags:
  - csharp
ogImage: ""
slug: "dotnet-cefsharp-license"
pubDatetime: 2023-04-01T12:21:15.000Z
modDatetime: 2023-04-12T06:00:11.000Z
featured: false
draft: false
---

由于 chromium 没有版权，所以不能播放 mpeg/h264/h265 格式的文件。可以使用 ogv 格式，也可以自己编译 CEF。
CefSharp 允许自动播放视频，但不能自动播放音频。自动播放视频也必须静音才行，还要给 video 元素设置 autoplay 属性。

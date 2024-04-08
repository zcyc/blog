---
title: "html 设置背景图"
author: "Charles"
description: ""
tags:
  - css
ogImage: ""
slug: "html-background-image"
pubDatetime: 2021-06-01T07:31:56.000+08:00
modDatetime: 2022-06-27T18:39:22.000+08:00
featured: false
draft: false
---

```html
<!-- 背景层方法 -->
<body>
  <div class="bg"></div>
</body>
html, body { width: 100%; height: 100%; } body { overflow: hidden; position:
relative; } .bg { position: absolute; left: 0; top: 0; z-index: 0; width: 100%;
height: 100%; background: url('page_1.jpg') no-repeat center center fixed; }

<!-- 全屏CSS方法（推荐使用）-->
html{ background: url('images/page1.jpg') no-repeat center center fixed;
-webkit-background-size: cover; -moz-background-size: cover; -o-background-size:
cover; background-size: cover; }

<!-- 图片层方法，此方法图片会拉伸失真 -->
<body>
  <img src="images/page1.jpg" width="100%" height="100%" class="bgimg" />
</body>
.bgimg{ position: fixed; left:0px; top:0px; margin:auto; width:100%;
height:100%; z-index:-1; }

<!-- 给背景图片设置一层透明的蒙住的版 -->
<body>
  <div class="cover"></div>
</body>
.cover{ position: fixed; left:0px; top:0px; z-index: -1; opacity: 0.6; height:
100%; width: 100%; background: black; }
```

---
title: "uni-app 用图标代替 button 触发分享"
author: "Charles"
description: ""
tags:
  - UniApp
ogImage: ""
slug: "uni-app-icon-button"
pubDatetime: 2021-06-18T07:30:58.000Z
modDatetime: 2022-01-17T09:56:45.000Z
featured: false
draft: false
---

```css
/* 比如 button 是放在一个 class="header" 的 view 中，就在 button 中放图标，然后使用如下 css 重置样式 */

/* button自带样式清除 */
.header button::after {
  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
.header button {
  background-color: transparent !important;
  padding: 0 !important;
  line-height: inherit !important;
  margin: 0 !important;
  width: auto !important;
  font-weight: 500 !important;
  border-radius: none !important;
}
```

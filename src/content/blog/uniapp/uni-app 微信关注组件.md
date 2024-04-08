---
title: "uni-app 微信关注组件"
author: "Charles"
description: ""
tags:
  - uniapp
slug: "uni-app-wechat-follow-component"
pubDatetime: 2021-06-22T15:12:16.000+08:00
modDatetime: 2022-07-01T16:23:06.000+08:00
featured: false
draft: false
---

注意：微信关注组件不能设置任何样式，如果想修改样式，请在外边套一个 view 组件，然后就能移动和设置大小，高度无法设置，宽度最小可以设置为81%。位置可以随意摆放，但是每个页面中只能有一个。

```html
<!-- 微信关注组件 begin -->
<view class="official-account" style="margin: 0 24rpx 0 24rpx;">
  <official-account />
</view>
<!-- 微信关注组件 end -->
```

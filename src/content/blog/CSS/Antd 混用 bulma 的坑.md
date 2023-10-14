---
title: "Antd 混用 bulma 的坑"
pubDate: "2021-05-03T06:50:58.000Z"
updatedDate: "2023-01-30T07:21:54.000Z"
---

Antd 和 tailwind 都会重置全局样式，且全局样式冲突较多，解决方案见：
<https://www.yuque.com/charliejohn/awesome/hwfg07>

Antd 混用 bulma 冲突比较少，不过还是有一些人能够理解的冲突

Row 和 Col 上边不能使用 is-centered 来居中元素

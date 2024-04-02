---
title: "Antd 布局常用"
author: "Charles"
description: ""
tags:
  - react
ogImage: ""
slug: "antd-layout"
pubDatetime: 2021-05-03T06:52:32.000Z
modDatetime: 2022-05-30T14:43:57.000Z
featured: false
draft: false
---

```jsx
<!---居中一个元素，比如下边的 div--->
<Row type="flex" justify="center" align="middle">
  <div>你的元素</div>
</Row>

<!---下边这个 div 也是居中的，因为是24格，左边偏移2格，元素占用20格，所以右边剩下2格。--->
<Row>
  <Col span="20" offset="2">
    <div>你的元素</div>
  </Col>
</Row>
<!---但是很明显上边的 div 长度占不满 20 格，所以这个 div 是在这20格中是左对齐的。--->
```

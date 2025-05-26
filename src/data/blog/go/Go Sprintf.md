---
title: "Go Sprintf %%s%"
author: "Charles"
description: ""
tags:
  - go
slug: "go-sprintf"
pubDatetime: 2023-02-07T04:29:47.000+08:00
modDatetime: 2023-02-07T04:31:34.000+08:00
featured: false
draft: false
---

要用 %%%s%%，不能用 \ 转义。

```go
fmt.Sprintf("%%%s%%", "a")
// 最后的效果就是 %a%
```

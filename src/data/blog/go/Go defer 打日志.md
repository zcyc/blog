---
title: "Go defer 打日志"
author: "Charles"
description: ""
tags:
  - go
slug: "go-defer-log"
pubDatetime: 2024-05-21T16:38:00.000+08:00
modDatetime:
featured: false
draft: false
---

# 错误方式
业务中这么写会导致 err 打不出来
```
package main

import "fmt"

func main() {
	var i int = 1
	defer fmt.Println(i)
	i = 2
}
```

# 正确方式
使用闭包打印日志
```
package main

import "fmt"

func main() {
	i := 1
	defer func() {
		fmt.Println(i)
	}()
	i = 2
}
```
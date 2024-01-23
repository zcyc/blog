---
title: "GoFrame 入门"
author: "Charles"
description: ""
tags:
  - Go
ogImage: ""
slug: "goframe"
pubDatetime: 2022-07-17T10:03:43.000Z
modDatetime: 2022-11-10T02:27:33.000Z
featured: false
draft: false
---

# 框架流程

main -> cmd -> api(controller 的定义) -> controller(请求参数的处理) -> service(logic 的接口) -> logic(业务逻辑的实现)
![[mxnn09-1658995720004-928cf1f3-b1f6-4d6a-9a66-224fa5c5dbf4.png]]

# API 定义

## 接口

summary 是接口的名字，description 是接口的介绍

## 字段

summary 没有用，description 是字段的介绍

# 中间件

中间件只能有一个参数

```
func Middleware(r *ghttp.Request) {
	// 中间件处理逻辑
	r.Middleware.Next()
}
```

# Controller

入参必须是 xxxReq，出参必须是 xxxRes，结构体最好是 c 开头。

# service 和 logic 的关系

service 是接口层，没有具体的业务逻辑实现，具体的业务实现是依靠 logic 层注入的。
<https://goframe.org/pages/viewpage.action?pageId=30740166>

# Logic

出参和入参尽量使用 xxxInput 和 xxxOutput，结构体 s 开头（强制，不然没法生成 service）。

# Reponse

```go
r.Response.WriteJson(DefaultHandlerResponse{
    Code:    gcode.CodeOK.Code(),
    Message: msg,
    Data:    res,
})
```

# HTTP 中间件

只能处理 response，不能处理 request

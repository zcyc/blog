---
title: "JSON 转 Go struct"
author: "Charles"
description: ""
tags:
  - blog
ogImage: ""
slug: "json-to-go"
pubDatetime: 2021-12-15T08:55:41.000Z
modDatetime: 2022-08-30T06:18:16.000Z
featured: false
draft: false
---

# Goland 自动转换

将 json 粘贴到 go 文件中会提示是否转换为 struct，点是即可。

# 手动转换

## 将你的 json 文件简化

因为文件太大转换器可能会卡死，而且重复的段落对生成的结构体没有价值，最终保留的 json 能体现出完整的格式就可以。比如 \[] 中的数据保留最复杂的那个即可，其他可以直接删掉，因为转换器会直接转换成一个 \[]struct，里边有多少数据都无所谓。

## 将准备好的json 文件复制到转换器中，得到 struct

<https://oktools.net/json2go>

## 调整转换结果

转换器生成的 struct 是从小到大的，最顶层的 struct 在最底下， 人的阅读顺序是反的，所以调整 struct 的顺序。
调整 struct 的名字，转换器生成的顶层 struct 名字叫做 generate 或者其他没意义的名字，取一个你实际要用的名字。
如果你的 json 文件最外层是 \[]，那么刚才生成器生成的 struct 其实不是你需要的最外层 struct，你需要自己声明一个 \[] 来包裹这个 struct。=

# 其他

## Go 加载本地 json 文件

这里其实有个坑，其他语言入口文件的 path 都是当前文件path，go 却是项目根路径，好处就是你写的路径永远从根路径开始，坏处就是放在当前文件夹也不能直接点到这个文件。
比如你的 main.go 放在 main 这个 package 中，也就是这个文件夹下，你的 dict.json 文件和 main.go 放在同一个文件夹下，你获取 dict.json 并不能使用 ./dict.json，而是要使用 ./main/dict.json

## js object 转 json

如果只是转一次，直接用在线工具即可，如果是经常转换建议写一个 node 程序，如果用其他语言转换需要对应对应包的支持。
<https://www.convertsimple.com/convert-javascript-to-json/>

---
title: "GORM & gormt"
author: "Charles"
description: ""
tags:
  - go
ogImage: ""
slug: "gorm"
pubDatetime: 2022-06-02T06:24:38.000Z
modDatetime: 2023-03-13T06:31:46.000Z
featured: false
draft: false
---

# GORM

1. 如果不使用 gormt 要用 Model 或者 Table 指定要查询的表。
2. Create 和 Update 对零值处理逻辑不同，注意字段 tag 的定义。
3. 默认 Select 所有字段，可以自己用 Select 指定要取出的字段。
4. MySQL geometry 类型生成会报错，需要在配置文件中的 self_type_define 节点自定义映射。

```bash
self_type_define: # 自定义数据类型映射
datetime: time.Time
time: time.Time
geometry: "[]byte" #加这一行
```

# gormt

## 安装

当你发现不管怎么改配置文件都不生效的时候，删除 GOROOT/bin 下的 gormt 并重新安装。

```bash
go install github.com/xxjwxc/gormt@master
```

## 分页

<https://xiaojujiang.blog.csdn.net/article/details/122315454>
新版 gormt 能生成分页方法，使用 limit 和 offset 读取数据，不过返回的不是指针切片。

## 配置文件

gormt 默认使用 gormt 安装目录的 config.yml，如果不存在则使用当前运行目录的 config.yml，建议把配置文件放到你想要生成文件的目录，然后在该目录运行生成器。

---
title: "之前使用 Go 遇到的问题"
author: "Charles"
description: ""
tags:
  - go
slug: "go-problems"
pubDatetime: 2021-12-23T12:12:45.000+08:00
modDatetime: 2022-07-02T10:37:59.000+08:00
featured: false
draft: false
---

## 指针

如果错误的使用指针类型或者错误的使用值类型会出现意想不到的 panic。\*是一个类型，这个类型就是指针类型，但它传递的仍然是一个值，这个值是内存地址。

## package

比如你的 go-example 项目有一个文件路径是 ./go-example/common/db/db.go
这么你 import 这个文件要用 "go-example/common/db"
这时候使用这个文件中的函数就是 db.xxxxx
这里有个知识点，你可以在db 文件夹下但是 package 不是 db，但是你 db 下的所有文件的 package 必须一样
比如你 package 是 ab，虽然你包名换了，但是你仍然在 ./go-example/common/db/ 这个文件夹下
那么你的引入路径仍然是 "go-example/common/db"，但是调用函数的时候要使用 ab.xxxxx
所以，package 是命名空间，但是引入的时候还是引入文件的路径。

## 什么时候用指针接收值，什么时候用变量接受值

error 必须用变量接收，因为 error 类型的变量没有指针，其他类型看情况。
Go 拥有多返回值特性，所以最符合直觉的就是设置多个返回值，尽量不要用指针接收返回值。

## error 处理到什么程度

由于 Go 的大部分函数都有 error 返回值，所以这里就出现了 error 永远处理不完的问题，到什么程度结束呢？
我觉得只要处理到后期能快速方便的排查问题即可，不用非要处理到没有 error，该忽略的就忽略。

## Go 的 database/sql 是什么

提供了一个围绕 SQL（或类似 SQL）数据库的通用接口，必须与数据库驱动程序结合使用。
同时也是一个数据库连接池，可以非常方便的申请和归还资源。

### 常见的配置如下：

db.SetMaxIdleConns(10)        //设置空闲连接池中的最大idle连接数
db.SetMaxOpenConns(100)       //设置数据库连接最大打开数
db.SetConnMaxLifetime(time.Hour)    //设置可重用连接的最长时间

## SQL 连接的释放

有 Close 方法的变量，在使用后要及时调用该方法释放资源。 记不住最后 Close 就在获取之后马上 defer Close。
如果这个函数有返回值，但是你忽略了，返回值依然是存在的。如果一个返回值需要 Close 才会释放资源，直接忽略就会导致资源泄漏。

### 常见的方法如下：

- Ping 和 Exec 会自动释放连接。
- Query 的结果 Rows 要自己 Close 或者遍历完所有结果后会自动 Close。
- QueryRow 调用 Scan 方法会自动 Close。

## Go 的 DB.Exec 是否有注入风险

<https://go.dev/doc/database/sql-injection>
正常情况下没有，使用占位符并传入参数会自动屏蔽危险语句。
SQL 千万不要自己用 fmt 或者 "+" 进行拼接。

## 如果返回给客户端的时候发生了错误怎么办？（这里有待再次思考）

### 如果数据有状态机，数据库执行成功且状态机流转正常，那就等用户下次请求的时候直接抛出对应的状态机错误。

比如：付款之后，你直接关闭网络，你恢复网络之后再次点支付会告诉你已经支付。

### 如果数据有状态机，数据库执行失败或状态机流转异常，那就重试状态机更新，不行直接回滚。

比如：订单支付成功了，但是订单状态修改不了。

### 如果数据没有状态机，数据库执行成功和失败都不要紧，只要日志记录错误就好，下次请求继续修改就行。

比如：修改昵称，头像，点了提交之后关闭网络也不要紧，刷新一下还是修改好了，也没有对应的错误提醒。

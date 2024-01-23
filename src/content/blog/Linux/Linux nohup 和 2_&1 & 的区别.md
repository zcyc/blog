---
title: "Linux nohup 和 2>&1 & 的区别"
author: "Charles"
description: ""
tags:
  - Linux
ogImage: ""
slug: "linux-nohup"
pubDatetime: 2021-11-14T13:09:52.000Z
modDatetime: 2022-05-20T02:36:39.000Z
featured: false
draft: false
---

通常起一个 jar 文件的时候可以直接通过 java -jar 来启动，比如：

```bash
nohup java -jar -Dspring.profiles.active=xxx -Dserver.port=xxx xxx.jar >security.out 2>&1 &
nohup java -jar gp_doublecontrolle-2.2.6-11-03.jar>> gp_doublecontrolle_2021_1103.log 2>&1 &
```

这里面很多的参数，不知道大家有没有研究过？

1. nohup
   放在命令的开头，表示不挂起（no hang up），也即，关闭终端或者退出某个账号，进程也继续保持运行状态，一般配合&符号一起使用。如 nohup command &。
2. 2>&1 &
   这里先看一下 shell 里面几个数字的含义
   /dev/null 表示空设备文件
   0 表示 stdin 标准输入
   1 表示 stdout 标准输出
   2 表示 stderr 标准错误

> file 表示将标准输出输出到 file 中，也就相当于 1>file
> 2> error 表示将错误输出到 error 文件中
> 2>&1 也就表示将错误重定向到标准输出上
> 2>&1 >file ：错误输出到终端，标准输出重定向到文件 file，等于 > file 2>&1(标准输出重定向到文件，错误重定向到标准输出)。
> & 放在命令到结尾，表示后台运行，防止终端一直被某个进程占用，这样终端可以执行别到任务，配合 >file 2>&1 可以将 log 保存到某个文件中，但如果终端关闭，则进程也停止运行。如 command > file.log 2>&1 & 。

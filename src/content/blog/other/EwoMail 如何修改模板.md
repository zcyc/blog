---
title: "EwoMail 如何修改模板"
author: "Charles"
description: ""
tags:
  - Other
ogImage: ""
slug: "ewomail-modify-template"
pubDatetime: 2022-11-07T09:54:34.000Z
modDatetime: 2022-11-14T14:32:11.000Z
featured: false
draft: false
---

工信部备案要求是展示备案号并超链接到备案查询页。
EwoMail 设置备案信息后只是展示在底部，并不能跳转。
所以需要修改一下 template 文件。
查看 EwoMail 的安装程序可知安装路径为 /ewomail/www。
所以要修改的文件在 /ewomail/www/ewomail-admin/templates/Center 下。

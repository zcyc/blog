---
title: "macOS Rider 运行 razor 项目报错"
author: "Charles"
description: ""
tags:
  - macos
ogImage: ""
slug: "macos-rider-run-razor-project-error"
pubDatetime: 2020-08-11T02:31:51.000Z
modDatetime: 2021-10-16T04:38:54.000Z
featured: false
draft: false
---

在根目录下创建 test.runtimeconfig.json
test为项目名称 \[项目名称].runtimeconfig.json
并且添加以下内容

> 注意：最新版本的rider已经自动配置文件，不需要手动配置

```json
{
  "runtimeOptions": {
    "framework": {
      "name": "Microsoft.NETCore.App",
      "version": "3.1.0"
    }
  }
}
```

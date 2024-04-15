---
title: "使用 pdb 在命令行调试 python 程序"
description: ""
author: "Charles"
tags:
  - python
slug: "pdb"
pubDatetime: 2024-04-11T13:07:50.000+08:00
featured: false
draft: false
---

有些时候无法使用 ide 断点，可以通过 pdb 调试。

# 启用

## 侵入式

将以下代码添加到需要断点处：

```
breakpoint()
```

## 非侵入式

使用以下命令启动模块：

```
python -m pdb main.py
```

# 使用

[点击查看使用手册](https://docs.python.org/zh-tw/3/library/pdb.html)

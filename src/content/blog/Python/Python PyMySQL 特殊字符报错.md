---
title: "Python PyMySQL 特殊字符报错"
author: "Charles"
description: ""
tags:
  - blog
ogImage: ""
slug: "python-pymysql"
pubDatetime: 2022-06-28T17:42:37.000Z
modDatetime: 2022-06-28T17:47:57.000Z
featured: false
draft: false
---

# 表现

PyMySQL 获取数据时报 'utf-8' codec can't decode byte 0xed in position 2: invalid continuation byte错误 的问题

# 原因

有字段包含utf-8 byte 等混合编码的字符，而 PyMySQL 从 MySQL 数据库取出来数据进行转码时没有做异常处理，从而导致查询失败。

# 解决

/usr/local/lib/python3.10/dist-packages/pymysql 目录下的 connections.py 文件第 1232 行左右

```python
def _read_row_from_packet(self, packet):
         row = []
         for encoding, converter in self.converters:
             data = packet.read_length_coded_string()
             if data is not None:
                 if encoding is not None:
                     data = data.decode(encoding) # data = data.decode(encoding) 改为 data = data.decode(encoding,'ignore')
                 if DEBUG: print("DEBUG: DATA = ", data)
                 if converter is not None:
                     data = converter(data)
             row.append(data)
         return tuple(row)
```

---
title: "Linux 解压和压缩"
author: "Charles"
description: ""
tags:
  - linux
slug: "linux-tar-gz"
pubDatetime: 2021-06-25T11:07:50.000+08:00
modDatetime: 2022-08-04T10:20:00.000+08:00
featured: false
draft: false
---

.tar 文件

```bash
# 仅打包，并非压缩
tar -xvf FileName.tar         # 解包
tar -cvf FileName.tar DirName # 将DirName和其下所有文件（夹）打包
```

.gz文件

```bash
# .gz
gunzip FileName.gz  # 解压1
gzip -d FileName.gz # 解压2
gzip FileName       # 压缩，只能压缩文件
```

.tar.gz文件、 .tgz文件

```bash
# .tar.gz 和 .tgz
tar -zxvf FileName.tar.gz               # 解压
tar -zcvf FileName.tar.gz DirName       # 将DirName和其下所有文件（夹）压缩
tar -C DesDirName -zxvf FileName.tar.gz # 解压到目标路径
```

.zip文件

```bash
# 感觉.zip占用空间比.tar.gz大
unzip FileName.zip          # 解压
zip FileName.zip DirName    # 将DirName本身压缩
zip -r FileName.zip DirName # 压缩，递归处理，将指定目录下的所有文件和子目录一并压缩
```

.rar文件

```bash
# mac和linux并没有自带rar，需要去下载
rar x FileName.rar      # 解压
rar a FileName.rar DirName # 压缩
```

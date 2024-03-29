---
title: "pip 使用国内源安装 requirements.txt 中的包"
author: "Charles"
description: ""
tags:
  - blog
ogImage: ""
slug: "pip-install-requirements-txt-packages-from-mirror"
pubDatetime: 2022-05-05T08:10:34.000Z
modDatetime: 2022-07-01T16:08:56.000Z
featured: false
draft: false
---

## 指定镜像下载某个包

pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple pymysql

## 指定镜像下载 requirements.txt 中的所有包

pip3 install -i http://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com -r requirements.txt

## 常用源

豆瓣：<http://pypi.douban.com/simple/>
清华：<https://pypi.tuna.tsinghua.edu.cn/simple/>
中科大：<https://pypi.mirrors.ustc.edu.cn/simple/>
阿里云：<http://mirrors.aliyun.com/pypi/simple/>
华为云：<https://mirrors.huaweicloud.com/repository/pypi/simple/>
[
](http://pypi.douban.com/simple/)

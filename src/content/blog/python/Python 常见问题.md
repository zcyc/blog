---
title: "Python 常见问题"
author: "Charles"
description: ""
tags:
  - python
ogImage: ""
slug: "python-problems"
pubDatetime: 2023-02-15T13:59:57.000+08:00
modDatetime: 2023-02-15T14:24:49.000+08:00
featured: false
draft: false
---

# site-packages 不可写

报错 Defaulting to user installation because normal site-packages is not writeable
通过 target 指定目录，如：

```
pip install --target=C:\Users\z\pip\site-packages pytest-playwright
```

---
title: "Python 常见问题"
author: "Charles"
description: ""
tags:
  - blog
ogImage: ""
slug: "python"
pubDatetime: 2023-02-15T13:59:57.000Z
modDatetime: 2023-02-15T14:24:49.000Z
featured: false
draft: false
---

# site-packages 不可写

报错 Defaulting to user installation because normal site-packages is not writeable
通过 target 指定目录，如：

```
pip install --target=C:\Users\z\pip\site-packages pytest-playwright
```

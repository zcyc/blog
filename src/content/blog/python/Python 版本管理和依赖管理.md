---
title: "Python 版本管理和依赖管理"
author: "Charles"
description: ""
tags:
  - python
ogImage: ""
slug: "python-version-and-dependency-management"
pubDatetime: 2022-07-01T15:56:44.000Z
modDatetime: 2022-07-28T03:39:51.000Z
featured: false
draft: false
---

# [pdm](https://github.com/pdm-project/pdm)

现代 python 包管理器，替代 pip

```bash
# 初始化 pdm 项目
pdm init

# 添加依赖
pdm add requests flask

# 加载本地依赖
pdm add ./first-1.0.0-py2.py3-none-any.whl
```

# [pyenv](https://github.com/pyenv/pyenv)

现在 python 版本管理器，替代 venv

```bash
# 安装指定版本 python
pyenv install 3.10.4

# 设置当前 shell session 的 python 版本
pyenv shell <version>

# 设置当前目录的 python 版本
pyenv local <version>

# 设置当前用户的 python 版本
pyenv global <version>
```

[pipx](https://pypa.github.io/pipx/comparisons/)
pipenv
virtualenv

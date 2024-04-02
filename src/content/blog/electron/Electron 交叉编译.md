---
title: "Electron 交叉编译"
author: "Charles"
description: ""
tags:
  - electron
ogImage: ""
slug: "electron-build"
pubDatetime: 2020-11-03T03:20:27.000Z
modDatetime: 2021-06-26T10:39:59.000Z
featured: false
draft: false
---

# 任意系统中将 electron 项目同时编译出 mac、win、linux 包

注意：虽然可以交叉编译，但是编译后能不能用还是要用目标平台测试一下，博主碰到了编译完成后，mac可以正常使用，但是windows打开报错的情况，但是编译的时候是不会发现的。

## 交叉编译只需要在 package.json 中添加如下的 scripts

```json
{
  "scripts": {
    "package:all": "npm run package:win && npm run package:linux && npm run package:mac",
    "package:win": "npm run electron:build -- --win 7z --x64",
    "package:linux": "npm run electron:build -- --linux 7z AppImage --x64",
    "package:mac": "npm run electron:build -- --mac 7z dmg"
  }
}
```

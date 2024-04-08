---
title: "Electron 遇到的问题"
author: "Charles"
description: ""
tags:
  - electron
ogImage: ""
slug: "electron-problems"
pubDatetime: 2020-07-09T17:26:57.000+08:00
modDatetime: 2023-03-08T07:42:34.000+08:00
featured: false
draft: false
---

# Electron 安装慢

```shell
# electron
export ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
# phantomjs
export PHANTOMJS_CDNURL=https://npm.taobao.org/mirrors/phantomjs/
# node-sass
export SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/
# electron
set ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
# phantomjs
set PHANTOMJS_CDNURL=https://npm.taobao.org/mirrors/phantomjs/
# node-sass
set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/
```

```shell
# electron
npm install electron --electron-mirror=https://npm.taobao.org/mirrors/electron/
# phantomjs
npm install phantomjs --phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
# node-sass
npm install node-sass --sass-binary-site=https://npm.taobao.org/mirrors/node-sass/
```

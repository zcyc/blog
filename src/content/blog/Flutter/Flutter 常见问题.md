---
title: "Flutter 常用命令、国内镜像、常见问题"
author: "Charles"
description: ""
tags:
  - Flutter
ogImage: ""
slug: "flutter"
pubDatetime: 2020-10-22T07:58:04.000Z
modDatetime: 2021-08-11T17:27:05.000Z
featured: false
draft: false
---

# 常用命令

```shell
flutter doctor --android-licenses    avd 虚拟机的协议认证
flutter doctor                       检查 flutter 开发环境
flutter upgrade                      更新 flutter 版本
flutter pub get                      安装项目的依赖包
flutter pub upgrade                  升级项目依赖包
flutter packages get                 同上
```

# 国内镜像

```shell
# Mac or Linux
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

# Windows
set PUB_HOSTED_URL=https://pub.flutter-io.cn
set FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

# 进程锁

当你遇到 Waiting for another flutter command to release the startup lock

```shell
# Mac or Linux
killall -9 dart

# Windows
taskkill /F /IM dart.exe
```

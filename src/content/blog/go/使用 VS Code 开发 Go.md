---
title: "使用 VS Code 开发 Go"
author: "Charles"
description: ""
tags:
  - go
ogImage: ""
slug: "go-vscode"
pubDatetime: 2022-10-18T10:03:11.000Z
modDatetime: 2022-11-08T03:46:34.000Z
featured: false
draft: false
---

# 安装 Go Tools

1. 打开控制台

```json
macOS: command + shift + p
Windows: ctrl + shift +p
```

2. 输入指令

```json
Go: Install/Update Tools
```

3. 全选并安装

# 使用 VS Code 断点调试

1. 打开任意项目，按 F5。
2. 提示没有调试配置，点击创建。如果存在调试配置则修改。
3. 在配置文件中写入如下内容：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Package",
      "type": "go",
      "request": "launch",
      "mode": "auto",
      "program": "${workspaceFolder}" // 指定启动目录是当前工作空间的根目录
    }
  ]
}
```

4. 再次按 F5 即可启动调试，在文件中打断点即可。

# 使用 Code Runner 启动项目

修改 Code Runner 配置文件，修改以后能在项目的任意文件中启动项目，不用切到 main.go 文件。

```json
go: cd $workspaceRoot && go run *.go
```

# GoFrame 自动生成 service

1. 安装插件：<https://marketplace.visualstudio.com/items?itemName=wk-j.save-and-run>
2. 在 vscode 配置文件中添加如下配置：

```json
  "saveAndRun": {
    "commands": [
      {
        "match": "internal/logic/.*.go",
        "cmd": "gf gen service",
        "useShortcut": false,
        "silent": false
      } // 当 logic 下文件保存自动生成 service
    ]
  }
```

3. 根据自己的需求修改 match 中的正则表达式，可以实现在特定的文件保存时执行命令。

# 自动填充 struct

1. 在结构体上触发自动填充，快捷键如下：

```json
macOS: command + .
Windows: ctrl + .
```

2. 如果报错就安装缺少的包：

```json
go get -u github.com/davidrjenni/reftools/cmd/fillstruct
```

# 我推荐的 VS Code 配置和插件

[VS Code 配置和插件](<博客/其他/VS Code 配置>)

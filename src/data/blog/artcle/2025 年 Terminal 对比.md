---
title: "2025 年 Terminal 对比"
author: "Charles"
description: ""
tags:
  - article
slug: "terminal-2025"
pubDatetime: 2026-01-03T15:43:58.000+08:00
modDatetime: 2026-01-03T15:43:58.000+08:00
featured: false
draft: false
---

### 终端模拟器

| 项目                  | Alacritty          | iTerm2             | Kitty              | WezTerm            | Windows Terminal   | Ghostty            | Hyper              | Tabby              | Wave Terminal      | Warp               |
|-----------------------|--------------------|--------------------|--------------------|--------------------|--------------------|--------------------|--------------------|--------------------|--------------------|--------------------|
| **平台支持**          | macOS、Linux、Windows、BSD | 主要 macOS        | macOS、Linux（Windows 实验） | macOS、Linux、Windows（一致） | Windows（原生）   | macOS、Linux（Windows 计划） | macOS、Windows、Linux | Windows、macOS、Linux | macOS、Linux、Windows | macOS、Linux、Windows |
| **渲染方式**          | GPU 加速（OpenGL） | CPU 渲染          | GPU 加速（OpenGL） | GPU 加速（WebGPU / Metal / Vulkan / DX12） | GPU 加速（DirectX） | GPU 加速 + 原生 UI（Metal / GTK） | CPU 渲染（Electron） | GPU 加速          | GPU 加速 + 图形小部件 | GPU 加速（Rust）   |
| **性能**              | 最高（极简）      | 良好              | 极高              | 极高              | 高                | 极高              | 一般（启动慢）    | 中等              | 低 - 中等         | 极高              |
| **资源占用**          | 最低              | 中等              | 低                | 低 - 中等         | 中等              | 低                | 高                | 中等 - 高         | 中等              | 低 - 中等         |
| **内置多路复用**      | 不支持（依赖 tmux） | 支持（标签、分窗） | 支持（标签、分窗） | 支持（内置多协议） | 支持（标签、分窗、Quake） | 支持（原生标签、分窗） | 基本（依赖插件）  | 支持（标签、分窗） | 支持（块布局）    | 支持（块式输出）  |
| **图像协议支持**      | 不支持            | iTerm2 Inline     | Kitty 协议        | 多协议（Kitty、iTerm2、Sixel） | Sixel             | Kitty 协议        | 不支持            | 部分（插件）      | 支持（inline 渲染、多协议） | 部分              |
| **字体连字（Ligatures）** | 不支持          | 部分              | 支持              | 支持              | 支持              | 支持              | 部分              | 支持              | 支持              | 支持              |
| **TrueColor (24-bit)** | 支持             | 支持              | 支持              | 支持              | 支持              | 支持              | 支持              | 支持              | 支持              | 支持              |
| **可点击超链接**      | 支持              | 支持              | 支持              | 支持              | 支持              | 支持              | 部分              | 支持              | 支持              | 支持              |
| **OSC 52 剪贴板**     | 支持              | 支持              | 支持              | 支持              | 部分              | 部分              | 不支持            | 支持              | 支持              | 支持              |
| **自定义方式**        | YAML 配置文件    | GUI + 配置文件    | 配置文件（强大）  | Lua 脚本（高度可编程） | JSON + GUI       | 声明式配置文件   | JS 插件 + 主题    | GUI + 插件        | GUI + 扩展        | GUI + AI 自定义   |
| **AI / 智能功能**     | 不支持            | 不支持            | 不支持            | 不支持            | 不支持            | 不支持            | 不支持            | 部分（插件）      | 支持（上下文 AI、本地模型） | 强大（Agent 模式、命令建议、协作） |

**说明**：
- **纯性能 / 极简**：Alacritty（搭配 tmux）。
- **macOS 首选**：Ghostty（原生极速）或 iTerm2（成熟功能）。
- **图像 / TUI 丰富**：Kitty 或 WezTerm（协议生态最佳）。
- **跨平台一致**：WezTerm。
- **Windows 首选**：Windows Terminal（官方集成、Sixel 支持）。
- **现代 AI / 代理**：Warp（团队协作强）或 Wave Terminal（本地 AI、图形小部件）。
- **SSH / 连接管理**：Tabby（内置客户端、Zmodem）。

### Shell

| 项目                  | Bash               | Zsh                | Fish               | PowerShell         | Nushell            | Elvish             | Xonsh              |
|-----------------------|--------------------|--------------------|--------------------|--------------------|--------------------|--------------------|--------------------|
| **平台支持**          | Unix / Linux、macOS、Windows (WSL) | Unix / Linux、macOS、Windows (有限) | Unix / Linux、macOS、Windows | Windows（原生）、Unix / Linux、macOS（跨平台） | Unix / Linux、macOS、Windows | Unix / Linux、macOS、Windows | Unix / Linux、macOS、Windows |
| **脚本兼容性**        | POSIX 标准（广泛兼容） | 高度兼容 Bash     | 不兼容 POSIX（独特语法） | .NET 对象管道     | 不兼容 POSIX（结构化数据） | 不兼容 POSIX（独特语法） | Python 超集 + Shell 原语 |
| **交互特性**          | 基本（需插件增强） | 优秀（内置补全、拼写纠正） | 出色开箱（语法高亮、自动建议） | 优秀（Tab 补全、历史） | 结构化输出、表格显示 | 现代（目录历史、丰富数据） | Python 直接执行 + Shell |
| **自动补全**          | 基本              | 强大（可配置）    | 优秀开箱          | 强大（参数补全）  | 支持（结构化）    | 支持（现代）      | 支持（Python + Shell） |
| **语法高亮**          | 无（需插件）      | 支持（插件）      | 内置              | 内置              | 内置（表格/结构化） | 内置              | 支持（Python 风格） |
| **管道数据类型**      | 纯文本            | 纯文本            | 纯文本            | 对象              | 结构化数据（表格、列表） | 丰富数据结构      | Python 对象 + 文本 |
| **编程范式**          | 过程式            | 过程式            | 过程式（用户友好） | 对象导向         | 数据导向（类似 SQL） | 函数式 + 现代     | Python（动态）    |
| **性能**              | 良好              | 良好（插件后稍慢） | 快速              | 中等              | 快速（Rust 编写） | 快速（Go 编写）   | 中等（Python 基） |
| **跨平台一致性**      | 高                | 高                | 高                | 高               | 高                | 高                | 高                |
| **学习曲线**          | 低（默认标准）    | 中等              | 低（开箱友好）    | 中等（Windows 导向） | 中等（新语法）    | 中等（新概念）    | 低（若熟悉 Python） |
| **独特特性**          | 脚本生态最大      | 插件系统（Oh My Zsh） | 开箱即用友好     | 对象管道、模块系统 | 结构化数据处理   | 函数式编程、lambda | Python + Shell 混合 |

**说明**：
- **脚本兼容 / 默认**：Bash（最广泛支持）。
- **交互增强**：Zsh（插件丰富）或 Fish（开箱最佳）。
- **Windows 首选**：PowerShell（对象管道强大）。
- **现代数据处理**：Nushell（结构化输出、表格友好）。
- **函数式 / 创新**：Elvish（丰富数据结构）。
- **Python 开发者**：Xonsh（直接 Python 代码）。

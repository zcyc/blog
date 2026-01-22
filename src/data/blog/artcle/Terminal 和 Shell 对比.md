---
title: "Terminal 和 Shell 对比"
author: "Charles"
description: ""
tags:
  - article
slug: "terminal-and-shell"
pubDatetime: 2026-01-03T15:43:58.000+08:00
modDatetime: 2026-01-03T15:43:58.000+08:00
featured: false
draft: false
---

### Terminal

| 项目                  | **平台支持**                          | **渲染方式**                              | **性能**     | **资源占用**   | **内置多路复用**              | **图像协议支持**              | **字体连字（Ligatures）** | **TrueColor** | **可点击超链接** | **OSC 52 剪贴板** | **AI 功能**                  |
|-----------------------|---------------------------------------|-------------------------------------------|--------------|----------------|--------------------------------|--------------------------------|---------------------------|---------------|------------------|-------------------|-------------------------------|
| Alacritty            | macOS、Linux、Windows、BSD           | GPU（OpenGL）                            | 极高        | 极低          | 不支持（依赖 tmux）            | 不支持                        | 不支持                   | 支持         | 支持            | 支持             | 不支持                       |
| iTerm2               | 主要 macOS                           | CPU 渲染                                 | 中等        | 中等          | 支持（标签、分窗）             | iTerm2 Inline                 | 部分                     | 支持         | 支持            | 支持             | 不支持                       |
| Kitty                | macOS、Linux（Windows 实验）         | GPU（OpenGL）                            | 极高        | 极低          | 支持（标签、分窗）             | Kitty 协议                    | 支持                     | 支持         | 支持            | 支持             | 不支持                       |
| WezTerm              | macOS、Linux、Windows（一致）         | GPU（WebGPU/Metal/Vulkan/DX12）          | 极高        | 低            | 支持（内置多协议）             | 多协议（Kitty、iTerm2、Sixel）| 支持                     | 支持         | 支持            | 支持             | 不支持                       |
| Windows Terminal     | Windows（原生）                      | GPU（DirectX）                           | 高          | 中等          | 支持（标签、分窗、Quake）      | Sixel                         | 支持                     | 支持         | 支持            | 部分             | 不支持                       |
| Ghostty              | macOS、Linux（Windows 计划）         | GPU + 原生 UI（Metal/GTK）               | 极高        | 极低          | 支持（原生标签、分窗）         | Kitty 协议                    | 支持                     | 支持         | 支持            | 部分             | 不支持                       |
| Hyper                | macOS、Windows、Linux                | CPU（Electron）                          | 低          | 高            | 基本（依赖插件）               | 不支持                        | 部分                     | 支持         | 部分            | 不支持           | 不支持                       |
| Tabby                | Windows、macOS、Linux                | GPU                                      | 中等        | 中高          | 支持（标签、分窗）             | 部分（插件）                  | 支持                     | 支持         | 支持            | 支持             | 部分（插件）                 |
| Wave Terminal        | macOS、Linux、Windows                | GPU + 图形小部件                         | 中等        | 中等          | 支持（块布局）                 | 支持（inline、多协议）        | 支持                     | 支持         | 支持            | 支持             | 支持（上下文 AI、本地模型）   |
| Warp                 | macOS、Linux、Windows                | GPU（Rust）                              | 极高        | 低            | 支持（块式输出）               | 部分                          | 支持                     | 支持         | 支持            | 支持             | 强大（Agent 模式、命令建议、协作） |

### 推荐
- **Windows 首选**：Windows Terminal（官方集成、Sixel 支持）。
- **macOS 首选**：Ghostty（原生极速）或 iTerm2（成熟功能）。
- **纯性能 / 极简**：Alacritty（多路复用依赖 tmux）。
- **图像 / TUI 丰富**：Kitty 或 WezTerm（协议生态最佳）。
- **跨平台一致**：WezTerm。
- **现代 AI / 代理**：Warp（团队协作强）或 Wave Terminal（本地 AI、图形小部件）。
- **SSH / 连接管理**：Tabby（内置客户端、Zmodem）。

### Shell

| 项目                  | **平台支持**                          | **脚本兼容性**                  | **交互特性**                  | **自动补全** | **语法高亮** | **管道数据类型**        | **编程范式**          | **性能**   | **跨平台一致性** | **学习曲线** | **独特特性**                  |
|-----------------------|---------------------------------------|----------------------------------|--------------------------------|--------------|--------------|--------------------------|------------------------|------------|------------------|--------------|--------------------------------|
| Bash                 | Unix / Linux、macOS、Windows (WSL)    | POSIX 标准（广泛兼容）          | 基本（需插件增强）            | 基本        | 无（需插件）| 纯文本                  | 过程式                | 良好       | 高              | 低（默认标准） | 脚本生态最大                  |
| Zsh                  | Unix / Linux、macOS、Windows (有限)   | 高度兼容 Bash                   | 优秀（内置补全、拼写纠正）    | 强大（可配置） | 支持（插件）| 纯文本                  | 过程式                | 良好（插件后稍慢） | 高              | 中等        | 插件系统（Oh My Zsh）          |
| Fish                 | Unix / Linux、macOS、Windows         | 不兼容 POSIX（独特语法）        | 出色开箱（语法高亮、自动建议）| 优秀开箱    | 内置        | 纯文本                  | 过程式（用户友好）    | 快速       | 高              | 低（开箱友好） | 开箱即用友好                  |
| PowerShell           | Windows（原生）、Unix / Linux、macOS（跨平台） | .NET 对象管道                  | 优秀（Tab 补全、历史）        | 强大（参数补全） | 内置        | 对象                    | 对象导向              | 中等       | 高              | 中等（Windows 导向） | 对象管道、模块系统            |
| Nushell              | Unix / Linux、macOS、Windows         | 不兼容 POSIX（结构化数据）      | 结构化输出、表格显示          | 支持（结构化） | 内置（表格/结构化） | 结构化数据（表格、列表）| 数据导向（类似 SQL）  | 快速（Rust 编写） | 高              | 中等（新语法） | 结构化数据处理                |

### 推荐
- **Windows 首选**：PowerShell（对象管道强大）。
- **macOS 首选**：Zsh（高度兼容 Bash）。
- **脚本兼容 / 默认**：Bash（最广泛支持）。
- **交互增强**：Zsh（插件丰富）或 Fish（开箱最佳）。
- **现代数据处理**：Nushell（结构化输出、表格友好）。
- **其他 Shell**：Elvish（函数式）、Xonsh（Python）。

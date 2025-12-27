---
title: "2025 年 Desktop 框架对比"
author: "Charles"
description: ""
tags:
  - article
slug: "desktop-framework-2025"
pubDatetime: 2025-12-13T16:13:58.000+08:00
modDatetime: 2025-12-27T14:44:58.000+08:00
featured: false
draft: false
---

本文仅比较跨平台框架，各平台的 native 框架未列出，如：WinUI、WPF、WinForm、SwiftUI。

| 框架                  | 语言 / 写法                  | Windows 支持 | macOS 支持 | Linux 支持 | 性能（相对原生）                  | 社区 / 生态                     | 活跃度 | 优缺点简述 |
|-----------------------|------------------------------|--------------|------------|------------|-----------------------------------|----------------------------------|--------|------------|
| Electron             | JS / HTML / CSS / Node.js   | 支持        | 支持      | 支持      | 中等（RAM 高 ~200MB，启动 ~2s）   | 极丰富（GitHub 支持，插件多）   | 活跃  | 优点：Web 技能复用、生态庞大（VS Code / Slack）；缺点：体积大（~100MB+）、资源消耗高。适合快速原型。 |
| NW.js                | JS / HTML / CSS / Node.js   | 支持        | 支持      | 支持      | 中等（类似 Electron，轻微优化）   | 中等（开源社区）                | 中等  | 优点：Electron 前身、简单集成；缺点：维护较慢、生态小。适合小型 Web-to-Desktop 迁移。 |
| Flutter              | Dart                        | 支持        | 支持      | 支持      | 近原生（FPS 120+，启动 ~0.8s）     | 丰富（Google 支持，插件多）     | 活跃  | 优点：UI 一致性高、热重载快；缺点：Dart 学习曲线、体积 ~50MB。适合多平台 UI 密集 APP。 |
| React Native         | JS / React                  | 支持（Windows / macOS）| 支持      | 部分（社区）| 近原生（FPS 118，启动 ~1.2s）     | 极丰富（Meta 支持，JS 生态）    | 活跃  | 优点：代码复用高、热更新；缺点：桥接开销、Linux 支持弱。适合 React 团队跨移动 / 桌面。 |
| Compose Multiplatform| Kotlin (Compose Multiplatform) | 支持      | 支持      | 支持      | 原生（高性能，内存低）            | 成长中（JetBrains 支持）        | 活跃  | 优点：声明式 UI、Kotlin 共享逻辑、可扩展到移动 / Web；缺点：Kotlin 曲线陡。适合 Android / KMP 团队桌面及多平台扩展。 |
| JavaFX               | Java                        | 支持        | 支持      | 支持      | 原生（稳定，启动 ~1s）            | 丰富（Oracle / OpenJFX 社区）   | 活跃  | 优点：跨平台强、API 丰富；缺点：UI 现代化需努力。适合 Java 企业级桌面工具。 |
| Qt                   | C++ / QML / Python 等       | 支持        | 支持      | 支持      | 原生（高性能，RAM 低 ~50MB）      | 成熟（Qt 公司，企业生态）       | 活跃  | 优点：高效、嵌入式支持；缺点：C++ 学习曲线。适合高性能 / 工业 APP（如 Autodesk）。 |
| Tauri                | Rust + Web (JS / TS)        | 支持        | 支持      | 支持      | 近原生（轻量，bundle ~5MB，RAM ~50MB） | 成长中（开源，Svelte / React 集成） | 活跃  | 优点：体积小、安全（无 Node.js）；缺点：Rust 后端需学习。Electron 轻量替代，适合工具类 APP。 |
| Avalonia             | C# / .NET / XAML            | 支持        | 支持      | 支持      | 近原生（FPS 119，启动 ~0.9s）     | 中等（.NET 开源社区）           | 活跃  | 优点：WPF-like 跨平台、像素完美；缺点：生态不如 WinUI。适合 .NET 团队多平台 UI。 |
| .NET MAUI            | C# / .NET / XAML            | 支持        | 支持      | 部分（社区）| 近原生（内存低，启动 ~1s）        | 丰富（Microsoft 企业生态）      | 活跃  | 优点：单项目结构、Azure 集成；缺点：Linux / macOS maturing。适合企业跨移动 / 桌面。 |
| wxWidgets            | C++ / Python 等             | 支持        | 支持      | 支持      | 原生（本地控件，高性能）          | 成熟（开源社区，长寿项目）      | 活跃  | 优点：真正本地外观、免费商业使用；缺点：UI 较传统。经典跨平台选择，适合本地感强 APP。 |
| Dear ImGui           | C++ (Immediate Mode)        | 支持        | 支持      | 支持      | 原生（极高性能，轻量）            | 极丰富（游戏 / 工具社区）        | 活跃  | 优点：Immediate Mode 快速开发、极致性能；缺点：非本地外观、适合工具而非消费 APP。游戏调试 / 编辑器首选。 |
| SWT                  | Java                        | 支持        | 支持      | 支持      | 原生（高效，本地外观）            | 中等（Eclipse 社区）             | 活跃  | 优点：本地控件集成、性能优秀（Eclipse IDE 使用）；缺点：部署体积较大、社区较小。适合 Java 企业桌面工具。 |
| egui                 | Rust (Immediate Mode)       | 支持        | 支持      | 支持      | 近原生（快速，轻量）              | 成长中（Rust 社区）              | 活跃  | 优点：简单快速、Immediate Mode 易用、Web 支持强；缺点：非本地外观。适合工具 / 原型 / 游戏集成。 |
| Iced                 | Rust (Elm-inspired)         | 支持        | 支持      | 支持      | 近原生（响应式，高性能）          | 成长中（Rust 社区，COSMIC 使用）| 活跃  | 优点：类型安全、声明式、跨平台成熟；缺点：实验性特征多。适合结构化 Rust 桌面 APP。 |
| gpui                 | Rust (GPU-accelerated)      | 支持        | 支持      | 支持      | 原生（GPU 高性能，120FPS）        | 成长中（Zed 编辑器团队）        | 活跃  | 优点：极致性能、GPU 渲染流畅；缺点：预 1.0、API 变动频繁。适合高响应编辑器 / 工具。 |
| Wails                | Go + Web (JS / TS 等)       | 支持        | 支持      | 支持      | 近原生（系统 WebView，轻量）     | 成长中（Go 社区）                | 活跃  | 优点：Go 后端 + Web 前端、体积小；缺点：依赖系统 WebView。Electron 轻量 Go 替代。 |
| Fyne                 | Go                          | 支持        | 支持      | 支持      | 近原生（Material Design）         | 中等（Go 社区）                  | 活跃  | 优点：纯 Go、本地控件、易学；缺点：UI 风格固定、某些高级特征缺。适合 Go 跨平台桌面 APP。 |

### 说明
- **主流趋势**：Electron / Tauri 仍主导 Web 开发者快速开发；Qt / wxWidgets / Avalonia 企业级稳定；Flutter / Compose Multiplatform 多平台一致性强；Rust 生态（egui / Iced / gpui）性能崛起；Go 系（Fyne / Wails）后端友好。
- **性能基准**：Dear ImGui / gpui / Qt 在高帧率工具场景领先；Tauri / Wails 体积最小。
- **选择建议**：
  - Web / JS 开发者：Electron 或 Tauri。
  - Rust 开发者：egui（快速）、Iced（结构化）、gpui（极致性能）。
  - Go 开发者：Fyne（纯 Go）或 Wails（Web 前端）。
  - Java / C++ 开发者：JavaFX / SWT / wxWidgets 或 Qt / Dear ImGui。
  - .NET 开发者：Avalonia 或 .NET MAUI。
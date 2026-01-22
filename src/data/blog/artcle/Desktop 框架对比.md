---
title: "Desktop 框架对比"
author: "Charles"
description: ""
tags:
  - article
slug: "desktop-framework"
pubDatetime: 2025-12-13T16:13:58.000+08:00
modDatetime: 2025-12-27T14:44:58.000+08:00
featured: false
draft: false
---

本文仅比较跨平台框架，各平台的 native 框架未列出，如：WinUI、WPF、WinForm、SwiftUI。

| 框架                  | 语言 / 写法                  | 支持 Windows | 支持 macOS | 支持 Linux | 性能（相对原生）                  | 社区 / 生态                     | 活跃度 | 优缺点简述 |
|-----------------------|------------------------------|--------------|------------|------------|-----------------------------------|----------------------------------|--------|------------|
| Electron             | JS / HTML / CSS / Node.js   | 是             | 是         | 是         | 中等（RAM 高 ~200MB，启动 ~2s）   | 极丰富（GitHub 支持，插件多）   | 活跃  | 优点：Web 技能复用、生态庞大（VS Code / Slack）；缺点：体积大（~100MB+）、资源消耗高。适合快速原型。 |
| Flutter              | Dart                        | 是             | 是         | 是         | 近原生（FPS 120+，启动 ~0.8s）     | 丰富（Google 支持，插件多）     | 活跃  | 优点：UI 一致性高、热重载快；缺点：Dart 学习曲线、体积 ~50MB。适合多平台 UI 密集 APP。 |
| React Native         | JS / React                  | 是             | 是         | 否         | 近原生（FPS 118，启动 ~1.2s）     | 极丰富（Meta 支持，JS 生态）    | 活跃  | 优点：代码复用高、热更新；缺点：桥接开销、Linux 支持弱。适合 React 团队跨移动 / 桌面。 |
| Compose Multiplatform | Kotlin                      | 是             | 是         | 是         | 原生（高性能，内存低）            | 成长中（JetBrains 支持）        | 活跃  | 优点：声明式 UI、Kotlin 共享逻辑、可扩展到移动 / Web；缺点：Kotlin 曲线陡。适合 Android / KMP 团队桌面及多平台扩展。 |
| JavaFX               | Java                        | 是             | 是         | 是         | 原生（稳定，启动 ~1s）            | 丰富（Oracle / OpenJFX 社区）   | 活跃  | 优点：跨平台强、API 丰富；缺点：UI 现代化需努力。适合 Java 企业级桌面工具。 |
| Qt                   | C++ / QML / Python 等       | 是             | 是         | 是         | 原生（高性能，RAM 低 ~50MB）      | 成熟（Qt 公司，企业生态）       | 活跃  | 优点：高效、嵌入式支持；缺点：C++ 学习曲线高，许可证严格。适合高性能 / 工业 APP（如 Autodesk）。 |
| Tauri                | Rust + Web (JS / TS)        | 是             | 是         | 是         | 近原生（轻量，bundle ~5MB，RAM ~50MB） | 成长中（开源，Svelte / React 集成） | 活跃  | 优点：体积小、安全（无 Node.js）；缺点：Rust 后端需学习。Electron 轻量替代，适合工具类 APP。 |
| .NET MAUI            | C# / .NET / XAML            | 是             | 是         | 否         | 近原生（内存低，启动 ~1s）        | 丰富（Microsoft 企业生态）      | 活跃  | 优点：单项目结构、Azure 集成；缺点：不支持 Linux。适合企业跨移动 / 桌面。 |
| Avalonia             | C# / .NET / XAML            | 是             | 是         | 是         | 近原生（FPS 119，启动 ~0.9s）     | 中等（.NET 开源社区）           | 活跃  | 优点：WPF-like 跨平台、像素完美；缺点：生态不如 .NET MAUI。适合 .NET 团队多平台 UI。 |

### 推荐
- Web / JS 开发者：Electron。
- Rust 开发者：gpui。
- Go 开发者：Fyne。
- Java 开发者：JavaFX。
- C++ 开发者：Qt。
- .NET 开发者：.NET MAUI。

### 其他框架
NW.js（Electron 前身），SWT（用于 Eclipse），Dear ImGui（用于调试器和编辑器），wxWidgets（用于原生外观），egui、Iced、gpui（Rust 生态），Wails、Fyne（Go 生态）。

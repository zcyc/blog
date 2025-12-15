---
title: "2025 年 Desktop 框架对比"
author: "Charles"
description: ""
tags:
  - article
slug: "desktop-framework-2025"
pubDatetime: 2025-12-13T16:13:58.000+08:00
modDatetime: 2025-12-13T16:13:58.000+08:00
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

### 说明
- **主流趋势**：Web-based 框架如 Electron / Tauri 主导快速开发；原生如 Qt / JavaFX 在性能敏感场景领先；Flutter 和 Compose Multiplatform 桌面支持强劲；Tauri 作为 Electron 轻量替代快速崛起。
- **选择建议**：
  - Web / JS 团队：Electron（成熟）或 Tauri（轻量）。
  - 高性能 / 企业：Qt 或 JavaFX。
  - .NET 背景：Avalonia 或 .NET MAUI。
  - Kotlin 多平台共享 UI：Compose Multiplatform。
  - 新项目优先 Tauri / Flutter / Compose Multiplatform，平衡体积与生态。

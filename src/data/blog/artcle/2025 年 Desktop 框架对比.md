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

> 本文含 AI 内容

| 框架                  | 语言/写法              | Windows 支持 | macOS 支持 | Linux 支持 | 性能（相对原生）              | 社区/生态                | 活跃度 | 优缺点简述 |
|-----------------------|------------------------|--------------|------------|------------|-------------------------------|---------------------------|--------|------------|
| Electron             | JS/HTML/CSS/Node.js   | 支持        | 支持      | 支持      | 中等（RAM高~200MB，启动~2s）  | 极丰富（GitHub支持，插件多） | 活跃  | 优点：Web技能复用、生态庞大（VS Code/Slack）；缺点：体积大（~100MB+）、资源消耗高。适合快速原型。 |
| NW.js                | JS/HTML/CSS/Node.js   | 支持        | 支持      | 支持      | 中等（类似Electron，轻微优化）| 中等（开源社区）          | 中等  | 优点：Electron前身、简单集成；缺点：维护较慢、生态小。适合小型Web-to-Desktop迁移。 |
| Flutter (Desktop)    | Dart                  | 支持        | 支持      | 支持      | 近原生（FPS 120+，启动~0.8s） | 丰富（Google支持，插件多） | 活跃  | 优点：UI一致性高、热重载快；缺点：Dart学习曲线、体积~50MB。适合多平台UI密集APP。 |
| React Native (Desktop)| JS/React              | 支持（Windows/macOS）| 支持      | 部分（社区）| 近原生（FPS 118，启动~1.2s）  | 极丰富（Meta支持，JS生态） | 活跃  | 优点：代码复用高、热更新；缺点：桥接开销、Linux支持弱。适合React团队跨移动/桌面。 |
| Compose for Desktop  | Kotlin (Compose Multiplatform) | 支持        | 支持      | 支持      | 原生（高性能，内存低）        | 成长中（JetBrains支持）    | 活跃  | 优点：声明式UI、Kotlin共享逻辑；缺点：Kotlin曲线陡。适合Android/KMP团队桌面扩展。 |
| JavaFX               | Java                  | 支持        | 支持      | 支持      | 原生（稳定，启动~1s）         | 丰富（Oracle/OpenJFX社区） | 活跃  | 优点：跨平台强、API丰富；缺点：UI现代化需努力。适合Java企业级桌面工具。 |
| Qt                   | C++/QML/Python等      | 支持        | 支持      | 支持      | 原生（高性能，RAM低~50MB）    | 成熟（Qt公司，企业生态）   | 活跃  | 优点：高效、嵌入式支持；缺点：C++学习曲线。适合高性能/工业APP（如Autodesk）。 |
| Tauri                | Rust + Web (JS/TS)    | 支持        | 支持      | 支持      | 近原生（轻量，bundle~5MB，RAM~50MB） | 成长中（开源，Svelte/React集成） | 活跃  | 优点：体积小、安全（无Node.js）；缺点：Rust后端需学习。Electron轻量替代，适合工具类APP。 |
| Avalonia             | C#/.NET/XAML          | 支持        | 支持      | 支持      | 近原生（FPS 119，启动~0.9s）  | 中等（.NET开源社区）       | 活跃  | 优点：WPF-like跨平台、像素完美；缺点：生态不如WinUI。适合.NET团队多平台UI。 |
| .NET MAUI            | C#/.NET/XAML          | 支持        | 支持      | 部分（社区）| 近原生（内存低，启动~1s）     | 丰富（Microsoft企业生态）  | 活跃  | 优点：单项目结构、Azure集成；缺点：Linux/macOS maturing。适合企业跨移动/桌面。 |

### 说明
- **主流趋势**：Web-based框架如Electron/Tauri主导快速开发（~40%市场），原生如Qt/JavaFX在性能敏感场景（如工业/游戏）领先。Flutter和Compose扩展桌面支持强劲，Tauri崛起为Electron替代（bundle大小减90%）。
- **性能基准**：Qt/Tauri在资源使用上最佳；Electron适合非性能关键APP。 
- **其他框架**：未列入如GTK（C/GNOME生态，Linux强）、WPF（Windows专用）、Sciter（超轻Web，~5MB但生态小）、Uno Platform（.NET WinUI跨端，类似Avalonia）。新兴如Bevy（Rust游戏桌面）非通用UI。
- **选择建议**：
  - Web/JS团队：Electron（成熟）或Tauri（轻量）。
  - 高性能/企业：Qt或JavaFX。
  - .NET背景：Avalonia或.NET MAUI。
  - 多平台UI：Flutter或Compose for Desktop。
  - 新项目优先Tauri/Flutter，平衡体积与生态。
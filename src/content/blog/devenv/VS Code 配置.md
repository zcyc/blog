---
title: "VS Code 配置"
author: "Charles"
description: ""
tags:
  - ide
slug: "vscode-config"
pubDatetime: 2022-10-21T14:21:59.000+08:00
modDatetime: 2024-05-06T17:10:00.000+08:00
featured: false
draft: false
---

# 配置

网上推荐的很多配置是默认值。本列表仅包含和[default-settings](https://code.visualstudio.com/docs/reference/default-settings)不同的配置。

```json
{
  // 关闭官方插件和部分第三方插件遥测
  "telemetry.telemetryLevel": "off",
  // 自动切换主题
  "window.autoDetectColorScheme": true,
  // 自动删除行尾空格
  "files.trimTrailingWhitespace": true,
  // 自动 fetch
  "git.autofetch": true,
  // 智能 commit
  "git.enableSmartCommit": true,
  // 编辑器字体
  "editor.fontFamily": "Intel One Mono",
  // 标签换行
  "workbench.editor.wrapTabs": true,
  // 代码小地图
  "editor.minimap.enabled": false,
  // 彩虹指引线
  "editor.guides.bracketPairs": "active",
  // 自动重命名标签
  "editor.linkedEditing": true,
  // JavaScript 文件移动后自动修改导入
  "javascript.updateImportsOnFileMove.enabled": "always",
  // TypeScript 文件移动后自动修改导入
  "typescript.updateImportsOnFileMove.enabled": "always",
  // Rust 风格检测
  "rust-analyzer.check.command": "clippy",
  // Python 类型检测
  "python.analysis.typeCheckingMode": "strict",
  // 关闭红帽遥测
  "redhat.telemetry.enabled": false,
  // Go 未导入包的代码补全
  "go.useLanguageServer": true,
  // Go 工具自动升级工具
  "go.toolsManagement.autoUpdate": true,
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "github.copilot.editor.enableAutoCompletions": true,
  "[typescriptreact]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "git.confirmSync": false,
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "workbench.activityBar.location": "top",
  "editor.fontSize": 13,
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },
  "[go]": {
    "editor.codeActionsOnSave": {
      "source.organizeImports": "never"
    }
  }
}
```

# 扩展

网上推荐的很多扩展功能已经内置了。本列表仅包含和官方功能不重复的扩展。

```json
aaron-bond.better-comments
antfu.slidev
antfu.unocss
astro-build.astro-vscode
biomejs.biome
bradlc.vscode-tailwindcss
davidanson.vscode-markdownlint
donjayamanne.githistory
dsznajder.es7-react-js-snippets
geequlim.godot-tools
github.copilot
github.copilot-chat
github.github-vscode-theme
golang.go
gruntfuggly.todo-tree
kevinrose.vsc-python-indent
mechatroner.rainbow-csv
mikestead.dotenv
ms-azuretools.vscode-docker
ms-dotnettools.csharp
ms-dotnettools.vscode-dotnet-runtime
ms-kubernetes-tools.vscode-kubernetes-tools
ms-python.debugpy
ms-python.isort
ms-python.python
ms-python.vscode-pylance
ms-vscode-remote.remote-containers
ms-vscode-remote.remote-ssh
ms-vscode-remote.remote-ssh-edit
ms-vscode-remote.remote-wsl
ms-vscode-remote.vscode-remote-extensionpack
ms-vscode.remote-explorer
ms-vscode.remote-server
ms-vscode.vscode-speech
pucelle.vscode-css-navigation
quicktype.quicktype
redhat.java
redhat.vscode-xml
redhat.vscode-yaml
rust-lang.rust-analyzer
sdras.vue-vscode-snippets
simonhe.common-intellisense
steoates.autoimport
streetsidesoftware.code-spell-checker
tauri-apps.tauri-vscode
unifiedjs.vscode-mdx
usernamehw.errorlens
vadimcn.vscode-lldb
visualstudioexptteam.intellicode-api-usage-examples
visualstudioexptteam.vscodeintellicode
vscjava.vscode-gradle
vscjava.vscode-java-debug
vscjava.vscode-java-dependency
vscjava.vscode-java-pack
vscjava.vscode-java-test
vscjava.vscode-maven
vue.volar
wmaurer.change-case
yzhang.markdown-all-in-one
zainchen.json
zxh404.vscode-proto3
```

## 导入导出扩展

```json
# 导出
code --list-extensions > extensions.txt

# macOS/Linux 导入
cat extensions.txt | xargs -L 1 code --install-extension

# Windows CMD 导入
cat extensions.txt |% { code --install-extension $_}

# Windows Powershell 导入
Get-Content extensions.txt | ForEach-Object { code --install-extension $_ }
```

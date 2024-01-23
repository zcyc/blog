---
title: "VS Code 配置"
author: "Charles"
description: ""
tags:
  - IDE
ogImage: ""
slug: "vscode-config"
pubDatetime: 2022-10-21T14:21:59.000Z
modDatetime: 2023-10-13T18:27:08.000Z
featured: false
draft: false
---

# 配置

网上推荐的很多配置是默认值。本列表仅包含和默认值不同的配置。
包含 Rust、Go、Python、Java、Lua、TypeScript、JavaScript、React、Vue 等常用配置。

```json
{
  // 关闭官方插件和部分第三方插件遥测
  "telemetry.telemetryLevel": "off",
  // 自动切换主题
  "window.autoDetectColorScheme": true,
  // 开启候选断点调试
  "debug.showInlineBreakpointCandidates": true,
  // 自动删除行尾空格
  "files.trimTrailingWhitespace": true,
  // 延时自动保存
  "files.autoSave": "afterDelay",
  // 自动保存间隔
  "files.autoSaveDelay": 60000,
  // 自动 fetch
  "git.autofetch": true,
  // 智能 commit
  "git.enableSmartCommit": true,
  // 编辑器字体
  "editor.fontFamily": "Intel One Mono",
  // 编辑器字号
  "editor.fontSize": 16,
  // 固定的标签放在单独的行
  "workbench.editor.pinnedTabsOnSeparateRow": true,
  // 标签换行
  "workbench.editor.wrapTabs": true,
  // 保存时格式化
  "editor.formatOnSave": true,
  // 代码小地图
  "editor.minimap.enabled": false,
  // 保存时执行操作
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true, // 修复 Eslint
    "source.organizeImports": true // 按照字母表顺序重排 import
  },
  // 保存时执行命令
  "saveAndRun": {
    "commands": [
      {
        "match": "internal/logic/.*.go",
        "cmd": "gf gen service",
        "useShortcut": false,
        "silent": true
      } // goframe
    ]
  },
  // 彩虹括号
  "editor.bracketPairColorization.enabled": true,
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
  // 设置默认格式化器
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

# 扩展

网上推荐的很多扩展功能已经内置了。本列表仅包含和官方功能不重复的扩展。
包含 Rust、Go、Python、Java、Lua、TypeScript、JavaScript、React、Vue 等常用扩展。

```json
antfu.browse-lite
antfu.goto-alias
antfu.iconify
antfu.unocss
antfu.vite
astro-build.astro-vscode
bradlc.vscode-tailwindcss
csstools.postcss
Dart-Code.dart-code
Dart-Code.flutter
dbaeumer.vscode-eslint
donjayamanne.githistory
dsznajder.es7-react-js-snippets
esbenp.prettier-vscode
golang.go
GrapeCity.gc-excelviewer
Gruntfuggly.todo-tree
lokalise.i18n-ally
mhutchie.git-graph
ms-azuretools.vscode-docker
MS-CEINTL.vscode-language-pack-zh-hans
ms-playwright.playwright
ms-python.black-formatter
ms-python.isort
ms-python.pylint
ms-python.python
ms-python.vscode-pylance
ms-vscode-remote.remote-containers
ms-vscode-remote.remote-ssh
ms-vscode-remote.remote-ssh-edit
ms-vscode-remote.remote-wsl
ms-vscode-remote.vscode-remote-extensionpack
ms-vscode.remote-explorer
ms-vscode.remote-server
naumovs.color-highlight
quicktype.quicktype
redhat.java
redhat.vscode-xml
redhat.vscode-yaml
rust-lang.rust-analyzer
sdras.vue-vscode-snippets
sibiraj-s.vscode-scss-formatter
tauri-apps.tauri-vscode
usernamehw.errorlens
vadimcn.vscode-lldb
VisualStudioExptTeam.intellicode-api-usage-examples
VisualStudioExptTeam.vscodeintellicode
vscjava.vscode-java-debug
vscjava.vscode-java-dependency
vscjava.vscode-java-pack
vscjava.vscode-java-test
vscjava.vscode-maven
Vue.volar
Vue.vscode-typescript-vue-plugin
wk-j.save-and-run
wmaurer.change-case
yinfei.luahelper
yokoe.vscode-postfix-go
yzhang.markdown-all-in-one
zxh404.vscode-proto3
```

## 导入导出扩展

```json
# 导出
code --list-extensions > extensions.txt

# macOS/Linux 导入
cat extensions.txt | xargs code --list-extensions {}

# Windows 导入
cat extensions.txt |% { code --install-extension $_}
```

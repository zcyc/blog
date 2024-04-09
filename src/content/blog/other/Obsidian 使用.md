---
title: "obsidian"
author: "Charles"
description: "obsidian 模版"
tags:
  - other
slug: "obsidian"
pubDatetime: 2024-04-09T10:06:55.000+08:00
featured: false
draft: false
---

# 使用 Template

需要安装 Templater 插件

## 创建文件

![Untitled](/assets/obsidian-1.png)

## 写入内容

以下配置区别在 description 和 slug 是否包含目录，二选一个即可

```
<% '---' %>
title: "<% tp.file.title %>"
author: "Charles"
description: "<% tp.file.path(true).replace(/[ \/-]/g, ' ').replace(/(^blog |\.md$)/g, '') %>"
tags:
  - <% tp.file.path(true).split("/").slice(1,-1).join("\n  - ") %>
slug: "<% tp.file.path(true).replace(/[ \/]/g, '-').replace(/(^blog-|\.md$)/g, '') %>"
pubDatetime: <% tp.date.now("YYYY-MM-DDTHH:mm:ss.000Z") %>
featured: false
draft: false
<% '---' %>
```

```
<% '---' %>
title: "<% tp.file.title %>"
author: "Charles"
description: "<% tp.file.title.replace(/[-]/g, ' ').replace(/\.md$/, '') %>"
tags:
  - <% tp.file.path(true).split("/").slice(1,-1).join("\n  - ") %>
slug: "<% tp.file.title.replace(/\.md$/, '') %>"
pubDatetime: <% tp.date.now("YYYY-MM-DDTHH:mm:ss.000Z") %>
featured: false
draft: false
<% '---' %>
```

# 使用 QuickAdd

需要安装 QuickAdd 插件

## 配置

![Untitled](/assets/obsidian-2.jpg)

## 使用

- Command + P
- 输入 quick blog
- 回车
- 输入文件名（英文，用 - 连接，可以包含目录，如：other/how-to-use-obsidian）
- 回车

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

# template

需要安装 Templater 和 QuickAdd 插件

## 创建目录和文件

![Untitled](/assets/obsidian-1.png)

## 写入模版内容

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

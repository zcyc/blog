---
title: "Open Graph"
author: "Charles"
description: ""
tags:
  - article
slug: "open-graph"
pubDatetime: 2026-02-06T15:00:00.000+08:00
modDatetime: 2026-02-06T15:00:00.000+08:00
featured: false
draft: false
---

有些人分享链接时，预览图很大很精美，标题和描述也特别吸引人；而有些人分享的链接只有个丑丑的默认图，甚至压根没有图。

这中间的巨大差距，取决于网站有没有正确使用 **Open Graph 协议**（简称 OG 协议）。一个好的 Open Graph 配置比没配置高 2–5 倍的点击率。

### Open Graph 介绍

Open Graph 协议是 **Facebook 在 2010 年推出**的一个开放标准，目的是让任何网页都能变成社交网络里的“富媒体对象”。

简单说就是当你在微信、微博、X（Twitter）、Telegram、Discord、LinkedIn 等平台分享一个链接时，平台会去抓取网页里的某些特殊 meta 标签，然后生成一个漂亮的**卡片预览**（标题 + 描述 + 大图）。

这些特殊 meta 标签就叫 **Open Graph 标签**，通常以 `og:` 开头。

### 必填标签

官方要求每个页面至少包含这四个属性：

```html
<meta property="og:title" content="文章或页面的标题" />
<meta property="og:description" content="吸引人的一两句话描述" />
<meta property="og:image" content="https://your-site.com/og-image.jpg" />
<meta property="og:url" content="https://your-site.com/current-page" />
```

再加上一个强烈推荐的：

```html
<meta property="og:type" content="website" />   <!-- 或 article、video.movie 等 -->
```

### 完整写法

下面是一个目前最常用、最兼容的写法示例，适合博客文章或普通网页：

```html
<head prefix="og: https://ogp.me/ns#">
  <!-- 必填 & 最重要 -->
  <meta property="og:title" content="2026 年最值得学习的 5 个前端框架" />
  <meta property="og:description" content="React 还是过气了？今年最火的框架排行 + 真实项目选型建议，一文帮你少走弯路。" />
  <meta property="og:image" content="https://your-site.com/images/og/2026-frontend-frameworks.jpg" />
  <meta property="og:url" content="https://your-site.com/blog/2026-top-frontend-frameworks" />
  <meta property="og:type" content="article" />

  <!-- 强烈推荐，增加兼容性和显示效果 -->
  <meta property="og:site_name" content="张三的科技博客" />
  <meta property="og:locale" content="zh_CN" />  <!-- 中文用 zh_CN，英文用 en_US -->

  <!-- 图片尺寸信息（防止拉伸或延迟加载） -->
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter / X 额外兼容（现在也认 og: 标签，但加这个更保险） -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="2026 年最值得学习的 5 个前端框架" />
  <meta name="twitter:description" content="React 还是过气了？今年最火的框架排行 + 真实项目选型建议，一文帮你少走弯路。" />
  <meta name="twitter:image" content="https://your-site.com/images/og/2026-frontend-frameworks.jpg" />
</head>
```

### 图片尺寸

| 平台          | 推荐尺寸       | 宽高比   | 备注                              |
|---------------|----------------|----------|---------------------------------|
| Facebook      | 1200 × 630     | 1.91:1   | 最通用，主流选择                   |
| LinkedIn      | 1200 × 627     | ≈1.91:1  | 跟 Facebook 几乎一样              |
| X (Twitter)   | 1200 × 675     | 1.78:1   | 稍高一点，summary_large_image 最佳 |
| Telegram      | 1200 × 630     | 1.91:1   | 对尺寸比较宽容，但建议高清           |
| 微信朋友圈      | ≥ 400 × 400    | —        | 但越大越好，通常用 1200×630        |

**图片设计小Tips**：

- 文件大小控制在 **< 300KB**（最好 < 150KB）
- 格式：**jpg / png / webp** 都可以，webp 最省流量
- 文字要大、对比度高（手机上也要清晰）
- 重要文字不要靠边（会被裁切）
- 加点品牌 logo 或网站域名，但别抢主视觉的风头

### 测试工具
- **opengraph.xyz**:https://www.opengraph.xyz/
- **iframely.com/debug**:https://debug.iframely.com/
- **Telegram 官方机器人**：https://t.me/WebpageBot
- **Facebook Sharing Debugger**：https://developers.facebook.com/tools/debug/
- **LinkedIn Post Inspector**：https://www.linkedin.com/post-inspector/

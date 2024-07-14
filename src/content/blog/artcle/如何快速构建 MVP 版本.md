---
title: "如何快速构建 MVP 版本"
author: "Charles"
description: ""
tags:
  - article
slug: "mvp"
pubDatetime: 2024-07-14T01:00:00.000+08:00
featured: false
draft: true
---

# 前言
现在从创业的沉默成本非常高，如何快速构建 MVP 版本至关重要，本文将讨论如何技术选型能快速构建 MVP 版本。

# 后端
对于后端来说，快速给出 API 是重中之重，此阶段不要过度关注性能。
## 接口
### [Ruby on Rails](https://github.com/rails/rails)
Rails 可以使用 Resource routing 生成 REST 接口。
### [Nest.js](https://github.com/nestjs/nest)
Nest 可以使用 CRUD generator 生成 REST 接口。
### [Laravel](https://github.com/laravel/laravel)
Laravel 可以使用 Resource controller 生成 REST 接口。
### [Strapi](https://github.com/strapi/strapi)
Strapi 可以生成 CMS 接口。
### [Directus](https://github.com/directus/directus)
Directus 可以生成 CMS 接口，组件比 Strapi 丰富，数据关联不如 Strapi 好用。
## workflow
### [Activepieces](https://github.com/activepieces/activepieces)
节点多
### [n8n](https://github.com/n8n-io/n8n)
节点多，交互不如 Activepieces
### [Node-RED](https://github.com/node-red/node-red)
节点少，无账号系统，适合作为工作流组件嵌入到其他应用中

# 前端
对于前端来说，快速完成核心交互是重中之重。
## 应用
### [NocoBase](https://github.com/nocobase/nocobase)
### [Budibase](https://github.com/budibase/budibase)
## 管理后台
### [amis](https://github.com/baidu/amis)
### [appsmith](https://github.com/appsmithorg/appsmith)
### [baserow](https://github.com/bram2w/baserow)
## 落地页
### [Webflow](https://webflow.com/)
无需集成和部署
### [Builder](https://github.com/BuilderIO/builder)
需要集成和部署

# SaaS
## 用户
### [Clerk](https://clerk.com/)
相较于其他同类平台价格最优惠
### [Stripe](https://stripe.com/)
## 统计
### [PostHog](https://posthog.com/)
这个有开源版本
### [Baselime](https://baselime.io/)
## 邮件
### [Resend](https://resend.com/)
扩展性强，开发者友好
### [Loops](https://loops.so/)
### [Brevo](https://www.brevo.com/)
无需集成
### [Klaviyo](https://www.klaviyo.com/)
### [mailchimp](https://mailchimp.com/)
无需集成
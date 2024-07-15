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

## REST & CMS
此处只列出部分方案，喜欢 PHP 的用户可以用 Laravel 和 ThinkPHP，也能生成 CRUD。
### [Ruby on Rails](https://github.com/rails/rails)
Rails 可以使用 Resource routing 生成 REST 接口，包含 service 逻辑，写法非常灵活，不适合新手团队协作。
### [Nest.js](https://github.com/nestjs/nest)
Nest 可以使用 CRUD generator 生成 REST 接口，service 逻辑要自己写，基于 TypeScript 的类型安全，需要理解依赖注入。
### [Strapi](https://github.com/strapi/strapi)
Strapi 可以生成 CMS 接口。
### [Directus](https://github.com/directus/directus)
Directus 可以生成 CMS 接口，组件比 Strapi 多，数据关联不如 Strapi 好用。

## 工作流 & 定时任务
此处只列出部分方案，HomeLab 可以用[青龙](https://github.com/whyour/qinglong)，复杂任务可以用 [DolphinScheduler](https://github.com/apache/dolphinscheduler) 或 [Airflow](https://github.com/apache/airflow)。
### [Activepieces](https://github.com/activepieces/activepieces)
节点多，使用简单。
### [n8n](https://github.com/n8n-io/n8n)
节点多，交互不如 Activepieces。

# 前端
对于前端来说，快速完成核心交互是重中之重。

## 应用
### [Budibase](https://github.com/budibase/budibase)
基于现有数据库搭建管理后台，支持 API 操作。
### [amis](https://github.com/baidu/amis)
通过配置快速生成 React CRUD 组件。

## 管理后台
### [NocoBase](https://github.com/nocobase/nocobase)
可以搭建简单的管理系统，不支持 API 操作。
### [appsmith](https://github.com/appsmithorg/appsmith)
### [baserow](https://github.com/bram2w/baserow)

## 落地页
### [Webflow](https://webflow.com/)
无需集成和部署。
### [Builder](https://github.com/BuilderIO/builder)
需要集成和部署。

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
此处只列出部分方案，[Klaviyo](https://www.klaviyo.com/) 和 [mailchimp](https://mailchimp.com/) 可以作为备选。
### [Resend](https://resend.com/)
使用简单，引入 SDK 即可发邮件，每月免费 3000 封邮件，限制每日 100 封邮件。
### [Loops](https://loops.so/)
强制绑定域名，提供 Signup 集成，有模版功能，每月免费 2000 封邮件，限制 1000 个邮箱。
### [Brevo](https://www.brevo.com/)
强制绑定手机号，每天 300 封邮件，可以导入邮箱进行营销，可视化编辑页面，无需集成。
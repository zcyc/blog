---
title: "如何快速构建 MVP 版本"
author: "Charles"
description: ""
tags:
  - article
slug: "mvp"
pubDatetime: 2024-07-14T01:00:00.000+08:00
modDatetime: 2024-07-16T12:00:00.000+08:00
featured: false
draft: false
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
此处只列出部分方案，[Budibase](https://github.com/budibase/budibase) 和 [Appsmith](https://github.com/appsmithorg/appsmith) 能连接外部数据库做 CRUD，使用复杂，前者提供 API。[NocoBase](https://github.com/nocobase/nocobase) 使用简单，但连接外部数据库收费。
### [NocoDB](https://github.com/nocodb/nocodb)
Airtable 的开源替代品，能满足基本的表格分享。
### [baserow](https://github.com/bram2w/baserow)
Airtable 的开源替代品，能满足基本的表格分享，界面不如 NocoDB 干净，有些按钮一点就提示付费。

## 管理后台
此处只列出部分方案，[vue-next-admin](https://gitee.com/lyt-top/vue-next-admin) 和 [Geeker-Admin](https://github.com/HalseySpicy/Geeker-Admin) 暂时没有试用。
### [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin)
符合中国宝宝体质，兼容移动端。
### [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin)
还是符合中国宝宝体质。
### [amis](https://github.com/baidu/amis)
通过 JSON 配置生成 React CRUD 组件。
### [fast-crud](https://github.com/fast-crud/fast-crud)
通过 JS 配置生成 Vue CRUD 组件。
### [Refine](https://github.com/refinedev/refine)
可以连接多种数据源的 React CRUD 组件。

## 可视化
此处只列出部分方案，[Grafana](https://github.com/grafana/grafana) 偏技术场景，[Redash](https://github.com/getredash/redash) 需要写 SQL。
### [Metabase](https://github.com/metabase/metabase)
可视化编辑，产品经理可以搭建基础的看板，减轻开发的工作量。
### [Superset](https://github.com/apache/superset)
Airbnb 开源的 BI 工具，功能强大，需要写 SQL。

# SaaS

## 用户
### [Clerk](https://clerk.com/)
相较于其他同类平台价格最优惠
### [Stripe](https://stripe.com/)
申请要求比较高。

## 统计
此处只列出部分方案，[Datadog](https://www.datadoghq.com/) 和 [Cronitor](https://cronitor.io/) 也提供免费试用。
### [PostHog](https://posthog.com/)
提供开源版本，有免费额度。
### [Baselime](https://baselime.io/)
暂无收费套餐，有免费额度。

## 协作
### [Linear](https://linear.app/)
用来规划产品，同步目标和进度，免费版够用。[Plane](https://github.com/makeplane/plane) 是它的开源替代。
### [Notion](https://www.notion.so/)
用来做团队知识库，写策划案，也能规划产品，免费版够用。[AFFiNE](https://github.com/toeverything/AFFiNE) 是它的开源替代。
### [Figma](https://www.figma.com/)
用来设计原型/UI/UX，免费版无法使用 Dev Mode。[Penpot](https://github.com/penpot/penpot) 是它的开源替代。

## 邮件
此处只列出部分方案，[Klaviyo](https://www.klaviyo.com/) 和 [mailchimp](https://mailchimp.com/) 可以作为备选。
### [Resend](https://resend.com/)
使用简单，引入 SDK 即可发邮件，每月免费 3000 封邮件，限制每日 100 封邮件。
### [Loops](https://loops.so/)
强制绑定域名，提供 Signup 集成，有模版功能，每月免费 2000 封邮件，限制 1000 个邮箱。
### [Brevo](https://www.brevo.com/)
强制绑定手机号，每天 300 封邮件，可以导入邮箱进行营销，可视化编辑页面，无需集成。

## 后端平台
### [Supabase](https://github.com/supabase/supabase)
提供开源版本，有免费额度。
### [Appwrite](https://github.com/appwrite/appwrite)
提供开源版本，有免费额度。
### [Firebase](https://firebase.google.com)
有免费额度。

## 部署
此处只列出部分方案，[Netlify](https://www.netlify.com/) 和 [Zeabur](https://zeabur.com/) 也有免费额度，[Fly](https://fly.io/) 免费额度需绑卡，[Heroku](https://www.heroku.com/) 和 [Railway](https://railway.app/) 无免费额度。
### [Cloudflare](https://www.cloudflare.com/)
赛博佛祖，不用多说
### [Vercel](https://vercel.com/)
赛博菩萨，不用多说

## 落地页
### [Webflow](https://webflow.com/)
无需集成和部署。
### [Builder](https://github.com/BuilderIO/builder)
需要集成和部署。
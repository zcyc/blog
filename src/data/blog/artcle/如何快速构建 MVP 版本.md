---
title: "如何快速构建 MVP 版本"
author: "Charles"
description: ""
tags:
  - article
slug: "build-mvp-quickly"
pubDatetime: 2024-07-14T01:00:00.000+08:00
modDatetime: 2025-01-22T23:28:00.000+08:00
featured: false
draft: false
---

# 前言
创业的沉没成本非常高，快速构建 MVP 版本至关重要。本文列举了部分有助于快速构建 MVP 版本的项目。

# 后端
对于后端来说，快速给出 API 是重中之重，此阶段不要过度关注性能。

## REST
此处只列出部分方案，其他可以生成 REST 接口的框架有：[Ruby on Rails](https://guides.rubyonrails.org/routing.html#resource-routing-the-rails-default)、[Laravel](https://laravel.com/docs/11.x/controllers#resource-controllers)、[Django REST framework](https://www.django-rest-framework.org/api-guide/viewsets/)、[webman](https://www.workerman.net/doc/webman/route.html#%E8%B5%84%E6%BA%90%E5%9E%8B%E8%B7%AF%E7%94%B1)、[Phoenix](https://hexdocs.pm/phoenix/routing.html#resources)；CMS 接口可以用 [Strapi](https://github.com/strapi/strapi) 和 [Directus](https://github.com/directus/directus) 生成，Directus 组件更多，但数据关联不好用。
### [Spring Boot](https://blog.d8s.fun/posts/java-framework-rest)
可以生成 REST 接口，生态完善。
### [ASP.NET Core](https://blog.d8s.fun/posts/asp-dotnet-rest)
可以生成 REST 接口，语法强大。

## 工作流 & 定时任务
此处只列出部分方案，[Zapier](https://zapier.com/) 提供免费额度，简单任务用[青龙](https://github.com/whyour/qinglong)、[Windmill](https://github.com/windmill-labs/windmill)，复杂任务用 [DolphinScheduler](https://github.com/apache/dolphinscheduler)、[Airflow](https://github.com/apache/airflow)。
### [Activepieces](https://github.com/activepieces/activepieces)
节点多，使用简单。
### [n8n](https://github.com/n8n-io/n8n)
节点多，交互不如 Activepieces。

# 前端
对于前端来说，快速完成核心交互是重中之重。

## 表格
此处只列出部分方案，[baserow](https://github.com/bram2w/baserow)、[NocoBase](https://github.com/nocobase/nocobase)、[APITable](https://github.com/apitable/apitable) 使用简单，baserow 界面上有很多付费按钮，NocoBase 连接外部数据库收费，APITable 无法连接外部数据库。[Budibase](https://github.com/budibase/budibase) 和 [Appsmith](https://github.com/appsmithorg/appsmith) 使用复杂，可以连接外部数据库，Budibase 提供 API。
### [NocoDB](https://github.com/nocodb/nocodb)
Airtable 的开源替代品，可以满足基本的表格分享。
### [Tally](https://tally.so/)
[Typeform](https://www.typeform.com/) 的替代品，提供免费额度。

## 管理后台
此处只列出部分方案，[soybean-admin](https://github.com/soybeanjs/soybean-admin)、[vue-next-admin](https://gitee.com/lyt-top/vue-next-admin)、[Geeker-Admin](https://github.com/HalseySpicy/Geeker-Admin)、[v3-admin-vite](https://github.com/un-pany/v3-admin-vite) 开源，[vue-pure-admin](https://github.com/pure-admin/vue-pure-admin) 静态路由报错。

### [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin)
符合中国宝宝体质，Windows 无法编译。
### [RuoYi-Vue3](https://github.com/yangzongzhuan/RuoYi-Vue3)
经典 Element 风格 Admin。

## 低代码
### [amis](https://github.com/baidu/amis)
通过 JSON 配置生成 React CRUD 组件。
### [fast-crud](https://github.com/fast-crud/fast-crud)
通过 JS 配置生成 Vue CRUD 组件。
### [Refine](https://github.com/refinedev/refine)
可以连接多种数据源的 React CRUD 组件。

## 低代码
### [amis](https://github.com/baidu/amis)
通过 JSON 配置生成 React CRUD 组件。
### [fast-crud](https://github.com/fast-crud/fast-crud)
通过 JS 配置生成 Vue CRUD 组件。
### [Refine](https://github.com/refinedev/refine)
可以连接多种数据源的 React CRUD 组件。

## 白板
此处只列出部分方案，[WBO](https://github.com/lovasoa/whitebophir) 主打协作。
### [Excalidraw](https://github.com/excalidraw/excalidraw)
提供开源版本。
### [tldraw](https://github.com/tldraw/tldraw)
提供开源版本。


## 可视化
此处只列出部分方案，[Grafana](https://github.com/grafana/grafana) 偏技术场景，[Redash](https://github.com/getredash/redash) 需要写 SQL。
### [Metabase](https://github.com/metabase/metabase)
可视化编辑，产品经理可以搭建基础的看板，减轻开发的工作量。
### [Superset](https://github.com/apache/superset)
Airbnb 开源的 BI 工具，功能强大，需要写 SQL。

# SaaS

## 认证
此处只列出部分方案，[PropelAuth](https://www.propelauth.com/) 和 [Auth0](https://auth0.com/) 有免费额度。[后端平台](#后端平台)提供无前端集成的认证接口。[NextAuth](https://github.com/nextauthjs/next-auth) 和 [authelia](https://github.com/authelia/authelia) 开源。
### [Clerk](https://clerk.com/)
相较于其他同类平台价格最优惠。
### [Logto](https://github.com/logto-io/logto) 
提供开源版本。

## 收款
此处只列出部分方案，[Stripe](https://stripe.com/) 需要注册海外公司，[Lemon Squeezy](https://www.lemonsqueezy.com/) 可以个人注册，替代品还有 [Paddle](https://www.paddle.com/)。
### [PingPong](https://www.pingpongx.com/)
### [连连收款](https://global.lianlianpay.com/)
### [Payoneer](https://www.payoneer.com/zh-hans/)

## 统计 & 分析
此处只列出部分方案，[Datadog](https://www.datadoghq.com/)、[Cronitor](https://cronitor.io/)、[Baselime](https://baselime.io/) 有免费额度，[Fluent Bit](https://github.com/fluent/fluent-bit/) 和 [Umami](https://github.com/umami-software/umami) 开源。
### [PostHog](https://posthog.com/)
提供开源版本，有免费额度。
### [Clarity](https://clarity.microsoft.com/)
免费，但数据会用于机器学习。

## 日志 & 错误收集
此处只列出部分方案，[PagerDuty](https://www.pagerduty.com/)、[Rollbar](https://rollbar.com/)、[New Relic](https://newrelic.com/)、[Better Stack](https://betterstack.com/)、[sumo logic](https://www.sumologic.com/) 有免费额度。
### [Sentry](https://sentry.io/)
提供开源版本，有免费额度。


## 协作
### [Linear](https://linear.app/)
用来规划产品，同步目标和进度，免费版够用。[Plane](https://github.com/makeplane/plane) 是它的开源替代。
### [Notion](https://www.notion.so/)
用来做团队知识库，写策划案，规划产品，免费版够用。[AFFiNE](https://github.com/toeverything/AFFiNE) 是它的开源替代。
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
此处只列出部分方案，[Firebase](https://firebase.google.com) 和 [Amplify](https://aws.amazon.com/cn/amplify/) 有免费额度。
### [Supabase](https://github.com/supabase/supabase)
提供开源版本，有免费额度。
### [Appwrite](https://github.com/appwrite/appwrite)
提供开源版本，有免费额度。

## 部署
此处只列出部分方案，[Netlify](https://www.netlify.com/)、[Zeabur](https://zeabur.com/)、[Render](https://render.com/) 有免费额度，[Fly](https://fly.io/) 免费额度需绑卡，[Heroku](https://www.heroku.com/) 和 [Railway](https://railway.app/) 无免费额度。
### [Cloudflare](https://www.cloudflare.com/)
赛博佛祖，不用多说
### [Vercel](https://vercel.com/)
赛博菩萨，不用多说

## 落地页
### [Webflow](https://webflow.com/)
无需集成和部署。
### [Builder](https://github.com/BuilderIO/builder)
需要集成和部署。

## 外包
此处只列出部分方案，需要外语交流。
### [Upwork](https://www.upwork.com/)
### [Gusto](https://gusto.com/)

# 其他
## API
### [Apifox](https://apifox.com/)
挺好用的，已经超越 Postman，还提供 API Hub。类似的工具还有 Apipost。
### [Rapid](https://rapidapi.com/hub)
Rapid 不好用，但是 Rapid API Hub 不错。

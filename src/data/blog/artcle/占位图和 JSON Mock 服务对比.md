---
title: "占位图和 JSON Mock 服务对比"
author: "Charles"
description: ""
tags:
  - article
slug: "placeholder-image-and-json-mock"
pubDatetime: 2026-02-07T11:04:07.000+08:00
modDatetime: 2026-02-07T11:04:07.000+08:00
featured: false
draft: false
---

开发中经常用到占位图和 JSON Mock，本文对比当前比较常用的服务。

---

## 图片占位

| 服务名称       | 代表 URL 示例                     | 图片类型          | 自定义程度                        | 真实照片 | 主要特色                              | 典型使用场景                  |
|----------------|-----------------------------------|-------------------|-----------------------------------|--------------------|---------------------------------------|-------------------------------|
| Lorem Picsum   | https://picsum.photos/200/300     | 真实 Unsplash 照片 | 尺寸、模糊、灰度、特定 ID、种子   | 是          | 随机高质量真实照片，目前最主流        | 需要真实感的 UI mockup（PlaceIMG 最佳替代） |
| Placehold.co   | https://placehold.co/600x400      | 纯色 + 文字       | 尺寸、背景色、文字、格式（WebP/AVIF 等） | 否          | 支持现代图片格式最全，响应极快        | 经典纯色占位、快速布局测试    |
| DummyImage     | https://dummyimage.com/600x400    | 纯色 + 文字       | 尺寸、颜色、文字、格式            | 否          | 参数写法最直观，老牌服务              | 简单传统占位需求              |
| DiceBear       | https://api.dicebear.com/7.x/avataaars/svg | 头像 / 图标      | 风格、种子、颜色、配件等极高自定义 | 否          | 专门生成各种风格 SVG 头像             | 用户头像、图标占位首选        |

## JSON Mock

| 服务名称          | 访问方式 / 网址                              | 类型            | 自定义数据 | 支持 CRUD | 主要特色                                      | 典型使用场景                     |
|-------------------|----------------------------------------------|-----------------|------------|----------|-----------------------------------------|----------------------------------|
| JSONPlaceholder   | https://jsonplaceholder.typicode.com         | 公共 API      | 否         | 是        | 最经典、最可靠，posts / users / todos 等资源 | 快速原型、教学、文档示例         |
| DummyJSON         | https://dummyjson.com                        | 公共 API      | 否         | 是        | 数据种类丰富（产品、购物车、引用、认证等）      | 需要多样化 mock 数据的场景       |
| Beeceptor         | https://beeceptor.com                        | 云端服务        | 是         | 否        | 快速创建、支持规则匹配、请求检查               | 前后端分离、临时分享 mock        |
| Mocki.io          | https://mocki.io                             | 云端服务        | 是         | 否        | 轻量级、支持随机数据生成                      | 快速演示、轻量级 mock            |
| JSON Server       | npx json-server ./mock.json                  | 本地工具        | 是         | 是        | 一个 JSON 文件即可生成完整 REST API          | 中小型项目、本地开发首选         |
| Mockoon           | npx @mockoon/cli start --data ./mock.json    | 本地工具        | 是         | 是        | GUI 界面、规则匹配、动态响应、代理支持         | 复杂场景、团队协作 mock          |

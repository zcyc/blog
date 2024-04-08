---
title: "Spring Cloud"
author: "Charles"
description: ""
tags:
  - java
ogImage: ""
slug: "spring-cloud"
pubDatetime: 2022-07-03T14:42:39.000+08:00
modDatetime: 2022-07-05T11:50:28.000+08:00
featured: false
draft: false
---

# Consul

Prometheus 官方支持 Consul 的支持，只需要按照官方的配置文件就可以。
如果你配了半天还是跑不起来，那太正常了，这里有几个参数息息相关。
详细配置请看我的另一篇文章 Consul + Grafana + Prometheus 从配置到启动。
详细配置和启动方式：[https://www.yuque.com/charlesjohn/blog/ovdf9w](<博客/Java/Consul 从配置到启动>)

# Zookeeper

官方支持 Prometheus 监控。如果只要注册中心，Consul 和 Nacos 都比 Zookeeper 好用。
如果走大数据方向，Zookeeper 是必需品。

# Spring Security

之前只用过 Shiro，对于 Spring Security 的配置文件只有改的经验，没有从头设计过。这个后期可以看一下。
如果依赖了 spring-boot-starter-security 的项目，没有正确的配置文件，你会莫名其妙的进入一个登陆页面。包括从父类继承下来的依赖，没有配置文件访问任何端口都是一个登陆页面。

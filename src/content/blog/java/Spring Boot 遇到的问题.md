---
title: "Spring Boot 遇到的问题"
author: "Charles"
description: ""
tags:
  - java
ogImage: ""
slug: "spring-boot"
pubDatetime: 2020-12-05T14:29:53.000Z
modDatetime: 2022-07-28T03:31:40.000Z
featured: false
draft: false
---

# 忘记 @Mapper 注解

```java
 @Autowired
 private IImageService imageService;
// 如果此处 imageService 提示无法自动装配，可能是因为 IImageService 没有 @Mapper 注解
// 且 @Mapper 来自 org.apache.ibatis.annotations.Mapper
```

# 获取指定日期的指定时间

```java
//获取今天的0点0分0秒0微秒
LocalDateTime base = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
//获取上边时间的30天之前的时间
LocalDateTime start = base.minusDays(30);
//获取最上边时间的1天之后的时间
LocalDateTime end = base.plusDays(1);
```

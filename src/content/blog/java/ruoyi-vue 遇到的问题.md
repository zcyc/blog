---
title: "ruoyi-vue 遇到的问题"
author: "Charles"
description: ""
tags:
  - java
ogImage: ""
slug: "ruoyi-vue"
pubDatetime: 2021-05-12T01:28:38.000Z
modDatetime: 2022-06-27T18:43:18.000Z
featured: false
draft: false
---

# ruoyi-vue

## 无法登陆

高版本 JAVA 点击登陆按钮提示：Handler dispatch failed; nested exception is java.lang.NoClassDefFoundError;

```xml
<!-- 以下为 javax DatatypeConverter 的依赖， jdk11 移除了 j2ee 相关的模块-->
<!-- https://mvnrepository.com/artifact/com.sun.xml.bind/jaxb-impl -->
<dependency>
    <groupId>com.sun.xml.bind</groupId>
    <artifactId>jaxb-impl</artifactId>
    <version>3.0.1</version>
</dependency>
```

# ruoyi-vue-plus

## 编译失败

```bash
#遇到 xxxx/target/xxxx/xxxx.class 找不到的问题，直接在项目根目录执行如下命令
#在 IDEA 的 Maven 插件里边清理不行，在其他项目也没遇到过，和 pom 文件的结构有关

mvn clean package -DskipTests=true
```

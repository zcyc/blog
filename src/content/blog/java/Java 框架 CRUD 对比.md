---
title: "Java 框架 CRUD 对比"
author: "Charles"
description: ""
tags:
  - java
slug: "java-framework-crud"
pubDatetime: 2024-08-08T11:32:00.000+08:00
modDatetime: 2024-08-08T11:32:00.000+08:00
featured: false
draft: true
---

# Spring Boot
可以用 [Spring Data REST](https://github.com/spring-projects/spring-data-rest) 生成 REST 接口。IDEA 创建项目时添加依赖 Rest Repositories、Spring Data JPA。
### 实现 Entity
```java
package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users") // 这个注解指定表名，PostgreSQL 不能用 user 做表名
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private Integer age;
    private String email;
    // getter and setter
}

```
### 实现 Repository
```java
package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "users") // 这个注解生成 REST 接口
public interface UserRepository extends JpaRepository<User, Integer> {
}
```
### 测试接口
http://localhost:8080/users

# Quarkus
## 生成 Controller
[Quarkus CLI](https://quarkus.io/guides/cli-tooling)

## 生成 Service
[RESTEasy](https://github.com/resteasy/resteasy)

# Micronaut
## 生成 Controller
[Micronaut CLI](https://micronaut-projects.github.io/micronaut-starter/latest/guide/index.html#installHomebrew)

## 生成 Service
[Micronaut Data](https://micronaut-projects.github.io/micronaut-data/4.8.1/guide/)
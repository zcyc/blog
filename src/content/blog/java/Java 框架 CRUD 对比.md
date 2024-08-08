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
@Table(name = "users") // 这个是指定表名，PostgreSQL 不能用 user 做表名
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

@RepositoryRestResource(path = "users") // 这个是配置生成 REST 接口，不写不生成
public interface UserRepository extends JpaRepository<User, Integer> {
}
```
### 测试接口
http://localhost:8080/users

# Quarkus
可以用 [Panache](https://cn.quarkus.io/guides/rest-data-panache) 生成 REST 接口。IDEA 创建项目时添加依赖 REST Jackson、REST resources for Hibernate Reactive with Panache、Reactive PostgreSQL client。
### 实现 Entity
```java
package com.example.entity;

import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.*;

@Entity
@Table(name = "users") // 这个是指定表名，PostgreSQL 不能用 user 做表名
public class User extends PanacheEntityBase { // 这个和上边的区别是继承了 PanacheEntityBase
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private Integer age;
    private String email;
    // getter and setter
}
```
### 实现 Resource
```java
package com.example.resource;

import com.example.entity.User;
import io.quarkus.hibernate.reactive.rest.data.panache.PanacheEntityResource;

@ResourceProperties(path = "users") // 这个是配置生成 REST 接口，不写使用默认配置生成
public interface UserResource extends PanacheEntityResource<User, Integer> {
}
```
### 测试接口
http://localhost:8080/users

# Micronaut
## 生成 Controller
[Micronaut CLI](https://micronaut-projects.github.io/micronaut-starter/latest/guide/index.html#installHomebrew)

## 生成 Service
[Micronaut Data](https://micronaut-projects.github.io/micronaut-data/4.8.1/guide/)
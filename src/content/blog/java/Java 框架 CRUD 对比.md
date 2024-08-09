---
title: "Java 框架 CRUD 对比"
author: "Charles"
description: ""
tags:
  - java
slug: "java-framework-crud"
pubDatetime: 2024-08-08T11:32:00.000+08:00
modDatetime: 2024-08-09T11:34:00.000+08:00
featured: false
draft: false
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
可以用 [Panache](https://cn.quarkus.io/guides/rest-data-panache) 生成 REST 接口。IDEA 创建项目时添加依赖 REST Jackson、REST resources for Hibernate ORM with Panache、JDBC Driver - PostgreSQL。
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
Micronaut 不能生成 REST 接口。IDEA 创建项目时添加依赖 Micronaut Data JPA、PostgreSQL。
### 实现 Entity
```java
@Serdeable // 这个和上边的区别是声明了序列化
@Entity
@Table(name = "users")
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
package com.example.repository;

import com.example.entity.User;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
```
### 实现 Controller
```java
package com.example.controller;

import com.example.entity.User;
import com.example.repository.UserRepository;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Produces;
import jakarta.inject.Inject;

import java.util.List;

@Controller("/users")
public class UserController {
    @Inject
    UserRepository userRepository;

    @Get
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Get("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public User getUser(Integer id) {
        return userRepository.findById(id).orElse(null);
    }
}
```
### 测试接口
http://localhost:8080/users


# Helidon
待补充。
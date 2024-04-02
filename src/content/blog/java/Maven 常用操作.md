---
title: "Maven 常用操作"
author: "Charles"
description: ""
tags:
  - java
ogImage: ""
slug: "maven"
pubDatetime: 2021-11-14T13:10:46.000Z
modDatetime: 2022-06-27T18:34:50.000Z
featured: false
draft: false
---

mvn 可以使用 mvnd 代替，速度更快

```bash
# 先把命令行切换到Maven项目的根目录，例如：/data/springcloud/eureka，然后执行命令：mvn clean package
cd /data/springcloud/eureka
mvn clean package
```

# 执行命令成功后，war包保存在项目的target目录下。

```bash
# 查看版本
mvn -v

# 创建 Maven 项目
mvn archetype:create

# 编译源代码
mvn compile

# 编译测试代码
mvn test-compile

# 运行应用程序中的单元测试
mvn test

# 生成项目相关信息的网站
mvn site

# 依据项目生成 jar 文件
mvn package

# 在本地 Repository 中安装 jar
mvn install

# 忽略测试文档编译
mvn -Dmaven.test.skip=true

# 清除目标目录中的生成结果
mvn clean

# 将.java类编译为.class文件
mvn clean compile

# 进行打包
mvn clean package

# 执行单元测试
mvn clean test

# 部署到版本仓库
mvn clean deploy

# 使其他项目使用这个jar,会安装到maven本地仓库中
mvn clean install

# 创建项目架构
mvn archetype:generate

# 查看已解析依赖
mvn dependency:list

# 看到依赖树
mvn dependency:tree

# 查看依赖的工具
mvn dependency:analyze

# 从中央仓库下载文件至本地仓库
mvn help:system

# 查看当前激活的profiles
mvn help:active-profiles

# 查看所有profiles
mvn help:all-profiles

# 查看完整的pom信息
mvn help:effective -pom
```

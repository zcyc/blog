---
title: "Docker 运行 MySQL 和抹平系统差异"
author: "Charles"
description: ""
tags:
  - docker
ogImage: ""
slug: "docker-mysql"
pubDatetime: 2020-09-14T13:28:08.000Z
modDatetime: 2021-09-29T04:32:36.000Z
featured: false
draft: false
---

# 前言

mysql 部署在 docker 中不会污染本地环境，所以建议大家使用 docker 部署 mysql。
其他开发环境也建议这样做，例如 redis，mongodb，mariadb，rabbitmq，mssql。

# mysql 在不同系统下的差异

mysq|表名是否区分大小写是通过lower_case_table_names参数来设置，登录mysq|后可通过show Variables like
'%table\_ names' 来查看默认的值。
不同系统，该参数的默认值是不同的。
lower_case_table_names=0 linux环境默认表名存储为给定的大小写，比较的时候区分大小写
lower_case_table_names=1 windows环境默认表名存储在磁盘是小写的，比较的时候不区分大小写
lower_case_table_names=2 macos环境默认表名存储为给定的大小写，比较的时候按小写的比较

# 如何抹平不同系统间 mysql 的差异

```bash
# 0：linux环境默认
# 1：windows环境默认
# 2：macos环境默认

# 由于有些客户使用windows环境，为了兼容已有的数据库，必须切换成不区分大小写。
# 但是 mysql8 必须在初始化数据库之前更改配置文件中的大小写不敏感，重新初始化会丢失所有数据。

# 由于有些开发使用 mac，和 linux 默认规则也不一样，所以强烈建议不要修改，新系统部署一律使用 linux 风格

# name 为 mysql_no_lower_case 和 mysql5_no_lower_case 的容器为不区分大小写

# 手动修改方式如下：

# 修改mysql5容器 进入docker的MySQL容器，编辑/etc/mysql/mysql.conf.d/mysqld.cnf文件，在[mysqld]下添加如下：
[mysqld]
lower_case_table_names=1

# 修改mysql8容器 进入docker的MySQL容器，编辑/etc/mysql/my.cnf文件，在[mysqld]下添加如下：
[mysqld]
lower_case_table_names=1

# 修改完成后记得重启数据库，docker 直接重启容器即可。

# 注意：mysql8 一但初始化就不能修改这个配置了，所以要在启动前修改好。
# 如果使用 docker 初始化就要在启动命令中添加 --lower_case_table_names=1
```

# docker 启动 mysql

```bash
--name mysql 是容器的名字，可以随便取
-e MYSQL_ROOT_PASSWORD=toor 是自定义配置
-p 3307:3306 前边的是本地端口，后边的为容器内端口，mysql容器基于debian，多创建一份，用来修改成windows的大小写不敏感
-d mysql:latest 前边是容器名字，后边是容器版本，可以到docker hub查看容器的tag
--lower_case_table_names=1 这里1就是比较的时候不区分大小写，但是储存为小写，这个可以适配绝大多数windows转到其他系统报错的问题。

docker run \
--name mysql \
-e MYSQL_ROOT_PASSWORD=toor \
-p 3306:3306 \
-d mysql:latest \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_unicode_ci

docker run \
--name mysql_no_lower_case \
-e MYSQL_ROOT_PASSWORD=toor \
-p 3308:3306 \
-d mysql:latest \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_unicode_ci \
--lower_case_table_names=1

docker run \
--name mysql5 \
-e MYSQL_ROOT_PASSWORD=toor \
-p 3307:3306 \
-d mysql:5.7.31 \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_unicode_ci

docker run \
--name mysql5_no_lower_case \
-e MYSQL_ROOT_PASSWORD=toor \
-p 3309:3306 \
-d mysql:5.7.31 \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_unicode_ci \
--lower-case-table-names=1
```

# 为 docker 容器设置开机自启动

原理就是，当docker启动后自动启动容器。前提是你的docker已经设置为开机自启动了。

```bash
docker ps # 查看一下要开机自启动的容器id
docker update --restart=always b0108b24f008 # b0108b24f008就是要自启动的容器id
```

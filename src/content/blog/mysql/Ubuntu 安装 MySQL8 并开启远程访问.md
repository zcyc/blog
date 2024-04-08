---
title: "Ubuntu 安装 MySQL8 并开启远程访问"
author: "Charles"
description: ""
tags:
  - mysql
slug: "ubuntu-mysql"
pubDatetime: 2021-05-10T10:33:53.000+08:00
modDatetime: 2022-06-28T18:24:00.000+08:00
featured: false
draft: false
---

# 安装 MySQL

```bash
# 到 https://dev.mysql.com/downloads/repo/apt/ 找到最新的 mysql apt 源配置文件下载地址，例如此处 wget 后边的地址
wget http://dev.mysql.com/get/mysql-apt-config_0.8.16-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.16-1_all.deb
sudo apt install mysql-server
```

# 配置 MySQL

```bash
# 登录 mysql
mysql -uroot -p
```

```bash
# 切换数据库
use mysql;

# 更改 root 的登录域
update user set host='%' where user='root';

# 给 root 设置密码
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'toor';

# mysql8 之前修改 root 的权限 ，第一个星号是数据库名，第二个是表名
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'WITH GRANT OPTION;

# mysql8 之后修改 root 的权限 ，第一个星号是数据库名，第二个是表名
grant all privileges on *.* to 'test'@'%';

# 刷新权限
FLUSH PRIVILEGES;
```

# 关掉 ubuntu 防火墙

```bash
sudo ufw disable
```

# 修改 mysqld 配置

```bash
vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

```
# bind-address            = 127.0.0.1
bind-address            = 0.0.0.0
```

# 重启 MySQL

```bash
sudo service mysql restart
```

# 其他

## 其他常用 SQL

[https://www.yuque.com/charlesjohn/blog/anbwh6](<博客/MySQL/MySQL 常用操作>)

## Docker 中使用 MySQL

<https://www.yuque.com/go/doc/13177685>

# 其他和主题无关的话

Windows 开发环境推荐使用 Linux 子系统，或者 phpstudy 和 laragon
phpstudy 可以很简单的设置各种常用环境，比如 一键修改 mysql8 的数据库账号密码，redis 账号密码等等
laragon 内置了右键打开控制台和编辑器和更多的开发环境和开发工具，但是对 mysql8 的支持不是很好

如果您使用win10，推荐使用 phpstudy，因为作为一个开发环境工具，初始化环境方便是最重要的。
至于右键打开控制台和编辑器有更好的解决方案，微软应用商店一键安装 terminal，更稳定强大美观。
目前装载了插件的 Terminal 已经可以达到 Mac 下 iterm2 + zsh 的易用程度。
详细的配置方式百度搜索 Windows Terminal 配置

如果您使用 win7 推荐使用 laragon，立刻可以拥有一整套开发环境，也不用想美观不美观了，Terminal 无缘。

当然 git bash 也可以右键打开，但是推荐关掉安装 git 时候生成右键打开 git bash 和 git gui 的开关，又丑又慢又卡。

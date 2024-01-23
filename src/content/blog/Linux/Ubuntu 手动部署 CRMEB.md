---
title: "Ubuntu 手动部署 CRMEB"
author: "Charles"
description: ""
tags:
  - blog
ogImage: ""
slug: "ubuntu-crmeb"
pubDatetime: 2022-03-10T11:14:53.000Z
modDatetime: 2022-06-10T06:43:56.000Z
featured: false
draft: false
---

crmeb 是为数不多能跑起来而且有文档的开源项目，值得尊重和学习。

# 运行环境

- Ubuntu 20.04
- Ningx 1.18
- MySQL 8.0
- PHP 7.3

# 安装 Nginx

## 安装 Nginx

```bash
sudo apt install nginx
```

## 查看 Nginx 版本

```bash
nginx -v
```

## 配置 Nginx

### 新建配置文件

```bash
# 修改默认配置文件的端口号
sudo vim /etc/nginx/sites-enabled/default

# 将这两行的端口号改成其他端口号
listen 80 default_server;
listen [::]:80 default_server;

# 新建 crmeb 配置
sudo vim /etc/nginx/sites-enabled/crmeb
```

#### 写入如下内容

```bash
server {
    listen 80;
    server_name crmeb.test; # 这里是域名
    index index.php index.html index.htm;
    root /var/www/crmeb/public;

    access_log  /var/log/nginx/crmeb.log;
    error_log  /var/log/nginx/crmeb.error.log;

    location / {
        if (!-e $request_filename){
            rewrite  ^(.*)$  /index.php?s=$1  last;
            break;
        }
    }

    location ~ [^/]\.php(/|$) {
        try_files $uri =404;
        fastcgi_pass  unix:/run/php/php7.3-fpm.sock;
        fastcgi_index index.php;
        include fastcgi.conf;
        include crmeb-pathinfo.conf;
    }

    location ~ ^/(\.htaccess|\.git|\.project|LICENSE|README.md) {
        return 404;
    }

    location ~ \.well-known {
        allow all;
    }

    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
        expires      30d;
        error_log /dev/null;
        access_log /dev/null;
    }

    location ~ .*\.(js|css)?$ {
        expires      12h;
        error_log /dev/null;
        access_log /dev/null;
    }

}
```

### 配置 pathinfo

```bash
sudo vim /etc/nginx/crmeb-pathinfo.conf
```

#### 写入如下内容

```
set $real_script_name $fastcgi_script_name;
if ($fastcgi_script_name ~ "^(.+?\.php)(/.+)$") {
    set $real_script_name $1;
    set $path_info $2;
}
fastcgi_param SCRIPT_FILENAME $document_root$real_script_name;
fastcgi_param SCRIPT_NAME $real_script_name;
fastcgi_param PATH_INFO $path_info;
```

### 重载 nginx 配置

```
nginx -s reload
```

# 安装 MySQL

## 安装官方 apt 软件库

```
sudo wget http://dev.mysql.com/get/mysql-apt-config_0.8.16-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.16-1_all.deb
sudo apt install mysql-server
```

## 配置 MySQL

```
vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

### 在 mysqld 节点下添加 sql_mode

```
[mysqld]
sql_mode     = NO_ENGINE_SUBSTITUTION
```

### 重启 MySQL

```
sudo service mysql restart
```

## 创建数据库

### 连接数据库

```
mysql -uroot -p
```

### 创建 crmeb 数据库

```
CREATE DATABASE `crmeb` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
```

### 创建crmeb用户

```
CREATE USER 'crmeb'@'localhost' IDENTIFIED BY 'password';
GRANT ALL on crmeb.* TO 'crmeb'@'localhost';
```

### 更多数据库操作看 [https://www.yuque.com/charlesjohn/blog/ho063g](<博客/MySQL/Ubuntu 安装 MySQL8 并开启远程访问>)

# 安装 PHP

## 添加 apt 源

由于 apt 默认只有 7.4，但是 crmeb 最高支持 7.3，所以需要添加 7.3 的源

```bash
sudo add-apt-repository ppa:ondrej/php
sudo apt update
```

## 安装 php

```bash
# 安装可用版本
sudo apt install php7.3 php7.3-common php7.3-fpm php7.3-gd php7.3-mysql php7.3-bcmath php7.3-redis php7.3-curl  php7.3-mbstring php7.3-xml

# 卸载不支持版本
sudo apt remove php7.4 php7.4-common php7.4-opcache php7.4-readline php7.4-cli php7.4-igbinary php7.4-phpdbg php7.4-redis
sudo apt remove php8.1 php8.1-common php8.1-opcache php8.1-readline php8.1-cli php8.1-igbinary php8.1-phpdbg php8.1-redis
```

## 安装 swoole_loader 插件

### 查看 php 插件位置

```bash
php -i | grep extension_dir

# 结果应该类似 extension_dir => /usr/lib/php/20180731 => /usr/lib/php/20180731
```

### 下载插件

```bash
# 下载插件
sudo wget https://salongweb.com/wordpress/swoole-loader.zip
# 解压插件
sudo unzip swoole-loader.zip
# 安装插件，注意这里的路径，上边有查看 php 插件位置，不同版本 php 位置不同，swoole_loader 版本也不同，版本要对应。
sudo cp swoole-loader/swoole_loader73.so /usr/lib/php/20180731/swoole_loader73.so
```

### 启用插件

```
sudo vim /etc/php/7.3/fpm/php.ini
# 大约划到这个文件的 47% - 48% 的地方看到一大堆 extension，在后边添加
extension = swoole_loader73.so

sudo vim /etc/php/7.3/cli/php.ini
# 大约划到这个文件的 47% - 48% 的地方看到一大堆 extension，在后边添加
extension = swoole_loader73.so
```

### 重启 php7.3-fpm

```bash
sudo service php7.3-fpm restart
```

### 查看是否成功

```bash
php -m | grep swoole_loader
```

# 安装redis

```bash
sudo apt install redis-server
```

# 部署 CRMEB

## 下载源码

下载源码到网站根目录/var/www

```
# 进入 www 目录
cd /var/www/

# 下载代码
sudo git clone https://gitee.com/ZhongBangKeJi/CRMEB-Min.git

# 把代码放到nginx配置的路径，注意最后这个点，不能删掉
sudo mv CRMEB-Min/src/crmeb .

# 删除没用的代码
sudo rm -rf CRMEB-Min/

# 给予主目录权限
sudo chmod 777 crmeb/
sudo chmod 777 crmeb/public/
sudo chmod 777 crmeb/public/install/
```

## 初始化安装

打开浏览器，访问服务器ip，因为nginx 配的80端口，所以不需要写端口号，按照提示输入数据库，勾选创建演示数据，输入管理员账号密码，即可完成安装。

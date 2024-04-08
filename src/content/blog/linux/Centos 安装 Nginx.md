---
title: "Centos 安装 Nginx"
author: "Charles"
description: ""
tags:
  - linux
slug: "centos-nginx"
pubDatetime: 2022-04-18T02:18:09.000+08:00
modDatetime: 2022-05-20T02:46:44.000+08:00
featured: false
draft: false
---

# 安装

## 更新软件包

```bash
yum update -y
```

## 查看是否存在

```bash
yum list | grep nginx
```

## 不存在则添加红帽源

```bash
sudo yum install -y epel-release
```

## 更新软件包

```bash
yum update -y
```

## 安装 Nginx

```bash
yum install -y nginx
```

# 配置

## 修改 Nginx 配置

/etc/nginx/nginx.conf 中引入了 /etc/nginx/conf.d 中的所有代码，所以直接到 /etc/nginx/conf.d 创建新配置文件就可以，/etc/nginx/nginx.conf 中的配置作为 404 兜底。

## 创建自定义配置文件

在/etc/nginx/conf.d 创建自定义配置文件 my.conf

### http 配置

```
server {
    listen 80;
    server_name  domain;
    location / {
         root /usr/share/nginx/html;
         index  index.html index.htm;
     }
    error_page 497  https://$host$uri?$args;
}
```

### https 配置

```
server {
    listen 80;
    listen 443 ssl;
    server_name  domain;
    location / {
         root /usr/share/nginx/html;
         index  index.html index.htm;
     }

    ssl on;
    ssl_certificate /etc/nginx/ssl/domain.crt;
    ssl_certificate_key /etc/nginx/ssl/domain.key;
    ssl_session_timeout  5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4:!DH:!DHE;
    ssl_prefer_server_ciphers  on;

    error_page 497  https://$host$uri?$args;
}
```

## 放开相关端口

```bash
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --permanent --zone=public --add-service=https
sudo firewall-cmd --reload
```

# 控制

## 启动 Nginx

```bash
systemctl start nginx
```

## 停止 Nginx

```bash
systemctl stop nginx
```

## 重启 Nginx

```bash
systemctl restart nginx
```

## 查看运行状态

```bash
systemctl status nginx
```

## 开机自启动

```bash
systemctl enable nginx
```

## 开机不启动

```bash
systemctl disable nginx
```

# 证书

## 一键安装 ssl 生成器

```
# 安装生成器
curl  https://get.acme.sh | sh

# 创建命令别名
echo 'alias acme.sh=~/.acme.sh/acme.sh' >> ~/.bashrc
source ~/.bashrc
```

## 生成证书

```
# 配置阿里云环境变量
export Ali_Key="**********"
export Ali_Secret="**********"

# 生成证书
acme.sh --issue --dns dns_ali -d domain
```

## 拷贝证书到 Nginx

```
# 创建证书目录
mkdir -p /etc/nginx/ssl

# 拷贝证书
acme.sh --install-cert -d domain \
--key-file       /etc/nginx/ssl/domain.key  \
--fullchain-file /etc/nginx/ssl/domain.crt \
--reloadcmd     "service nginx force-reload"
```

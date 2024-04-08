---
title: "OpenWrt 下配置 DNSPod 动态解析(DDNS)"
author: "Charles"
description: ""
tags:
  - router
ogImage: ""
slug: "openwrt-dnspod-ddns"
pubDatetime: 2020-12-16T08:21:07.000+08:00
modDatetime: 2022-06-27T18:47:02.000+08:00
featured: false
draft: false
---

> 将此脚本添加在路由的任意地方，在 crontab 中启用添加一个任务就可以了。
> 网上使用 email 和 password 做验证的脚本在现在不能用了，推荐使用 token 做认证。

```shell
#!/bin/sh
IP=$(ifconfig pppoe-zpb | awk '/inet addr/{print substr($2,6)}')
URL='https://dnsapi.cn/Record.Modify'
LOGIN_TOKEN='id,token'

DOMAIN_ID='' # 域名ID
RECORD_ID='' # 记录ID
SUB_DOMAIN='gl' # 子域名

RECORD_TYPE='A' # A记录
RECORD_LINE='%e9%bb%98%e8%ae%a4' # 默认

DATA="login_token=${LOGIN_TOKEN}&format=json&\
domain_id=${DOMAIN_ID}&
record_id=${RECORD_ID}&\
sub_domain=${SUB_DOMAIN}&value=${IP}&\
record_type=${RECORD_TYPE}&
record_line=${RECORD_LINE}"

# 注意最后一行的 -k，其他教程上都有 -X，但没有 -k，运行一直报错，加上 -k 参数就搞定了。
curl -k -X POST ${URL} -d ${DATA}

```

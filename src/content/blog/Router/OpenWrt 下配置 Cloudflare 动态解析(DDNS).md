---
title: "OpenWrt 下配置 Cloudflare 动态解析(DDNS)"
author: "Charles"
description: ""
tags:
  - blog
ogImage: ""
slug: "openwrt-cloudflare-ddns"
pubDatetime: 2020-12-16T08:17:50.000Z
modDatetime: 2022-06-29T18:58:16.000Z
featured: false
draft: false
---

国内 DNS 又开始作妖了，故而转向国外的 DNS 解析商。
Cloudflare 是最好的选择。dns.he.net 也可以，但是对 [Freenom](https://www.freenom.com/zh/index.html?lang=zh) 不友好。
Cloudflare 提供了功能强大的 API，可以很方便的更新公网 IP 到 DNS 解析。
如果你用电脑同步，随便用什么语言写个脚本同步就可以。
如果是你用路由，就要使用 Shell 来实现，如下：

```shell
ipl=$(ifconfig pppoe-cy | awk '/inet addr/{print substr($2,6)}')
ip=$(curl -s http://ipv4.icanhazip.com)
curl -k -X PUT "https://api.cloudflare.com/client/v4/zones/zones 的 ID/dns_records/域名的 ID" \
  -H "X-Auth-Email:个人的 EMAIL" \
  -H "X-Auth-Key:个人的 API KEY" \
  -H "Content-Type: application/json" \
  --data '{"type":"A","name":"域名","content":"'${ipl}'","ttl":120,"proxied":false}'
```

参数 ipl（ip local）是通过本地命令获得的公网 ip 地址，参数 ip 则是通过外网来确定的公网ip。
公网 ip 的判断是基于自身网络的情况，如多拨后拥有多个公网 ip，做负载均衡的时候的 nat 配置，则需要通过参数 ipl 来制定通过哪一个公网 ip 访问。
[
](https://www.jianshu.com/p/d5e7fae239e2)

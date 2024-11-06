---
title: "查找 Jetbrains 激活服务器"
author: "Charles"
description: ""
tags:
  - env
slug: "jetbrains-license-server"
pubDatetime: 2024-11-06T11:09:00.000+08:00
featured: false
draft: false
---

# SHODAN
https://www.shodan.io/search?query=Location%3A+account.jetbrains.com%2Ffls-auth

# censys
https://search.censys.io/search?resource=hosts&sort=RELEVANCE&per_page=25&virtual_hosts=EXCLUDE&q=services.http.response.headers.location%3A+account.jetbrains.com%2Ffls-auth

# FOFA
https://fofa.info/result?qbase64=YWNjb3VudC5qZXRicmFpbnMuY29tL2Zscy1hdXRo
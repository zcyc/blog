---
title: "Maven 指定配置打包"
author: "Charles"
description: ""
tags:
  - java
ogImage: ""
slug: "maven-build"
pubDatetime: 2021-06-26T09:28:59.000+08:00
modDatetime: 2022-06-29T19:15:27.000+08:00
featured: false
draft: false
---

# 懒人打包

最简单的方式，利用配置文件覆盖。
在服务器 jar 包同目录放一个 application-dev.yml，里边的内容同 application-test.yml。
这样就可以用 dev 打的包加载 test 配置了。
jar 配置优先级决定了最后加载的是配置文件。
其实 prod 也行，但是不要这样搞。老老实实打 prod 包。

# maven 打包

```shell
mvn clean package -Dmaven.test.skip=true -Pprod    #就是prod
mvn clean package -Dmaven.test.skip=true           #就是dev
```

# 脚本打包

```shell
#!/usr/bin/env bash
mvn clean package -Dmaven.test.skip=true
rsync -aP target/test-server-0.0.1-SNAPSHOT.jar root@10.32.1.100:~

#相应的打包 prod 就要改成
mvn clean package -Dmaven.test.skip=true -Pprod
rsync -aP target/test-server-0.0.1-SNAPSHOT.jar root@10.32.1.100:~

# target/test-server-0.0.1-SNAPSHOT.jar 为你要上传的 jar 包路径
```

# docker 打包

网上的 java 打包镜像一大把。
就是在 entrypoint 指定 --spring.profiles.active=prod

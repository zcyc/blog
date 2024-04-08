---
title: "Spring Cloud Alibaba"
author: "Charles"
description: ""
tags:
  - java
ogImage: ""
slug: "spring-cloud-alibaba"
pubDatetime: 2021-11-08T10:06:55.000+08:00
modDatetime: 2022-07-05T15:59:12.000+08:00
featured: false
draft: false
---

Spring 官方的初始化器已经初始化不了 Spring Cloud Alibaba 了，Alibaba 官方的初始化器也很久不更新了。
抛开 Alibaba 看 Spring Cloud 官方推荐的套件，其中维护最好的注册中心就是 Consul。
Java 大数据那一套东西还依赖 Zookeeper，云原生时代它只支持 Java 就很离谱，更别说它对其他组件还有版本要求。

# Nacos

## 通过 Docker 启动

根据[官方文档](https://nacos.io/zh-cn/docs/quick-start-docker.html)操作，官方的 compose 文件没有把配置文件和数据映射出来，这样不方便修改配置，并且有数据丢失风险，修改后的文件如下，增加了对配置文件和数据的映射，详见 volumes 节点。

```yaml
version: "3"
services:
  nacos:
    image: nacos/nacos-server:latest
    container_name: nacos-standalone
    environment:
      - PREFER_HOST_MODE=hostname
      - MODE=standalone
    volumes:
      - ./standalone-logs/:/home/nacos/logs
      - ../build/conf/application.properties:/home/nacos/conf/application.properties
      - ./data/standalone-derby:/home/nacos/data
    ports:
      - "8848:8848"
      - "9848:9848"
```

## 暴露监控数据

根据[官方文档](https://nacos.io/zh-cn/docs/monitor-guide.html)操作有点坑，如果你按照上边的方法映射了配置文件，只需要修改项目中 /build/conf/application.properties，在结尾增加一句：

```yaml
management.endpoints.web.exposure.include=*
```

## Grafana 面板报错

Templating Failed to upgrade legacy queries Datasource Prometheus not found 错误
数据源名称错了，nacos 给的模版中数据源是 prometheus，而 grafana 添加数据源默认是 Prometheus。大小写的区别，改成 prometheus 就好了。

## 502 bad gateway

关掉 clashX

## Prometheus 配置

```bash
# my global config
global:
  scrape_interval:     15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
# - "first_rules.yml"
# - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'nacos'
    metrics_path: '/nacos/actuator/prometheus'
    static_configs:
      - targets: ['nacos:8848']
```

# sentinel

## 通过 Docker 启动 Dashboard

### 构建镜像

将以下内容写入 Dockerfile，到 GitHub 下载最新的 sentinel-dashboard-x.jar，然后将文件重命名为 sentinel.jar，放在 Dockerfile 同一目录。

```yaml
FROM openjdk:8
WORKDIR /usr/local/docker/sentinel
ADD ./sentinel.jar sentinel.jar
EXPOSE 8088
ENTRYPOINT ["java", "-jar", "sentinel.jar", "--server.port=8088"]
```

在目录下执行

```bash
docker build -t sentinel:lastest .
```

### 启动容器

将以下内容写入docker-compose.yml

```yaml
version: "3"
services:
  sentinel:
    image: sentinel:lastest
    ports:
      - 8088:8088
```

在目录下执行

```bash
docker-compose up -d
```

## Spring Cloud 接入

# Dubbo3

# Seata

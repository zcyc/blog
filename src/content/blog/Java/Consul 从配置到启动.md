---
title: "Consul 从配置到启动"
author: "Charles"
description: ""
tags:
  - blog
ogImage: ""
slug: "consul"
pubDatetime: 2021-11-11T15:57:23.000Z
modDatetime: 2022-07-28T02:28:16.000Z
featured: false
draft: false
---

Docker 容器间通信不能用 localhost，网络详细用法看 [https://www.yuque.com/charlesjohn/blog/tm8p80](<博客/K8S & Docker/Docker 常用操作>)

# 启动 Consul

将以下内容写入 docker-compose.yml

```yaml
version: "3"
services:
  node-exporter:
    image: prom/node-exporter:latest
    ports:
      - "9100:9100"
    volumes:
      - /:/host
    restart: always
    command: "--web.listen-address=:9100 --path.rootfs=/host --path.procfs=/host/proc --path.sysfs=/host/sys"
    networks:
      - prom

  dingtalk:
    image: timonwong/prometheus-webhook-dingtalk:latest
    volumes:
      - "./alertmanager/config.yml:/etc/prometheus-webhook-dingtalk/config.yml"
    ports:
      - "8060:8060"
    networks:
      - prom
  alertmanager:
    depends_on:
      - dingtalk
    image: prom/alertmanager:latest
    volumes:
      - "./alertmanager/alertmanager.yml:/etc/alertmanager/alertmanager.yml"

    ports:
      - "9093:9093"
      - "9094:9094"
    networks:
      - prom
  prometheus:
    depends_on:
      - alertmanager
      - consul
    image: prom/prometheus:latest
    volumes:
      - "./prometheus/:/etc/prometheus/"
    ports:
      - "9090:9090"
    networks:
      - prom
  grafana:
    depends_on:
      - prometheus
    image: grafana/grafana:latest
    volumes:
      - "./grafana/:/var/lib/grafana"
    ports:
      - "3000:3000"
    networks:
      - prom
  consul:
    image: consul
    ports:
      - "8500:8500"
    networks:
      - prom
networks:
  prom:
    driver: bridge
```

# 应用接入

添加依赖

```xml
<dependency>
            <groupId>io.micrometer</groupId>
            <artifactId>micrometer-registry-prometheus</artifactId>
            <scope>runtime</scope>
        </dependency>
```

修改配置

```yaml
// 在需要监控的 Spring Boot 配置文件中加入如下配置，base-path 不能修改，不然 Consul 将无法检查健康状况
management:
  metrics:
    tags:
      application: ${spring.application.name}
    export:
      prometheus:
        enabled: true
  endpoints:
    web:
      exposure:
        include: prometheus
      base-path: /actuator/health

// 修改健康检查地址就能修改 base-path 了，修改方式如下，第 23 行
spring:
  application:
    name: 你的服务名
  cloud:
    consul:
      discovery:
        health-check-interval: 10s
        health-check-path: ${management.server.servlet.context-path}/actuator/health
        instance-id: ${spring.application.name}
        prefer-ip-address: true
        register: true
      enabled: true
```

# 配置监控

将以下内容写入 prometheus/prometheus.yml

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager:9093

rule_files:
  - "*rules.yml"

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["prometheus:9090"]

  - job_name: "consul"
    metrics_path: "/actuator/health/prometheus"
    consul_sd_configs:
      - server: "consul:8500"
        services: []

  - job_name: "node"
    static_configs:
      - targets: ["node-exporter:9100"]

  - job_name: "alertmanager"
    static_configs:
      - targets: ["alertmanager:9093"]
```

# 配置报警

将以下内容写入 alertmanager/alertmanager.yml

```yaml
global:
  resolve_timeout: 5m
  smtp_smarthost: "smtp.163.com:465" #邮箱smtp服务器代理，启用SSL发信, 端口一般是465
  smtp_from: "alert@163.com" #发送邮箱名称
  smtp_auth_username: "alert@163.com" #邮箱名称
  smtp_auth_password: "password" #邮箱密码或授权码
  smtp_require_tls: false

route:
  receiver: "default"
  group_wait: 10s
  group_interval: 1m
  repeat_interval: 1h
  group_by: ["alertname"]

inhibit_rules:
  - source_match:
      severity: "critical"
    target_match:
      severity: "warning"
    equal: ["alertname", "instance"]

receivers:
  - name: "default"
    email_configs:
      - to: "receiver@163.com"
        send_resolved: true
    webhook_configs:
      - url: "http://dingtalk:8060/dingtalk/webhook/send"
        send_resolved: true
```

将以下内容写入 alertmanager/config.yml

```yaml
targets:
  webhook:
    url: https://oapi.dingtalk.com/robot/send?access_token=xxx
    mention:
      all: true
```

将以下内容写入 prometheus/alert-rules.yml

```yaml
groups:
  - name: node-alert
    rules:
      - alert: NodeDown
        expr: up{job="node"} == 0
        for: 5m
        labels:
          severity: critical
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} down"
          description: "Instance: {{ $labels.instance }} 已经宕机 5分钟"
          value: "{{ $value }}"

      - alert: NodeCpuHigh
        expr: (1 - avg by (instance) (irate(node_cpu_seconds_total{job="node",mode="idle"}[5m]))) * 100 > 80
        for: 5m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} cpu使用率过高"
          description: "CPU 使用率超过 80%"
          value: "{{ $value }}"

      - alert: NodeCpuIowaitHigh
        expr: avg by (instance) (irate(node_cpu_seconds_total{job="node",mode="iowait"}[5m])) * 100 > 50
        for: 5m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} cpu iowait 使用率过高"
          description: "CPU iowait 使用率超过 50%"
          value: "{{ $value }}"

      - alert: NodeLoad5High
        expr: node_load5 > (count by (instance) (node_cpu_seconds_total{job="node",mode='system'})) * 1.2
        for: 5m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} load(5m) 过高"
          description: "Load(5m) 过高，超出cpu核数 1.2倍"
          value: "{{ $value }}"

      - alert: NodeMemoryHigh
        expr: (1 - node_memory_MemAvailable_bytes{job="node"} / node_memory_MemTotal_bytes{job="node"}) * 100 > 90
        for: 5m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} memory 使用率过高"
          description: "Memory 使用率超过 90%"
          value: "{{ $value }}"

      - alert: NodeDiskRootHigh
        expr: (1 - node_filesystem_avail_bytes{job="node",fstype=~"ext.*|xfs",mountpoint ="/"} / node_filesystem_size_bytes{job="node",fstype=~"ext.*|xfs",mountpoint ="/"}) * 100 > 90
        for: 10m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} disk(/ 分区) 使用率过高"
          description: "Disk(/ 分区) 使用率超过 90%"
          value: "{{ $value }}"

      - alert: NodeDiskBootHigh
        expr: (1 - node_filesystem_avail_bytes{job="node",fstype=~"ext.*|xfs",mountpoint ="/boot"} / node_filesystem_size_bytes{job="node",fstype=~"ext.*|xfs",mountpoint ="/boot"}) * 100 > 80
        for: 10m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} disk(/boot 分区) 使用率过高"
          description: "Disk(/boot 分区) 使用率超过 80%"
          value: "{{ $value }}"

      - alert: NodeDiskReadHigh
        expr: irate(node_disk_read_bytes_total{job="node"}[5m]) > 20 * (1024 ^ 2)
        for: 5m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} disk 读取字节数 速率过高"
          description: "Disk 读取字节数 速率超过 20 MB/s"
          value: "{{ $value }}"

      - alert: NodeDiskWriteHigh
        expr: irate(node_disk_written_bytes_total{job="node"}[5m]) > 20 * (1024 ^ 2)
        for: 5m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} disk 写入字节数 速率过高"
          description: "Disk 写入字节数 速率超过 20 MB/s"
          value: "{{ $value }}"

      - alert: NodeDiskReadRateCountHigh
        expr: irate(node_disk_reads_completed_total{job="node"}[5m]) > 3000
        for: 5m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} disk iops 每秒读取速率过高"
          description: "Disk iops 每秒读取速率超过 3000 iops"
          value: "{{ $value }}"

      - alert: NodeDiskWriteRateCountHigh
        expr: irate(node_disk_writes_completed_total{job="node"}[5m]) > 3000
        for: 5m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} disk iops 每秒写入速率过高"
          description: "Disk iops 每秒写入速率超过 3000 iops"
          value: "{{ $value }}"

      - alert: NodeInodeRootUsedPercentHigh
        expr: (1 - node_filesystem_files_free{job="node",fstype=~"ext4|xfs",mountpoint="/"} / node_filesystem_files{job="node",fstype=~"ext4|xfs",mountpoint="/"}) * 100 > 80
        for: 10m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} disk(/ 分区) inode 使用率过高"
          description: "Disk (/ 分区) inode 使用率超过 80%"
          value: "{{ $value }}"

      - alert: NodeInodeBootUsedPercentHigh
        expr: (1 - node_filesystem_files_free{job="node",fstype=~"ext4|xfs",mountpoint="/boot"} / node_filesystem_files{job="node",fstype=~"ext4|xfs",mountpoint="/boot"}) * 100 > 80
        for: 10m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} disk(/boot 分区) inode 使用率过高"
          description: "Disk (/boot 分区) inode 使用率超过 80%"
          value: "{{ $value }}"

      - alert: NodeFilefdAllocatedPercentHigh
        expr: node_filefd_allocated{job="node"} / node_filefd_maximum{job="node"} * 100 > 80
        for: 10m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} filefd 打开百分比过高"
          description: "Filefd 打开百分比 超过 80%"
          value: "{{ $value }}"

      - alert: NodeNetworkNetinBitRateHigh
        expr: avg by (instance) (irate(node_network_receive_bytes_total{device=~"eth0|eth1|ens33|ens37"}[1m]) * 8) > 20 * (1024 ^ 2) * 8
        for: 3m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} network 接收比特数 速率过高"
          description: "Network 接收比特数 速率超过 20MB/s"
          value: "{{ $value }}"

      - alert: NodeNetworkNetoutBitRateHigh
        expr: avg by (instance) (irate(node_network_transmit_bytes_total{device=~"eth0|eth1|ens33|ens37"}[1m]) * 8) > 20 * (1024 ^ 2) * 8
        for: 3m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} network 发送比特数 速率过高"
          description: "Network 发送比特数 速率超过 20MB/s"
          value: "{{ $value }}"

      - alert: NodeNetworkNetinPacketErrorRateHigh
        expr: avg by (instance) (irate(node_network_receive_errs_total{device=~"eth0|eth1|ens33|ens37"}[1m])) > 15
        for: 3m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} 接收错误包 速率过高"
          description: "Network 接收错误包 速率超过 15个/秒"
          value: "{{ $value }}"

      - alert: NodeNetworkNetoutPacketErrorRateHigh
        expr: avg by (instance) (irate(node_network_transmit_packets_total{device=~"eth0|eth1|ens33|ens37"}[1m])) > 15
        for: 3m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} 发送错误包 速率过高"
          description: "Network 发送错误包 速率超过 15个/秒"
          value: "{{ $value }}"

      - alert: NodeProcessBlockedHigh
        expr: node_procs_blocked{job="node"} > 10
        for: 10m
        labels:
          severity: warning
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} 当前被阻塞的任务的数量过多"
          description: "Process 当前被阻塞的任务的数量超过 10个"
          value: "{{ $value }}"

      - alert: NodeTimeOffsetHigh
        expr: abs(node_timex_offset_seconds{job="node"}) > 3 * 60
        for: 2m
        labels:
          severity: info
          instance: "{{ $labels.instance }}"
        annotations:
          summary: "instance: {{ $labels.instance }} 时间偏差过大"
          description: "Time 节点的时间偏差超过 3m"
          value: "{{ $value }}"
```

# 整套跑起来

```yaml
最后走起
docker-compose up -d

这时候如果报错了，就是权限问题
将 docker-compose.yml 第 50 行
- "/var/lib/grafana:/var/lib/grafana"
改成
- "./grafana/:/var/lib/grafana"
我这里已经提前修改了，防止你们报错，还得去删除容器重新起。

解决 Target 中出现 415 Unsupport Media Type 和 Prometheus is not enabled since its retention time is not positive 参考：
https://blog.csdn.net/u013360850/article/details/106158994

更多 consul 配置 https://www.cnblogs.com/qidakang/p/7837519.html
```

# 常见配置

## 配置 consul 目标

```
修改 prometheus/prometheus.yml 第 24 行
services: []
services 数组中存放的就是你要监控的服务，只能填注册到 Consul 的服务名。
比如：
services: ['user', 'security', 'gateway']
```

## 配置 context-path

```
如果你的 application.yml 配置了 servlet.context-path，比如下边这样

server.port=8090
server.servlet.context-path=/monitoring
management.endpoints.web.exposure.include=*

那么你得修改 prometheus/prometheus.yml 第 21 行
metrics_path: "/actuator/health/prometheus"
在 /actuator/health/prometheus 前边加上你配置的 context-path，修改完以后变成了
metrics_path: "/monitoring/actuator/health/prometheus"
```

## 配置 base-path

```yaml
// 想要修改 base-path，你得同步修改 prometheus/prometheus.yml 第 21 行的 metrics_path，和 application.yml 中的 health-check-path

// 比如你 base-path 改成了
base-path: /health
// 那么你 health-check-path 就得改成
health-check-path: ${management.server.servlet.context-path}/health
// 那么你 metrics_path 就改成
metrics_path: "/health/prometheus" 这里就是 "/你的base-path/prometheus"

//其实你不用修改这么多配置，这只是麻烦的办法，作为一个高明的框架，可以在不侵入代码配置的请框架进行修改。参考如下文章的 relabel_configs，他可以操作你的 metrics_path，还可以对服务进行忽略，修改等等操作。但是你不要直接用他的配置文件，他那个只是演示，你要改的适应自己的业务和监控需求。
https://blog.csdn.net/aixiaoyang168/article/details/103022342
https://blog.csdn.net/poorCoder_/article/details/79120218

比如下边这篇文章，他说必须用 relabel_configs 修改 metrics_path，否则就会 404 其实是不准确的，是他的配置文件没配完，但是他的处理方式是比较聪明的，我是在配好文件以后才发现可以直接 relabel_configs 修改。
https://blog.csdn.net/sanduo112/article/details/90266200

如果有些服务明明地址配对了，我自己能访问，但是他就是访问不到呢？这肯定是因为 Docker 的网络问题，这里需要进行一下配置，参考这篇文章。
https://blog.csdn.net/u013360850/article/details/106159160

还有一些服务，你怎么配都不对，比如 Consul 内部数据复制使用了 8300 端口，也注册了进去。添加如下relabel_configs 忽略掉它。
    relabel_configs:
      - source_labels: [__meta_consul_service]
        regex: .*consul.*
        target_label: __meta_consul_service
        action: drop
```

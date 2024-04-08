---
title: "Docker 常用操作"
author: "Charles"
description: ""
tags:
  - docker
slug: "docker-common-operation"
pubDatetime: 2021-11-13T18:21:02.000+08:00
modDatetime: 2022-07-28T16:52:08.000+08:00
featured: false
draft: false
---

# 镜像操作

```bash
# 列出镜像
docker images # 列出镜像
docker image ls # 同上
docker images -a # 列出所有镜像(包含中间层镜像)
docker image ls -a # 同上

# 下载镜像
docker pull image_name

# 删除镜像
docker rmi image_name_or_id # 删除单个镜像
docker image rm image_name_or_id # 删除单个镜像
docker rmi $(docker images -q) # 删除所有镜像
docker rmi $(docker images | grep "^<none>" | awk "{print $3}") # 删除 untagged images，也就是那些 id 为 <None> 的 image
docker rmi $(docker images -q -f dangling=true) # 删除所有未打 dangling 标签的镜像
docker image prune # 删除未使用的镜像

# 编译镜像
docker build . -t image_name:image_version(lastest)

# 导出镜像
docker save image_name_or_id > file_name(pack.tar)
```

# 容器操作

```bash
# 启动容器
docker run -d -p host_port:container_port --name container_name -v host_file:container_file -e container_config_key:container_config_value --network network_name container_name

# 列出容器
docker ps # 列出活动容器
docker ps -a # 列出所有容器

# 重命名容器
docker rename container_name_or_id

# 启动/重启容器
docker start container_name_or_id # 启动容器
docker restart container_name_or_id # 重启容器

# 停止容器
docker stop container_name_or_id # 停止单个容器
docker stop $(docker ps -a -q) # 停止所有容器
docker kill $(docker ps -a -q) # 杀死所有容器

 # 删除容器
docker rm container_name_or_id # 删除单个容器
docker system prune # 删除所有未运行的容器和缓存
docker rm $(docker ps -a -q) # 删除所有已经停止的容器

# 查看容器的属性，可以查看容器网络
docker inspect container_name_or_id

# 导出容器
docker export container_name_or_id > file_name(pack.tar)
```

# 网络操作

```bash
# 列出所有网络，bridge、host、none 是自带的
docker network ls

# 查看网络的属性，可以查到网络下所有容器的信息
docker network inspect network_name_or_id

# 创建网络
docker network create network_name # 创建 bridge 类型网络
docker network create --driver host network_name # 创建指定类型网络，一共有三种类型 bridge、host、none

# 删除网络
docker network rm network_name_or_id
```

# 容器通信

容器中的 localhost 是容器自己，想要互相访问就必须在同一个 bridge 类型的网络下。
如果满足上述条件，可以直接访问容器名称加端口，如: mysql_8:3306。
也可以用 host.docker.internal:3306 访问其他容器的映射到本机的端口。

# 一些清理硬盘的别名

```bash
# ~/.bash_aliases

# 杀死所有正在运行的容器.
alias dockerkill='docker kill $(docker ps -a -q)'

# 删除所有已经停止的容器.
alias dockercleanc='docker rm $(docker ps -a -q)'

# 删除所有未打标签的镜像.
alias dockercleani='docker rmi $(docker images -q -f dangling=true)'

# 删除所有已经停止的容器和未打标签的镜像.
alias dockerclean='dockercleanc || true && dockercleani'
```

# macOS 卸载 Docker Desktop

1. 打开 Docker Desktop
2. 点击右上角的虫子按钮
3. 点击最下边的 uninstall
4. 删除残留文件，命令如下：

```bash
sudo rm -Rf /Applications/Docker.app
sudo rm -f /usr/local/bin/docker
sudo rm -f /usr/local/bin/docker-machine
sudo rm -f /usr/local/bin/com.docker.cli
sudo rm -f /usr/local/bin/docker-compose
sudo rm -f /usr/local/bin/docker-compose-v1
sudo rm -f /usr/local/bin/docker-credential-desktop
sudo rm -f /usr/local/bin/docker-credential-ecr-login
sudo rm -f /usr/local/bin/docker-credential-osxkeychain
sudo rm -f /usr/local/bin/hub-tool
sudo rm -f /usr/local/bin/hyperkit
sudo rm -f /usr/local/bin/kubectl.docker
sudo rm -f /usr/local/bin/vpnkit
sudo rm -Rf ~/.docker
sudo rm -Rf ~/Library/Containers/com.docker.docker
sudo rm -Rf ~/Library/Application\ Support/Docker\ Desktop
sudo rm -Rf ~/Library/Group\ Containers/group.com.docker
sudo rm -f ~/Library/HTTPStorages/com.docker.docker.binarycookies
sudo rm -f /Library/PrivilegedHelperTools/com.docker.vmnetd
sudo rm -f /Library/LaunchDaemons/com.docker.vmnetd.plist
sudo rm -Rf ~/Library/Logs/Docker\ Desktop
sudo rm -Rf /usr/local/lib/docker
sudo rm -f ~/Library/Preferences/com.docker.docker.plist
sudo rm -Rf ~/Library/Saved\ Application\ State/com.electron.docker-frontend.savedState
sudo rm -f ~/Library/Preferences/com.electron.docker-frontend.plist
```

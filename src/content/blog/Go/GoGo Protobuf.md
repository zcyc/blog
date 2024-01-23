---
title: "GoGo Protobuf"
author: "Charles"
description: ""
tags:
  - blog
ogImage: ""
slug: "gogoproto"
pubDatetime: 2022-06-02T06:25:47.000Z
modDatetime: 2022-06-13T10:28:46.000Z
featured: false
draft: false
---

## 安装环境

### 配置 GOPATH、GOBIN、PATH

我添加到了 .zshrc，你添加到 .profile 或 ./bashrc 或 ./bash_profile 也可以，添加完记得 source 一下，如：source .zshrc

```bash
#这里改成你的 GOPATH 绝对路径
export GOPATH=/Users/charles/go

#这个不用改
export GOBIN=$GOPATH/bin

#这个不用改
export PATH=$PATH:$GOBIN
```

### 克隆依赖仓库

```bash
# 进入文件夹，不存在则创建
cd $GOPATH/src/github.com/gogo
# 克隆 gogo 官方仓库
git clone https://github.com/gogo/protobuf.git
```

### 下载生成器

##### 安装 protoc-3.6.0-osx-x86_64

```bash
cd /tmp
wget https://github.com/protocolbuffers/protobuf/releases/download/v3.6.0/protoc-3.6.0-osx-x86_64.zip -O protoc-3.6.0-osx-x86_64.zip
unzip protoc-3.6.0-osx-x86_64.zip -d protoc-3.6.0-osx-x86_64
cd protoc-3.6.0-osx-x86_64
/bin/cp -f bin/protoc /usr/local/bin/protoc
/bin/cp -rf include/google /usr/local/include
protoc --version
# libprotoc 3.6.0
```

##### 安装 protoc-gen-doc，用于 proto 文件生成 markdown/html/json 文档

```bash
cd /tmp
wget https://github.com/pseudomuto/protoc-gen-doc/releases/download/v1.1.0/protoc-gen-doc-1.1.0.darwin-amd64.go1.10.tar.gz -O protoc-gen-doc-1.1.0.darwin-amd64.go1.10.tar.gz
tar -zxf protoc-gen-doc-1.1.0.darwin-amd64.go1.10.tar.gz
/bin/cp -f protoc-gen-doc-1.1.0.darwin-amd64.go1.10/protoc-gen-doc /usr/local/bin/protoc-gen-doc
```

##### 安装其他编译器

编译器区别看 https://github.com/gogo/protobuf

```bash
go install github.com/golang/protobuf/protoc-gen-go@master
go install github.com/gogo/protobuf/protoc-gen-gofast@master
go install github.com/gogo/protobuf/protoc-gen-gogofast@master
go install github.com/gogo/protobuf/protoc-gen-gogofaster@master
go install github.com/gogo/protobuf/protoc-gen-gogoslick@master
```

##### 安装 Go proto 扩展

在项目目录下

```bash
go get -u github.com/golang/protobuf/proto
go get -u github.com/gogo/protobuf
go get -u github.com/gogo/protobuf/proto
go get -u github.com/gogo/protobuf/gogoproto
go get -u github.com/gogo/protobuf/jsonpb
```

### 配置 IDE

取消勾选这个自动配置，然后添加一个，这里选择你的 $GOPATH/src/
![[ur358z-1654151159396-86b0e823-9f05-4301-890a-57e67ffa525b.png]]

### 编写 proto 文件

- 参考 gogo 官方例子

### 生成 pb 文件

命令中的 --gogofaster_out 是编译器，有多种选择，编译器区别看 https://github.com/gogo/protobuf

```bash
protoc -I=. -I=$GOPATH/src -I=$GOPATH/src/github.com/gogo/protobuf/protobuf --gogofaster_out=\
Mgoogle/protobuf/any.proto=github.com/gogo/protobuf/types,\
Mgoogle/protobuf/duration.proto=github.com/gogo/protobuf/types,\
Mgoogle/protobuf/struct.proto=github.com/gogo/protobuf/types,\
Mgoogle/protobuf/timestamp.proto=github.com/gogo/protobuf/types,\
Mgoogle/protobuf/wrappers.proto=github.com/gogo/protobuf/types:./../ ./*.proto
```

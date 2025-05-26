---
title: GoFrame gRPC 入门
author: Charles
pubDatetime: 2024-05-10T18:49:53.000+08:00
modDatetime: 2024-05-20T16:51:00.000+08:00
featured: false
slug: go-goframe-grpc-ru-men
draft: false
tags:
  - go
description: goframe grpc
---

# Demo
[gf-grpc-template](https://github.com/zcyc/gf-grpc-template)

# 开发流程

## 0. gf init myapp

## 1. 配置 hack/config.yaml

```
# GoFrame CLI tool configuration.
gfcli:
  gen:
    dao:
      - link: "pgsql:postgres:postgres@tcp(localhost:5432)/test"
        tables: "user"
        descriptionTag: true
        noModelComment: true

    pbentity:
      - link: "pgsql:postgres:postgres@tcp(localhost:5432)/test"
        tables: "user"
```

## 2. 配置 manifest/config/config.yaml

```
# GRPC Server.
grpc:
  address: "127.0.0.1:8000"
  name: "test"
  logPath: ""
  logStdout: true
  errorStack: true
  errorLogEnabled: true
  errorLogPattern: "error-{Ymd}.log"
  accessLogEnabled: true
  accessLogPattern: "access-{Ymd}.log"

# Global logging.
logger:
  level: "all"
  stdout: true

# Database.
database:
  logger:
    level: "all"
    stdout: true

  default:
    link: "pgsql:postgres:postgres@tcp(localhost:5432)/test"
    debug: true
```

## 3. 生成 manifest/protobuf/pbentity/user.proto

```
gf gen pbentity
```

<font color=red>如果你的项目在 $GOPATH/src 下，执行 gf gen pb，跳过第 4-6 步</font>

## 4. 生成 api/pbentity/user.pb.go
由于我的项目不在 $GOPATH/src 下，执行 gf gen pb 会报错找不到 google/protobuf/timestamp.proto，所以手动生成 pbentity
```
protoc -I $GOPATH/src --proto_path=/your-source-folder --go_out=paths=source_relative:/your-source-folder --go-grpc_out=paths=source_relative:/your-source-folder /your-source-folder/manifest/protobuf/pbentity/user.proto
```

## 5. 编写 manifest/protobuf/user/v1/user.proto
这个 proto 就是最终提供给调用方的接口

```
syntax = "proto3";

package user;

option go_package = "github.com/gogf/gf-demo-grpc/api/user/v1";

import "pbentity/user.proto";

service User{
    rpc Create(CreateReq) returns (CreateRes) {}
    rpc GetOne(GetOneReq) returns (GetOneRes) {}
    rpc GetList(GetListReq) returns (GetListRes) {}
    rpc Delete(DeleteReq) returns (DeleteRes) {}
}

message CreateReq {
    string Passport = 1; // v: required
    string Password = 2; // v: required
    string Nickname = 3; // v: required
}
message CreateRes {}

message GetOneReq {
    uint64 Id = 1; // v: required
}
message GetOneRes {
    pbentity.User User = 1;
}

message GetListReq {
    int32 Page = 1;
    int32 Size = 2;
}
message GetListRes {
    repeated pbentity.User Users = 1;
}

message DeleteReq {
    // v: min:1#
    // v: Please select the user to be deleted.    uint64 Id = 1;
}
message DeleteRes {}
```

## 6. 生成 pb 文件
由于我的项目不在 $GOPATH/src 下，执行 gf gen pb 会在第 4 步报错，所以手动生成 pb
```
protoc -I $GOPATH/src -I /your-source-folder/manifest/protobuf --proto_path=/your-source-folder --go_out=paths=source_relative:/your-source-folder/api --go-grpc_out=paths=source_relative:/your-source-folder/api /your-source-folder/manifest/protobuf/user/v1/user.proto
```

## 7. 生成 model 文件
do 用来操作数据库，entity 用来从数据库取值

```
gf gen dao
```

## 8. 编写 logic

## 9. 生成 service

```
gf gen service
```

## 10. 编写 controller

# 注意事项

要在 $GOPATH/src 目录下提前准备好依赖的 proto，或者放在 proto 同一目录下

# 遇到的问题

ORM 直接 Scan 到 pbentity 中时间一直为 0，可以先 Scan 到 Enity，然后再处理，demo 中有演示代码。

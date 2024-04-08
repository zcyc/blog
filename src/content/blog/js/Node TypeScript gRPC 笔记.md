---
title: "node-grpc"
author: "Charles"
description: ""
tags:
  - ts
ogImage: ""
slug: "Node TypeScript gRPC 笔记"
pubDatetime: 2019-07-16T01:54:07.000+08:00
modDatetime: 2022-06-30T11:24:53.000+08:00
featured: false
draft: false
---

# server 加载 proto

下边这些是 server 加载 proto 文件的固定写法，除了 proto 文件的路径 PROTO_PATH，其他基本都不用改。

```typescript
var PROTO_PATH = __dirname + "/../../../protos/route_guide.proto";
var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy
var routeguide = protoDescriptor.routeguide;
//或者把上边两句合在一起写成
var routeguide = grpc.loadPackageDefinition(packageDefinition).routeguide;
//上边的 routeguide 是 proto 文件的 package
```

# client 加载 proto

下边是 client 加载 proto 文件的固定写法，除了 proto 文件的路径 PROTO_PATH，基本不用改。

```typescript
var PROTO_PATH = __dirname + "/../../../protos/route_guide.proto";
var async = require("async");
var fs = require("fs");
var parseArgs = require("minimist");
var path = require("path");
var _ = require("lodash");
var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var routeguide = grpc.loadPackageDefinition(packageDefinition).routeguide;
//上边的 routeguide 是 proto 文件的 package
var client = new routeguide.RouteGuide(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
//上边的RouteGuide 是 service
```

# message 的用法

message 是可以随便嵌套的，但是嵌套太多的时候最后发送文件很难把对应的数据填到对应的位置，尤其是使用了 repeated 的时候

```protobuf
service item {
  rpc itemList (itemListRequest) returns (itemReply) {}	//获取物品
}

message itemListRequest {
  string token = 1;	//账号
}

message itemReply {
  int32 result = 1;		//结果
  string message = 2;	//如果失败，填写失败原因
  repeated itemInfo nowItemInfo = 3;	//用户物品
  //这里就是把下边的 message itemInfo 定义成了 message itemReply 的一个字段，叫做 nowItemInfo
}

message itemInfo{
	int32 itemID=1;
	sint32 itemSum=2;
}
```

# repeated 的用法

repeated 绝对是神器，比如你数据库查好几行数据出来，其实每一行数据都是相同的结构，这时候就把其中一行的数据用 message 定义出来，然后再新建一个message，其中一个字段就是刚才那个要 repeated 的字段 ，就可以把你查出来的好几行数据一并发出去，几行都可以。比如：

```protobuf
service item {
  rpc itemList (itemListRequest) returns (itemReply) {}	//获取物品
}

message itemListRequest {
  string token = 1;	//账号
}

message itemReply {
  int32 result = 1;		//结果
  string message = 2;	//如果失败，填写失败原因
  repeated itemInfo nowItemInfo = 3;	//用户物品
  //然后 repeated 就可以把数据库查出来的多个物品的 id 和 数量返回
}

message itemInfo{
	int32 itemID=1;
	sint32 itemSum=2;
}
```

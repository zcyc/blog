---
title: "TypeScript 遇到的问题"
author: "Charles"
description: ""
tags:
  - ts
slug: "typeScript"
pubDatetime: 2019-07-04T08:20:42.000+08:00
modDatetime: 2020-12-02T13:43:22.000+08:00
featured: false
draft: false
---

# 导出( export )和导入( import )

注意导出的模块是函数还是值，如果导出的模块是一个函数，引用的时候要加()，如果导出的是值就不需要就()

## 第一种

```javascript
// 导出方式
function aesDecrypt(data: string, password: string) {}
function aesEncrypt(data: string, password: string) {}
export let cryptUtil = {
  aesEncrypt: aesEncrypt,
  aesDecrypt: aesDecrypt,
};

// 导入方式
import { cryptUtil } from "./crypt_util";
```

## 第二种

```javascript
// 导出方式
export let Header = {
  serverType: {},
  serverStatus: {},
};

// 导入方式
import { Hearder } from "./Header";
```

## 第三种

```javascript
// 导出方式
module.exports = { serverType: {} ....}
// 导入方式
let  Header = require("./Header")
// 或者
import * as Header from "./Header"
```

## 第四种

```javascript
// 导出方式
let a:any={}
a.b=()=>{}
a.c=()=>{}
module.exports={a}

// 导入方式
import a from "./Header"
```

# this 丢失作用域问题

```javascript
// 在回调函数外边先声明一个 that 指向正确的 this
let that = this;
```

# async/await 控制异步

```javascript
async getUserList(){
	let res = await this.mysqlPool.get(platform).exec(`select * from users `);
  let res2 = await this.mysqlPool.get(platform).exec(`select * from users `);
}
```

# 数据库操作结果

```javascript
// 如果当前表有一个自增字段，insert语句的结果中的res[0].insertId就是当前插入的字段字段的值
let userName = "a";
let password = "b";
let res = await this.mysqlPool
  .get(platform)
  .exec(
    `INSERT INTO users (userName,password) VALUES ('${userName}', '${password}')`
  );
let id = res[0].insertId;
id = id || 0;
if (id == 0) {
  return 0;
}

// 查询语句中，res[0][0]是最后的结果集，加入里边有个password字段，那么password字段就在res[0][0].password
let res = await this.mysqlPool
  .get(platform)
  .exec(`select * from users where userName='${userName}' limit 1`);
console.log(res[0][0]);
console.log(res[0][0].password);
```

# 函数的定义

```javascript
function a(b:string){}
let a =(b:string)=>{}

```

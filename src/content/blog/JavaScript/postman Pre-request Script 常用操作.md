---
title: "postman-pre-request"
author: "Charles"
description: ""
tags:
  - blog
ogImage: ""
slug: "postman Pre-request Script 常用操作"
pubDatetime: 2022-05-30T06:12:42.000Z
modDatetime: 2022-06-28T10:19:51.000Z
featured: false
draft: false
---

# Query Params 操作

## 需求

有些接口要求 GET 请求在 URL 里边传一个 URL encode 之后的 JSON。

## 脚本

```bash
pm.request.url.query.each((q) => {
    q.update(encodeURI(q.toString()))
});
```

## 效果对比

### postman 填的参数

```bash
localhost:1234/cardInfo/getCardInfos/ids?cardInfoReqs=[{"id":"1", "type":111}]
```

### 实际请求的参数

```bash
localhost:1234/cardInfo/getCardInfos/ids?cardInfoReqs=%5B%7B%22id%22:%221%22,%20%22type%22:111%7D%5D
```

# Body x-www-form-urlencoded 操作

## 需求

Body 选择 x-www-form-urlencoded 类型，用一个 key 传一个 JSON 出去，并且这个 JSON 中的某些字段是动态生成的。

## 脚本

```bash
obj = JSON.parse(request.data['JSONpost'])
function generateTimeReqestNumber() {
        var date = new Date();
        return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes());
}
function pad2(n) { return n < 10 ? '0' + n : n }
req_time = generateTimeReqestNumber()

pm.environment.unset("authcode");
pm.environment.set("authcode", req_time);
apiID = "Test"
authStr = ""
saltStr = "S0XPT0TFQVBQ"

authCode =  apiID + saltStr+ req_time + obj.SchDate.substring(0,10);
signRet = CryptoJS.MD5(authCode).toString().toLowerCase();
console.log(authCode)
pm.environment.unset("signVal");
pm.environment.set("signVal", signRet);
```

## 效果对比

### postman 填的参数

```bash
JSONpost: {"AuthCodeArray":["{{authcode}}","Test","{{signVal}}"],"BegStnid":"046002","EndStnid":"012004","SchDate":"2021-03-12"}
```

### 实际请求的参数

```bash
JSONpost: "{"AuthCodeArray":["202205301430","Test","63808c19eee5257c41f7a86bbb1dbe2"],"BegStnid":"046002","EndStnid":"012004","SchDate":"2021-03-12"}"
```

# Body raw JSON 操作

## 需求

Body 选择 raw JSON 类型，并且这个 JSON 中的某些字段是动态生成的。

## 脚本

```bash
obj = JSON.parse(request.data)
function generateTimeReqestNumber() {
        var date = new Date();
        return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes());
}
function pad2(n) { return n < 10 ? '0' + n : n }
req_time = generateTimeReqestNumber()

pm.environment.unset("operatetime");
pm.environment.set("operatetime", req_time);
apiID = "Test"
hashKey = "TestKey"
pm.environment.unset("appid");
pm.environment.set("appid", apiID);

authCode = req_time + apiID + obj.SearchTimeS;
signRet = CryptoJS.HmacMD5(authCode, hashKey).toString().toLowerCase();
console.log(authCode)
pm.environment.unset("signVal");
pm.environment.set("signVal", signRet);
```

## 效果对比

### postman 填的参数

```bash
{
    "ApiName": "ScheduleList",
    "AuthCodeArray": {
      "APIID": "{{appid}}",
      "AuthCode": "{{signVal}}",
      "OperateTime": "{{operatetime}}"
    },
    "BegStnID": "A03",
    "EndStnID": "G67",
    "SearchTimeS": "2021/03/12 16:00"
}
```

### 实际请求的参数

```bash
{
    "ApiName": "ScheduleList",
    "AuthCodeArray": {
      "APIID": "Test",
      "AuthCode": "e083306fff8ddd2ea85f214d06c7fdeee",
      "OperateTime": "202205301436"
    },
    "BegStnID": "A03",
    "EndStnID": "G67",
    "SearchTimeS": "2021/03/12 16:00"
}
```

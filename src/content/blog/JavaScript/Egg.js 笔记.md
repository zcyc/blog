---
title: "Egg.js 笔记"
author: "Charles"
description: ""
tags:
  - blog
ogImage: ""
slug: "eggjs"
pubDatetime: 2019-07-20T10:02:38.000Z
modDatetime: 2022-06-30T11:24:30.000Z
featured: false
draft: false
---

# 取消csrf验证（在没法拿到 this.ctx.csrf 的时候）

在config.default.js添加如下代码关闭csrf验证

```typescript
config.security = {
  csrf: {
    enable: false,
  },
};
```

也可以不关掉csrf，只放通所有json请求

```typescript
config.security = {
  csrf: {
    ignoreJSON: true,
  },
};
```

# 部署到服务器

package.json要写成这样,记得改备注那一条的内容，然后删掉备注

```json
{
  "name": "hotel-api", //这是项目名称
  "version": "1.0.0", //这是项目版本
  "description": "The hotel api by egg ts", //这是项目介绍
  "private": true,
  "dependencies": {
    "egg": "^2.10.0",
    "egg-sequelize": "^5.0.0",
    "mysql2": "^1.6.1"
  },
  "devDependencies": {
    "@types/mocha": "^5.2.6",
    "autod": "^3.0.1",
    "egg-bin": "^4.8.1",
    "egg-mock": "^3.19.2",
    "factory-girl": "^5.0.2",
    "lodash": "^4.17.10",
    "sequelize-cli": "^5.0.0"
  },
  "engines": {
    "node": ">=8.9.0"
  },
  "egg": {
    "typescript": true, //是否使用typescript开发
    "declarations": true //启用egg-ts-helper支持
  },
  "scripts": {
    "dev": "egg-bin dev", //开发模式启动程序，加载dev配置
    "test-local": "egg-bin test",
    "clean": "ets clean", //删除ts编译成的js文件
    "test": "NODE_ENV=test npm run sequelize -- db:migrate && egg-bin test",
    "cov": "egg-bin cov", //单元测试覆盖率检查
    "autod": "autod", //通过解析项目文件自动生成依赖项和devDependencies
    "sequelize": "sequelize --",
    "tslint": "tslint .",
    "eslint": "eslint .",
    "debug": "egg-bin debug", //使用V8 Inspector Integration调试egg应用程序
    "start": "egg-scripts start --title=egg-server-showcase", //正式服启动项目
    "stop": "egg-scripts stop --title=egg-server-showcase", //正式服结束项目
    "startd": "egg-scripts start --daemon --title=egg-server-showcase", //正式服守护进程启动
    "tsc": "ets && tsc -p tsconfig.json", //将ts项目编译成js，正式服必须用js部署
    "ci": "npm run lint && npm run cov && npm run tsc"
  },
  "author": "CharlieZzo <8595764@qq.coom>",
  "license": "MIT"
}
```

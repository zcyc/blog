---
title: "eggjs-sequelize"
author: "Charles"
description: ""
tags:
  - JavaScript
ogImage: ""
slug: "egg-sequelize-typescript"
pubDatetime: 2019-07-15T09:09:21.000Z
modDatetime: 2020-12-02T13:41:37.000Z
featured: false
draft: false
---

# 默认访问复数表名

他默认是访问复数的表，你填单数他也改成复数访问。如图：!
![Untitled](../Assets/egg-sequelize-typescript-1.png)
比如你表名填的user，但是他访问users，你表名填的project，他访问projects
当然复数的确是正确的命名方法，但是就是不想让他自动改，自己建表就建成复数。

## 解决方案一

就是在定义 model 的时候，禁止转换为复数：

```typescript
app.model.define(
  "project",
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(20),
    created_at: DATE,
    updated_at: DATE,
  },
  {
    // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    freezeTableName: true,
  }
);
```

## 解决方案二

直接修改 config/config.\[env].js(下同)中的 sequelize 配置：

```typescript
exports.sequelize = {
    dialect: 'mysql',
    ....
    define: {
      underscored: true, // 注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
      // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
      // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
      freezeTableName: true
    }
  }
```

# 自动维护时间戳

你查到的数据，默认带两个时间戳，即使你数据库没有这两个字段，而且你 model 不定义这两个字段还报错。
如果你把这两个时间返回给接口又不用，这个时候就得禁止自动维护时间戳。

## 解决方案

```typescript
app.model.define(
  "project",
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(20),
    created_at: DATE,
    updated_at: DATE,
  },
  {
    timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
  }
);
```

# 时间存储

MySQL 保存时会自动保存为 UTC 格式，可以在 config 中配置：

```typescript
exports.sequelize = {
    dialect: 'mysql',
    ....
    timezone: '+08:00' // 保存为本地时区
  }
```

## 解决方案

egg-sequelize 在读取时间时，还是会返回 UTC 格式，需要改一下配置，添加：

```typescript
exports.sequelize = {
    dialect: 'mysql',
    ....
    timezone: '+08:00' ,// 保存为本地时区
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      }
    }
  }
```

详情请参考[Setting timezone](https://github.com/sequelize/sequelize/issues/854)

# egg-mysql 没有 index.d.ts

egg-mysql 没有 index.d.ts 所以 你想使用`app.mysql` 是编译不过的，所以要用 ts 的 merge 来给`Application`上挂载一个 MySQL

## 解决方案

```typescript
./typings/index.d.ts 写入
declare module 'egg' {
  interface mysql {
    get(tableName: String, find: {}): Promise<Any>

    query(sql: String, values: Any[]): Promise<Any>
  }
  interface Application {
    mysql: mysql;
  }
}
//可以在上面给mysql 加点方法这样就有提示了。
```

# egg-sequelize 没有通用模板

首先你要做一个 model 来定义这个表中的字段，但是为了方便开发，我们得加点料。

## 解决方案

### 第一步

在 /app/model/model.ts 这里写一个基类的 basemodel 这样以后所有的 model 都可以用到基类

```typescript
import { Application } from "egg";
import { snakeCase } from "lodash";
import * as moment from "moment";
import { DefineAttributes, SequelizeStatic } from "sequelize";
export default function BaseModel(
  app: Application,
  table: string,
  attributes: DefineAttributes,
  options: object = {}
) {
  const { Op, UUID, UUIDV4 } = app.Sequelize;

  const modelSchema = app.model.define(
    table,
    {
      id: {
        type: UUID,
        unique: true,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      ...attributes,
      ...getDefaultAttributes(options, app.Sequelize),
    },
    {
      // 自动维护时间戳 [ created_at、updated_at ]
      timestamps: true,
      // 不使用驼峰样式自动添加属性，而是下划线样式 [ createdAt => created_at ]
      underscored: true,
      // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
      // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
      freezeTableName: false,
      ...options,
      scopes: {
        // 定义全局作用域，使用方法如: .scope('onlyTrashed') or .scope('onlyTrashed1', 'onlyTrashed12') [ 多个作用域 ]
        onlyTrashed: {
          // 只查询软删除数据
          where: {
            deleted_at: {
              [Op.not]: null,
            },
          },
        },
      },
    }
  );

  modelSchema.getAttributes = (): string[] => {
    return Object.keys(attributes);
  };

  modelSchema.findAttribute = (attribute: string): object | undefined => {
    return (attributes as any)[attribute];
  };

  modelSchema.fillable = (): string[] => {
    return [];
  };

  modelSchema.hidden = (): string[] => {
    return [];
  };

  modelSchema.visible = (): string[] => {
    return [];
  };

  return modelSchema;
}

function getDefaultAttributes(
  options: object,
  sequelize: SequelizeStatic
): object {
  const { DATE } = sequelize;

  const defaultAttributes = {
    created_at: {
      type: DATE,
      get() {
        return moment((this as any).getDataValue("created_at")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      },
    },
    updated_at: {
      type: DATE,
      get() {
        return moment((this as any).getDataValue("updated_at")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      },
    },
  };

  // 需要从 options 读取的配置信息，用于下方做过滤的条件
  const attributes = ["createdAt", "updatedAt", "deletedAt"];

  Object.keys(options).forEach((value: string) => {
    if (attributes.includes(value) && (options as any)[value] === false) {
      delete (defaultAttributes as any)[snakeCase(value)];
    }
  });
  return defaultAttributes || {};
}
```

### 第二步

/app/model/index.d.ts 将 model 挂载到 application 上同时给 model 扩展方法。

```typescript
import { User } from "./user";
declare module "egg" {
  interface Application {
    Sequelize: SequelizeStatic;
    model: Sequelize;
  }

  interface Context {
    model: {
      User: Model<User, {}>;
    };
  }
}
Mode;
declare module "sequelize" {
  interface Model<TInstance, TAttributes> {
    fillable(): string[];
    hidden(): string[];
    visible(): string[];
    getAttributes(): string[];
    findAttribute(attribute: string): object | undefined;

    getDataValue(key: string): any;

    setDataValue(key: string, value: any): void;
  }
}
```

### 第三步

app/model/user.ts

```typescript
import { Application } from "egg";
import BaseModel from "./model";

export default function User(app: Application) {
  const { INTEGER, DATE, STRING, BOOLEAN } = app.Sequelize;

  const modelSchema = BaseModel(
    app,
    "users",
    {
      name: {
        type: STRING(32),
        unique: true,
        allowNull: false,
        comment: "用户名",
      },
      email: {
        type: STRING(64),
        unique: true,
        allowNull: true,
        comment: "邮箱地址",
      },

      phone: {
        type: STRING(20),
        unique: true,
        allowNull: true,
        comment: "手机号码",
      },
      avatar: {
        type: STRING(150),
        allowNull: true,
        comment: "头像",
      },
      real_name: {
        type: STRING(30),
        allowNull: true,
        comment: "真实姓名",
      },
      signature: {
        type: STRING(255),
        allowNull: true,
        comment: "签名",
      },
      notify_count: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "消息通知个数",
      },
      status: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: 1,
        comment: "用户状态: 1 正常； 0 禁用",
      },
      password: {
        type: STRING(255),
        allowNull: false,
      },
      last_actived_at: DATE,
    },
    {
      paranoid: true,

      setterMethods: {
        async password(value: any) {
          (this as any).setDataValue("password", await app.createBcrypt(value));
        },
      },
    }
  );
  return modelSchema;
}
```

到这里我们就完成了一个 model 的开发

# 迁移工具配置文件错误

用 sequelize 肯定要用官方迁移工具 migration，在 package.json 的 script 加入

```json
"migrate:new": "egg-sequelize migration:create",
"migrate:up": "egg-sequelize db:migrate",
"migrate:down": "egg-sequelize db:migrate:undo"
```

执行命令`npm run migration:create -- --name user`生成一个 migrations 文件夹，还有一个空的文件，这时候你需要自己把 user.ts 内的 model 复制一份过来，然后执行 npm run migration:up，这个时候产生错误如下：

```bash
Sequelize CLI [Node: 8.11.3, CLI: 4.0.0, ORM: 4.38.0]
Loaded configuration file "node_modules/egg-sequelize/lib/database.js".
Using environment "development".
ERROR: Dialect needs to be explicitly supplied as of v4.0.0
```

## 解决方案

我们看源文件是需要从配置里 `config.default.js`读取 而非 `config.default.ts`，所以我们需要再建一个文件`config.default.js.bak` 这样做的目的是为了避免被egg 把js文件清除。把 config.default.js.bak 改成 config.default.js 再执行 up 会发现成功了。

# Mysql 中文和 emoji 乱码

**需要自己写个 config.json 给 seqlize 去读**。这时候带来一个新问题，就是 MySQL 字符集问题

## 解决方案

config.json 没有指定为 utf8mb4 所以默认为 latin，导致中文或者 emoji 无法存入。

感谢比我先踩坑的小伙伴：[寒枫傲天](https://www.jianshu.com/u/40db6cfdbb20)、[无米学炊](https://www.jianshu.com/u/8feaec5074a2)

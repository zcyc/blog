---
title: "node-mysql"
author: "Charles"
description: ""
tags:
  - js
slug: "Node MySQL CURD & 返回值使用"
pubDatetime: 2019-07-04T02:12:12.000+08:00
modDatetime: 2022-07-28T03:34:49.000+08:00
featured: false
draft: false
---

### 1. 连接数据库

首先保证本地已经安装数据库，并已正常启动，然后开始进行连接：

```javascript
// test.js
var mysql = require("mysql");
// 创建连接
var conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123",
  database: "test",
});
// 创建连接后不论是否成功都会调用
conn.connect(function (err) {
  if (err) throw err;
  console.log("connect success!");
});
// 其他的数据库操作，位置预留
// 关闭连接时调用
conn.end(function (err) {
  if (err) throw err;
  console.log("connect end");
});
```

执行`node test.js`后，就会输出：

```javascript
$ node test.js
connect success!
connect end
```

连接成功，然后连接关闭。这就说明程序可以正常连接数据库了，然后就开始进行增删改查的操作。

### 2. CURD

比如我们有这样的一个`user`表，里面有4个字段，其中uid是自增字段：

| uid | username | password | email      |
| --- | -------- | -------- | ---------- |
| 1   | meizi    | meizi    | 123@qq.com |
| 2   | test     | test     | 456@qq.com |

我们就对这个表进行增删改查的操作。
mysql中有个`query`方法可以用来执行任意正确的sql语句，然后在回调函数里给出执行sql语句后的结果。query方法是异步执行的，若并列书写多个query方法的话，是不能按照书写顺序依次阻塞式执行的。

#### 2.1 查询

使用最普遍最多的就是查询操作了。

```javascript
conn.query("SELECT * FROM `user`", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});
console.log("select ended!");
```

输出的结果：

```javascript
select ended! // 先输出
[
    RowDataPacket {
        uid: 1,
        username: 'meizi',
        password: 'meizi'
        email: '123@qq.com'
    },
        RowDataPacket {
        uid: 2,
        username: 'test',
        password: 'test'
        email: '456@qq.com'
    }
]
```

可以看到，结果集是一个数组，数组中的每条数据都是一个`RowDataPacket`对象，在使用时，可以像json对象一样获取数据，也可以使用`JSON.stringify`把result转换为json字符串，但是，result并不是JSON数据。而且，即使结果集中只有一条数据，也是以数组的形式返回的。

```javascript
console.log(result[0].username); // meizi
```

输出即为字符串类型的数据。

#### 2.2 添加

向数据库中添加数据使用的是`INSERT`，INSERT语句有两种形式都可以使用：
第1种，先列好要插入的数据对应的字段，然后跟上数据（如果要给所有的字段都插入数据，可以省略字段不写，但是数据的书写顺序要跟数据表里的字段一一对应）：

```sql
INSERT INTO table_name ( field1, field2,...fieldN ) VALUES ( value1, value2,...valueN );
```

第2种，可以像update操作一样书写，将field与value对应的更紧密：

```sql
INSERT INTO table_name SET field1=value1, field2=value2, ... fieldN=valueN;
```

我更加喜欢第2种方式，这种方式更能看出操作了哪些字段，看出字段和数据的对应关系。在node中插入数据：

```javascript
conn.query(
  "INSERT INTO `user` SET `username`='qwerty', `password`='741', `email`='qwerty@qq.com'",
  function (err, result) {
    if (err) throw err;
    console.log(result);
  }
);
```

插入数据后返回的结果是：

```javascript
OkPacket {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 4, // 数据插入成功时，对应的主键id
    serverStatus: 2,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0
}
```

`affectedRows`表示数据表中受影响的行数，数据插入成功则为1，失败则为0；在主键自增的情况下，`insertId`是数据插入成功后对应的主键id，如果主键不自增，则insertId为0。

#### 2.3 更新

使用`update`语句更新数据：

```javascript
// 更新uid的密码
conn.query(
  'UPDATE `user` SET `password`="123456" WHERE `uid`=4',
  function (err, result) {
    if (err) throw err;
    console.log(result);
  }
);
```

输出的结果：

```javascript
OkPacket {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 2,
    warningCount: 0,
    message: '(Rows matched: 1  Changed: 1  Warnings: 0',
    protocol41: true,
    changedRows: 1
}
```

可以看到输出结果的类型与插入数据时输出结果的类型是一样的。我们分析一下，执行sql语句后，有3种结果：

1. 成功修改数据： affectedRows：1, changedRows:1

2. 要修改的数据与原数据相同： affectedRows：1, changedRows:0

3. 未找到需要修改的数据： affectedRows：0, changedRows:0

因此可以根据这两个字段输出相应的结果。

#### 2.4 删除

使用`delete`语句删除语句：

```javascript
conn.query("DELETE FROM `user` WHERE `uid`=4", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});
```

输出的结果：

```javascript
OkPacket {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 2,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0
}
```

删除成功，则affectedRows为1，删除的数据不存在，则为0。

### 3. 连接池

数据库连接是一种有限的，能够显著影响到整个应用程序的伸缩性和健壮性的资源，在多用户的网页应用程序中体现得尤为突出。
数据库连接池正是针对这个问题提出来的，它会负责分配、管理和释放数据库连接，允许应用程序重复使用一个现有的数据库连接，而不是重新建立一个连接，释放空闲时间超过最大允许空闲时间的数据库连接以避免因为连接未释放而引起的数据库连接遗漏。

#### 3.1 创建连接池

使用`mysql.createPool()`可创建连接池：

```javascript
// test.js
var mysql = require("mysql");
var pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123",
  database: "test",
});
pool.query("SELECT * FROM `user`", function (err, result) {
  if (err) throw err;
  console.log(result);
  pool.end(function (err) {
    if (err) throw err;
    console.log("connection ended");
  });
});
```

`getConnection()`可以共享一个连接，或管理多个连接。

```javascript
// test.js
var mysql = require("mysql");
var pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123",
  database: "test",
});
pool.getConnection(function (err, connection) {
  if (err) throw err;
  connection.query("SELECT * FROM `user`", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});
```

连接使用完后通过调用connection.release()方法可以将连接返回到连接池中，这个连接可以被其它人重复使用：

```javascript
pool.getConnection(function (err, connection) {
  if (err) throw err;
  connection.query("SELECT * FROM `user`", function (err, result) {
    if (err) throw err;
    console.log(result);
    connection.release();
    // 接下来connection已经无法使用，它已经被返回到连接池中
  });
});
```

可以使用`connection.destroy()`彻底销毁连接。

#### 3.2 连接池事件

`createPool()`方法会返回一个连接池实例对象，这个对象中有一些事件。
`connection`
连接池中产生新连接时会发送'connection'事件：

```javascript
pool.on("connection", function (connection) {
  console.log("new connection");
});
```

#### 3.3 query与getConnection的区别

这两个方法都能进行操作，那么这两者有什么区别呢？
在`pool.getConnection`中的`connection`在其回调函数里是一直的，可以保证这一系列的操作都是在同一个connection中执行的；`pool.query`则每次执行时可能会在不同的connection中执行，可能会得到意想不到的结果。
比如`SQL_CALC_FOUND_ROWS`和`FOUND_ROWS`这需要两个sql语句完成，是获取检索行的数目。

```javascript
pool.query("SELECT SQL_CALC_FOUND_ROWS * FROM `user`");
pool.query("SELECT FOUND_ROWS()");
```

这两个可能在不同的`connection`中执行，第2个sql语句返回的就不是上一个sql语句的结果了。

### 4. sql防注入

sql防注入的关键就是不能直接把数据拼接到sql语句中，必须得对数据进行转义，或者使用提供的方法拼接sql语句。这里主要有四种方法可以使用。

#### 4.1 使用escape()对参数进行编码

参数编码方法有：`mysql.escape()/connection.escape()/pool.escape()`，这三个方法可以在你需要的时候调用：

```javascript
var sql = "SELECT * FROM `user` WHERE `uid`=" + connection.escape('"123";//--');
console.log(sql); // SELECT * FROM `user` WHERE `uid`='\"123\";//--'
connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result);
});
```

对双引号进行了安全转义。
`escapeId()`可以对不信任的表名，字段名进行转义。

```javascript
var sql = "SELECT * FROM " + connection.escapeId("user") + " WHERE `uid`=1";
connection.query(sql, function (err, result) {
  console.log(result);
});
console.log(query.sql); // SELECT * FROM `user` WHERE `uid`=1
```

同时，escape()的编码规则如下：

- Numbers不进行转换

- Booleans转换为true/false

- Date对象转换为’YYYY-mm-dd HH:ii:ss’字符串

- Buffers转换为hex字符串，如X'0fa5'

- Strings进行安全转义

- Arrays转换为列表，如\['a', 'b']会转换为'a', 'b'

- 多维数组转换为组列表，如\[\['a', 'b'], \['c', 'd']]会转换为('a', 'b'), ('c', 'd')

- Objects会转换为key=value键值对的形式。嵌套的对象转换为字符串

- undefined/null会转换为NULL

- MySQL不支持NaN/Infinity，并且会触发MySQL错误

#### 4.2 占位符

可以使用`?`作为参数占位符。在使用查询参数占位符时，在其内部自动调用 connection.escape() 方法对传入参数进行编码。

```javascript
var params = ["test", "test"];
var query = connection.query(
  "SELECT * FROM `user` WHERE `username`=? AND `password`=?",
  params,
  function (err, result) {
    console.log(result);
  }
);
console.log(query.sql); // SELECT * FROM `user` WHERE `username`='test' AND `password`='test'
```

同时，如果执行添加或更新操作时，还可以这样写：

```javascript
var params = { username: "qwerty", password: "qwerty", email: "qwerty@qq.com" };
var query = connection.query(
  "INSERT INTO `user` SET ?",
  params,
  function (err, result) {
    if (err) throw err;
    console.log(result);
  }
);
console.log(query.sql); // INSERT INTO `user` SET `username` = 'qwerty', `password` = 'qwerty', `email` = 'qwerty@qq.com'
```

数据库中的表明和字段名，可以使用`??`作为占位符，在拼接完成后会自动添加上\`\`：

```javascript
var params = ["user", "username", "test", "password", "test"];
var query = connection.query(
  "SELECT * FROM ?? WHERE ??=? AND ??=?",
  params,
  function (err, result) {
    console.log(result);
  }
);
console.log(query.sql); // SELECT * FROM `user` WHERE `username`='test' AND `password`='test'
```

#### 4.3 使用mysql.format()转义参数

不多说，样例如下：

```javascript
var userId = 1;
var sql = "SELECT * FROM ?? WHERE ?? = ?";
var inserts = ["user", "uid", userId];
sql = mysql.format(sql, inserts); // SELECT * FROM `user` WHERE `uid` = 1
```

### 5. 多语句查询

出于安全考虑node-mysql默认禁止多语句查询（可以防止SQL注入），启用多语句查询可以将`multipleStatements`选项设置为`true`：

```javascript
var connection = mysql.createConnection({ multipleStatements: true });
```

启用后可以在一个query查询中执行多条语句：

```javascript
connection.query("SELECT 1; SELECT 2", function (err, results) {
  if (err) throw err;
  // `results`是一个包含多个语句查询结果的数组
  console.log(results[0]);
  console.log(results[1]);
});
```

---
title: "MySQL 常用操作"
author: "Charles"
description: ""
tags:
  - mysql
ogImage: ""
slug: "mysql"
pubDatetime: 2022-04-04T10:41:56.000Z
modDatetime: 2022-08-30T08:30:04.000Z
featured: false
draft: false
---

# 建表操作

## 常用字段

```sql
-- 删除已经存在的表
-- DROP TABLE IF EXISTS `table_name`;
-- 建表
CREATE TABLE `table_name`  (
  `id` VARCHAR(36) NOT NULL COMMENT '主键',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '表示数据状态，status=1 可用，status=2 不可用',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` datetime COMMENT '删除时间',
  `name` VARCHAR(16) NOT NULL COMMENT '名称',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;
```

## 主键

简单场景优先使用自增id，数据类型用 bigint。如果使用 uuid 就是 varchar(36)。储存其他表的主键要创建和该主键类型相同的字段。

## 日期时间

日期时间使用 datetime，在 2038 年之前 timestamp 也可以用，国际业务使用 UTC 时间，客户端根据所在时区转本地。

## 数据控制

使用 state 字段实现对 B 端和 C 端的展示不同数据的控制。B 端不展示删除的数据，C 端只展示上架的数据。

## 字符集

字符集选 utf8mb4。

## 排序规则

### utf8mb4_general_ci

ci即case insensitive，不区分大小写。没有实现Unicode排序规则，在遇到某些特殊语言或者字符集，排序结果可能不一致，但是，在绝大多数情况下，这些特殊字符的顺序并不需要那么精确。另外，在比较和排序的时候速度更快。

### utf8mb4_unicode_ci

不区分大小写，基于标准的Unicode来排序和比较，能够在各种语言之间精确排序，在特殊情况下，Unicode排序规则为了能够处理特殊字符的情况，实现了略微复杂的排序算法，所以兼容度比较高，但是性能不高。

### utf8mb4_bin

将字符串每个字符用二进制数据编译存储，区分大小写，而且可以存二进制的内容。

# 索引操作

```plsql
-- 在建表语句中创建索引
INDEX index_name(column_name) -- 普通索引
UNIQUE INDEX index_name(column_name) -- 唯一索引
INDEX index_name(column_name_1, column_name_2) -- 联合索引

-- 向表结构中写入索引
ALTER TABLE table_name ADD INDEX index_name(column_name) -- 普通索引
ALTER TABLE table_name ADD UNIQUE INDEX index_name(column_name) -- 唯一索引
ALTER TABLE table_name ADD INDEX index_name(column_name_1, column_name_2) -- 联合索引

-- 创建索引
CREATE INDEX table_name ON table_name (column_name) -- 普通索引
CREATE UNIQUE INDEX index_name ON table_name (column_name) -- 唯一索引
CREATE INDEX index_name ON table_name (column_name_1, column_name_2) -- 联合索引

-- 删除索引
DROP INDEX index_name ON table_name;
```

# 自增操作

```plsql
-- 修改当前自增值
alter table table_name AUTO_INCREMENT=1;

-- 给表添加自增主键
alter table table_name add id bigint auto_increment primary key id;

-- 清空表数据并重置自增
TRUNCATE TABLE table_name;
```

# 改表操作

```plsql
ALTER TABLE table_name MODIFY COLUMN column_name column_type column_size defalut_value new_comment;

ALTER TABLE table_name CHANGE old_column_name new_column_name column_type;
```

# 给表添加时间

```plsql
ALTER TABLE table_name
ADD COLUMN create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录写入时间',
ADD COLUMN update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER create_time COMMENT '记录更新时间',
ADD COLUMN deleted_time datetime NOT NULL AFTER update_time COMMENT '记录删除时间';
```

# UPSERT 操作

```plsql
INSERT INTO email_burn_time (email_id, burn_time, burn_expire_time) VALUES (100, 100, '2020-02-25 10:56:27') ON DUPLICATE KEY UPDATE burn_expire_time = current_timestamp() + VALUES(burn_time)
```

# 账号操作

```plsql
-- 创建新用户
create user 'username'@'%' identified by 'password';

-- 修改密码
use mysql;
ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;

-- 查看加密方式
select host,user,plugin from user;

-- 修改账号加密方式
update user set plugin='mysql_native_password' where user='username';
```

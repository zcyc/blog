---
title: "PostgreSQL 常用操作"
author: "Charles"
description: ""
tags:
  - mysql
ogImage: ""
slug: "postgresql"
pubDatetime: 2022-06-24T12:39:29.000+08:00
modDatetime: 2022-08-30T08:47:18.000+08:00
featured: false
draft: false
---

# 建表操作

## 常用字段

```plsql
-- 删除已经存在的表
-- DROP TABLE IF EXISTS "public"."table_name";
-- 建表
CREATE TABLE "public"."table_name" (
  "id" varchar(20) NOT NULL,
  "status" INT2 NOT NULL DEFAULT 1,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp,
  "name" varchar(255) COLLATE "pg_catalog"."default"
);
-- 添加描述
ALTER TABLE "public"."table_name" OWNER TO "postgres";
COMMENT ON COLUMN "public"."table_name"."state" IS '删除标记';
COMMENT ON COLUMN "public"."table_name"."created_at" IS '创建时间';
COMMENT ON COLUMN "public"."table_name"."updated_at" IS '更新时间';
COMMENT ON COLUMN "public"."table_name"."deleted_at" IS '删除时间';
COMMENT ON COLUMN "public"."table_name"."id" IS '自增主键';
COMMENT ON COLUMN "public"."table_name"."name" IS '名称';
-- 创建序列
CREATE SEQUENCE IF NOT EXISTS table_name_id_seq;
```

## 主键

简单场景优先使用自增id，数据类型用 SERIAL8。如果使用 uuid 就是 varchar(36)。储存其他表的主键要创建和该主键类型相同的字段，如果该表主键类型是 SERIAL8，则创建一个 INT8 类型的字段来储存。

## 日期时间

国内业务日期时间使用 timestamp，国际业务使用 timestamptz，客户端根据所在时区转本地时间。

## 数据控制

使用 state 字段实现对 B 端和 C 端的展示不同数据的控制。B 端不展示删除的数据，C 端只展示上架的数据。

## 字符集和排序规则

字符集和排序规则在创建数据库的时候已经指定了，建表时候不需要关注。

# 删除数据库

学习 postgre 频繁创建和删除数据库，发现只要你连过就删不掉了。可以进入数据库执行如下 sql，执行完了关闭数据库就可以删掉了。

```go
SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE datname='数据库名' AND pid<>pg_backend_pid();
```

# 序列操作

```plsql
-- 创建
CREATE SEQUENCE IF NOT EXISTS table_name_id_seq;

-- 修改序列
alter sequence table_name_id_seq restart with 1

-- 创建并指定开始
CREATE SEQUENCE IF NOT EXISTS table_name_id_seq START 100

-- 查询序列下一个值
select nextval('table_name_id_seq');

-- 删除
DROP SEQUENCE table_name_id_seq;

-- 查询所有序列
SELECT "c"."relname" FROM "pg_class" "c" WHERE "c"."relkind" = 'S';

-- 新增字段时对某个字段使用已存在的序列
nextval('table_name_id_seq'::regclass)
```

# 索引操作

```plsql
-- 创建索引
CREATE INDEX index_name ON table_name (column_name); -- 普通索引
CREATE UNIQUE INDEX index_name ON table_name (column_name); -- 唯一索引
CREATE INDEX index_name ON table_name (column_name_1, column_name_2); -- 组合索引
CREATE INDEX index_name ON table_name (conditional_expression); -- 条件索引

-- 删除索引
DROP INDEX index_name
```

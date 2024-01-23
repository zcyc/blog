---
title: "MySQL 查询时间段内数据（今天，昨天，本周，本月等）"
author: "Charles"
description: ""
tags:
  - blog
ogImage: ""
slug: "mysql-query-time-period-data"
pubDatetime: 2019-07-08T01:53:59.000Z
modDatetime: 2020-12-02T13:42:23.000Z
featured: false
draft: false
---

# 测试数据

```sql

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `userId` bigint(20) NOT NULL,
  `fullName` varchar(64) NOT NULL,
  `userType` varchar(16) NOT NULL,
  `addedTime` datetime NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', '爽爽', '普通', '2018-01-21 10:20:09');
INSERT INTO `t_user` VALUES ('2', '贵贵', '普通', '2019-11-06 10:20:22');
INSERT INTO `t_user` VALUES ('3', '芬芬', 'vip', '2018-11-13 10:20:42');
INSERT INTO `t_user` VALUES ('4', '思思', 'vip', '2019-01-21 10:20:55');
INSERT INTO `t_user` VALUES ('5', '妍妍', 'vip', '2017-09-17 10:21:28')；
```

# 常用时间段查询语句

```sql
--下边所有的 t_user 都是表名，addedTime 是储存时间的字段名
-- 今天
select fullName,addedTime from t_user where to_days(addedTime) = to_days(now());
-- 今天之前
select fullName,addedTime from t_user where to_days(addedTime) <= to_days(now());
-- 昨天
select fullName,addedTime from t_user where to_days(NOW()) - TO_DAYS(addedTime) = 1;
-- 昨天和今天
select fullName,addedTime from t_user where to_days(NOW()) - TO_DAYS(addedTime) <= 1;
-- 近7天
select fullName,addedTime from t_user where date_sub(CURDATE(),INTERVAL 7 DAY) <= DATE(addedTime);
-- 近30天
SELECT fullName,addedTime FROM t_user where DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(addedTime);
-- 本月
SELECT fullName,addedTime FROM t_user WHERE DATE_FORMAT( addedTime, '%Y%m' ) = DATE_FORMAT( CURDATE() , '%Y%m' );
-- 上一月
SELECT fullName,addedTime FROM t_user WHERE PERIOD_DIFF( date_format( now( ) , '%Y%m' ) , date_format( addedTime, '%Y%m' ) ) =1;
-- 查询本季度数据
select fullName,addedTime FROM t_user where QUARTER(addedTime)=QUARTER(now());
-- 查询上季度数据
select fullName,addedTime FROM t_user where QUARTER(addedTime)=QUARTER(DATE_SUB(now(),interval 1 QUARTER));
-- 查询本年数据
select fullName,addedTime FROM t_user where YEAR(addedTime)=YEAR(NOW());
-- 查询上年数据
select fullName,addedTime FROM t_user where year(addedTime)=year(date_sub(now(),interval 1 year));
-- 查询距离当前现在6个月的数据
select fullName,addedTime FROM t_user where addedTime between date_sub(now(),interval 6 month) and now();

-- 查询当前这周的数据
SELECT fullName,addedTime FROM t_user WHERE YEARWEEK(date_format(addedTime,'%Y-%m-%d')) = YEARWEEK(now());
-- 查询上周的数据
SELECT fullName,addedTime FROM t_user WHERE YEARWEEK(date_format(addedTime,'%Y-%m-%d')) = YEARWEEK(now())-1;
-- 查询上个月的数据
select fullName,addedTime FROM t_user where date_format(addedTime,'%Y-%m')=date_format(DATE_SUB(curdate(), INTERVAL 1 MONTH),'%Y-%m');
-- 查询当前月份的数据
select fullName,addedTime FROM t_user where DATE_FORMAT(addedTime,'%Y%m') = DATE_FORMAT(CURDATE(),'%Y%m');
select fullName,addedTime FROM t_user where date_format(addedTime,'%Y-%m')=date_format(now(),'%Y-%m');

-- 查询指定时间段的数据
select fullName,addedTime FROM t_user where addedTime between  '2017-1-1 00:00:00'  and '2018-1-1 00:00:00';
select fullName,addedTime FROM t_user where addedTime >='2017-1-1 00:00:00'  and addedTime < '2018-1-1 00:00:00';

```

# 总结

1. 查询时间段内的数据，一般可以用 between and 或 <> 来指定时间段。
2. MySQL 的时间字段类型有：
   1. datetime，
   2. timestamp，
   3. date，
   4. time，
   5. year
3. 获取系统当前时间的函数：
   1. select CURDATE()，
   2. select NOW()
4. 获取时间差的函数：
   1. period_diff()，
   2. datediff(date1,date2)，
   3. timediff(time1,time2)
5. 日期加减函数：
   1. date_sub()，
   2. date_add()，
   3. adddate()，
   4. addtime()，
   5. period_add(P,N)
6. date_format(date, format) ，MySQL 日期格式化函数 date_format()

unix_timestamp() 
       str_to_date(str, format) 
       from_unixtime(unix_timestamp, format) ，MySQL 时间戳格式化函数from_unixtime

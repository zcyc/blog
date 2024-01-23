---
title: "LocalDateTime 写入 MySQL 自动进位问题"
author: "Charles"
description: ""
tags:
  - Java
ogImage: ""
slug: "localdatetime-mysql"
pubDatetime: 2021-09-28T08:15:29.000Z
modDatetime: 2023-04-23T05:53:14.000Z
featured: false
draft: false
---

# 首先获取今天的时间

```java
LocalDateTime date = LocalDateTime.now();
```

# 然后获取今天的最后时刻

```java
// endOfDay 使用的是 hutool 中的方法
date = LocalDateTimeUtil.endOfDay(date);
```

# 用最后时刻去查数据库，发现错误

记录这个 bug 的时间是 2021-09-27，endOfDay 最后的结果是 2021-09-27T23:59:59.999999999
但是当最最后数据库执行的时候，出现了第二天的数据，也就是 2021-09-28T00:00:00 的数据

# 排查问题，提出猜想

经过排查，发现当传入的数据超过 2021-09-27T23:59:59.999999 后就会进位到 2021-09-28T00:00:00，也就是秒后边的小数超过6位就会进1。
由此推断 MySQL 最多可以储存到微秒，不能储存纳秒。

# 验证猜想

经过测试 datetime 类型字段最多支持长度6，也就是储存到微秒。即使你字段没设置长度6，在时间比较中如果你传入的是微妙，他也不会自动进位。
但是如果你传入的是纳秒，即使你设置了长度6它也会进位。MySQL 确实只支持毫秒、微秒，不支持纳秒。

# 尝试解决问题

```java
date = LocalDateTimeUtil.endOfDay(date).withNano(999999);
```

# 发现新问题

在执行 date = LocalDateTimeUtil.endOfDay(date).withNano(999999); 之后
date 竟然是 2021-09-27T23:59:59.000999999
此时，mysql 实际执行应该是 2021-09-27T23:59:59.001000000，对于用到了毫秒的系统，这个问题就更大了。
也就是，不足9位，他会自动补0，所以要直接指定9位。

# 最终正确的写法

```java
date = LocalDateTimeUtil.endOfDay(date).withNano(999999000);
```

这样既解决了纳秒的问题，也不会导致自动补0。
网上还有其他的解法，暂时没来得及总结。

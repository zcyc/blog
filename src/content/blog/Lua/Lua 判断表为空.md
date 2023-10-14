---
title: "Lua 判断表为空"
description: "-- 必须是 next(table)==nil  -- 错误的方式 table == nil table == {}"
pubDate: "2022-06-28T17:14:46.000Z"
updatedDate: "2022-06-28T17:16:14.000Z"
heroImage: "/blog-placeholder-3.jpg"
---

```lua
-- 必须是
next(table)==nil

-- 错误的方式
table == nil
table == {}
```

---
title: "分布式唯一 ID 特性一览"
author: "Charles"
description: ""
tags:
  - Other
ogImage: ""
slug: "unique-id-compare"
pubDatetime: 2022-11-14T12:32:07.000Z
modDatetime: 2023-06-19T15:39:05.000Z
featured: false
draft: false
---

# 特性对比

本文以 Go 为例子，在默认配置下统计。
不包含美团Leaf、百度UidGenerator、滴滴TinyId的统计，这三个特性类似 Snowflake。
Sonyflake 特性类似 Snowflake，但是博主比较喜欢索尼，所以也加到表里了。

| 仓库地址                                            | 长度 | 字母表                              | 包含时间戳 | 包含机器号 | 包含随机数 | 自定义种子 | 自定义码表 | 自定义长度 | 易读性 | 美观性 | URL友好 | 排序友好 | 分表友好 | 输入友好 | 操作友好 | 可以校验 |
| --------------------------------------------------- | ---- | ----------------------------------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ------ | ------ | ------- | -------- | -------- | -------- | -------- | -------- |
| [Snowflake](https://github.com/bwmarrin/snowflake)  | 19位 | \[0-9]                              | ✔         | ✔         | <br />     | <br />     | <br />     | <br />     | ✔     | ✔     | ✔      | ✔       | ✔       | ✔       | ✔       | ✔       |
| [Sonyflake](https://github.com/sony/sonyflake)      | 18位 | \[0-9]                              | ✔         | ✔         | <br />     | <br />     | <br />     | <br />     | ✔     | ✔     | ✔      | ✔       | ✔       | ✔       | ✔       | ✔       |
| [UUID](https://github.com/gofrs/uuid)               | 36位 | \[A-Za-z0-9-]                       | <br />     | <br />     | ✔         | <br />     | <br />     | <br />     | <br /> | ✔     | <br />  | <br />   | <br />   | <br />   | <br />   | <br />   |
| [ShortUUID](https://github.com/lithammer/shortuuid) | 22位 | \[A-Za-z0-9]                        | <br />     | <br />     | ✔         | <br />     | ✔         | <br />     | ✔     | <br /> | ✔      | <br />   | <br />   | <br />   | ✔       | <br />   |
| [NanoID](https://github.com/jaevor/go-nanoid)       | 21位 | \[A-Za-z0-9\_-]                     | <br />     | <br />     | ✔         | <br />     | ✔         | ✔         | <br /> | <br /> | <br />  | <br />   | <br />   | <br />   | <br />   | <br />   |
| [ULID](https://github.com/oklog/ulid)               | 26位 | \[0123456789ABCDEFGHJKMNPQRSTVWXYZ] | ✔         | <br />     | ✔         | ✔         | <br />     | <br />     | <br /> | ✔     | ✔      | ✔       | ✔       | <br />   | ✔       | ✔       |
| [XID](https://github.com/rs/xid)                    | 20位 | \[0-9a-v]                           | ✔         | ✔         | ✔         | <br />     | <br />     | <br />     | <br /> | ✔     | ✔      | ✔       | ✔       | <br />   | ✔       | ✔       |
| [KSUID](https://github.com/segmentio/ksuid)         | 27位 | \[0-9A-Za-z]                        | ✔         | <br />     | ✔         | ✔         | <br />     | <br />     | <br /> | <br /> | ✔      | ✔       | ✔       | <br />   | ✔       | ✔       |

# 特性解释

唯一性（集群内不重复）
易读性（不包含易混淆字符）
美观性（大小写统一）
URL友好（无符号）
排序友好（基于字母表顺序）
分表友好（可提取时间戳）
输入友好（纯数字）
操作友好（电脑支持双击选中，手机支持长按选中）
安全（不暴露 MAC 地址）
保密（不暴露业务实际流水）
时间回拨可用（不依赖系统时钟）

# 测试代码

```go
package main

import (
	"fmt"
	"math/rand"
	"strconv"
	"time"

	"github.com/bwmarrin/snowflake"
	"github.com/gofrs/uuid"
	"github.com/jaevor/go-nanoid"
	"github.com/lithammer/shortuuid/v4"
	"github.com/oklog/ulid"
	"github.com/rs/xid"
	"github.com/segmentio/ksuid"
	"github.com/sony/sonyflake"
)

func main() {
	snowflakeTest()
	sonyflakeTest()
	uuidTest()
	shortuuidTest()
	nanoidTest()
	ulidTest()
	xidTest()
	ksuidTest()
}

func snowflakeTest() {
	n, _ := snowflake.NewNode(1)
	id := n.Generate().String()
	fmt.Println("snowflake:", id, "length:", len(id))
}

func sonyflakeTest() {
	t := time.Now()
	s := sonyflake.NewSonyflake(sonyflake.Settings{
		StartTime: t,
		MachineID: func() (uint16, error) {
			return 1, nil
		},
		CheckMachineID: func(u uint16) bool {
			return true
		},
	})
	id, _ := s.NextID()
	fmt.Println("sonyflake:", id, "length:", len(strconv.FormatUint(id, 10)))
}

func uuidTest() {
	id, _ := uuid.NewV4()
	fmt.Println("uuid:", id.String(), "length:", len(id.String()))
}

func shortuuidTest() {
	id := shortuuid.New()
	fmt.Println("shortUUID:", id, "length:", len(id))
	a := "12345#$%^&*67890qwerty/;'~!@uiopasdfghjklzxcvbnm,.()_+·><"
	id = shortuuid.NewWithAlphabet(a)
	fmt.Println("shortUuid2:", id, "length:", len(id))
}

func nanoidTest() {
	s, _ := nanoid.Standard(21)
	id := s()
	fmt.Println("nanoid:", id, "length:", len(id))
	c, _ := nanoid.CustomASCII("0123456789", 12)
	id = c()
	fmt.Println("nanoid2:", id, "length:", len(id))
}

func ulidTest() {
	t := time.Now().UTC()
	e := rand.New(rand.NewSource(t.UnixNano()))
	id := ulid.MustNew(ulid.Timestamp(t), e)
	fmt.Println("ulid:", id.String(), "length:", len(id.String()))
}

func xidTest() {
	id := xid.New()
	fmt.Println("xid:", id, "length:", len(id))
}

func ksuidTest() {
	id := ksuid.New()
	fmt.Println("ksuid:", id, "length:", len(id))
}
```

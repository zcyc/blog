---
title: "对比 ID 生成器"
author: "Charles"
description: ""
tags:
  - article
slug: "unique-id-compare"
pubDatetime: 2022-11-14T12:32:07.000+08:00
modDatetime: 2025-05-30T14:48:05.000+08:00
featured: false
draft: false
---

本文以 Go 为例对比当前热门的 id 生成器。由于特性与 Snowflake 相同，美团 Leaf、百度 UidGenerator、滴滴 TinyId 未列出。

---

### **对比**
1. **二进制位长**：ID原始二进制长度（位），影响全局唯一性的概率空间。
2. **文本长度**：编码后字符串长度，影响存储与传输效率。
3. **有序性（K-Sortable）**：是否按生成时间排序，对数据库索引友好性至关重要。
4. **安全性**：是否使用加密安全的随机源（如Crypto API），避免预测风险。
5. **时间嵌入**：是否包含时间戳，支持按时间范围查询。
6. **分布式友好**：是否依赖中心节点或机器ID分配，影响水平扩展复杂度。
7. **主要优点**：核心优势场景。  
8. **主要缺点**：关键限制或风险。  

| 方案          | 二进制位长 | 文本长度 | 有序性 | 安全性 | 时间嵌入 | 分布式友好 | 主要优点                     | 主要缺点                     | 
|---------------|------------|----------|--------|--------|----------|-------------|------------------------------|------------------------------|
| **Snowflake** | 64         | 19数字   | 严格递增 | 高     | 是       | 否（需机器 ID） | 高性能、严格有序、空间效率高 | 依赖时钟同步，机器ID管理复杂 |
| **Sonyflake** | 64         | 19数字   | 严格递增 | 高     | 是       | 否（需机器 ID） | 改进时钟回拨处理             | 生态支持较少                 |
| **UUIDv4**    | 128        | 36字符   | 无序   | 高     | 否       | 是           | 全局唯一、无协调             | 存储开销大，索引效率低       |
| **UUIDv7**    | 128        | 36字符   | 趋势递增 | 高     | 是       | 是           | 时间有序、IETF标准           | 文本较长                     |
| **ShortUUID** | 128        | 22字符   | 无序   | 高     | 否       | 是           | 压缩UUID，减少存储           | 仍无序，兼容性风险           |
| **NanoID**    | 126        | 21字符   | 无序   | 高     | 否       | 是           | 极短、生成快（比UUID快60%）  | 无序，不适合时序场景         |
| **ULID**      | 128        | 26字符   | 趋势递增 | 高     | 是       | 是           | 可排序、Base32无混淆字符     | 毫秒精度，高并发可能碰撞     |
| **KSUID**     | 160        | 27字符   | 趋势递增 | 高     | 是       | 是           | 时间精度高（秒级）、Base62紧凑| 位长较大                   |
| **XID**       | 96         | 24字符   | 趋势递增 | 中     | 是       | 是           | MongoDB原生支持，生成快      | 随机性弱于UUID               |
| **Sqids**     | 可变       | <10字符  | 无序   | 低     | 否       | 是           | 极短、人类可读               | 非全局唯一，需上下文         |

说明：
- 有序性：  
	- 严格递增：同毫秒内通过序列号保序（如 Snowflake）。  
	- 趋势递增：仅时间戳部分有序，同毫秒内随机（如 UUIDv7）。  
- 安全性：高 = 使用`Crypto API`；中 = 混合随机源；低 = `Math.random()`。  
- 分布式友好：是=无需中心协调，否=需机器 ID 或时钟同步。  
- 文本长度：基于默认编码（如 UUIDv4 为 Hex，NanoID 为 Base64）。

---

### **总结**
- **需要严格时序与高性能**：选 **Snowflake/Sonyflake**。  
- **全局唯一且无需协调**：**UUIDv7** 或 **ULID/KSUID**。  
- **紧凑性与速度优先**：**NanoID** 或 **ShortUUID**。  
- **人类可读短ID**：**Sqids**。  
- **关键趋势**：UUIDv7 和 ULID 因平衡时序性、分布式友好及标准化，成为现代系统的新推荐，而 NanoID 在轻量级场景持续流行。

### 测试代码

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
    "github.com/sqids/sqids-go"

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

func sqidsTest() {
	s, _ := sqids.New()
	id, _ := s.Encode([]uint64{1, 2, 3})
        fmt.Println("sqids:", id, "length:", len(id))
        s, _ := sqids.New(sqids.Options{
		MinLength: 10,
	})
	id, _ := s.Encode([]uint64{1, 2, 3})
        fmt.Println("sqids2:", id, "length:", len(id))
	numbers := s.Decode(id)
        fmt.Println("sqids numbers:", numbers)
}
```

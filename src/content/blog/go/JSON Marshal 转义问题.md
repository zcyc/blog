---
title: "JSON Marshal 转义问题"
author: "Charles"
description: ""
tags:
  - go
ogImage: ""
slug: "json-marshal"
pubDatetime: 2023-01-09T07:20:43.000+08:00
modDatetime: 2023-01-09T07:22:23.000+08:00
featured: false
draft: false
---

# 转义

```go
func main() {
	testMap := map[string]string{
		"demo": `https://xxx.xxx.com?a=1&b=2`,
	}
	bytes, err := json.Marshal(testMap)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(bytes))
}

// 输出：{"demo":"https://xxx.xxx.com?a=1\u0026b=2"}
```

# 不转义

```go
func main() {
	testMap := map[string]string{
		"demo": `https://xxx.xxx.com?a=1&b=2`,
	}
	byteBuf := bytes.NewBuffer([]byte{})
	encoder := json.NewEncoder(byteBuf)
	encoder.SetEscapeHTML(false)
	err := encoder.Encode(testMap)
	if err != nil {
		panic(err)
	}
	fmt.Println(byteBuf.String())
}

// 输出：{"demo":"https://xxx.xxx.com?a=1&b=2"}
```

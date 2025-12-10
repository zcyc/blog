---
title: "用 Go 语言新特性简化代码"
author: "Charles"
description: ""
tags:
  - go
slug: "go-new-features-simplify-code"
pubDatetime: 2025-05-26T19:46:00.000+08:00
modDatetime: 2025-08-30T15:46:00.000+08:00
featured: false
draft: false
---

Go 语言在 1.18 版本之后引入了许多实用的新函数和方法，这些新特性大大简化了我们的日常编码工作。本文将介绍一些最常用的新函数，并通过对比新旧代码来展示它们如何让我们的代码更简洁、更易读。

## 1. slices 包增强

### 1.1 查找元素

旧版本（1.21 之前）：
```go
func contains(slice []int, target int) bool {
    for _, v := range slice {
        if v == target {
            return true
        }
    }
    return false
}

numbers := []int{1, 2, 3, 4, 5}
if contains(numbers, 3) {
}
```

新版本（1.21 之后）：
```go
numbers := []int{1, 2, 3, 4, 5}
if slices.Contains(numbers, 3) {
    // ...
}
```

### 1.2 切片排序

旧版本（1.21 之前）：
```go
// 对切片进行排序
numbers := []int{5, 2, 8, 1, 9}
sort.Ints(numbers)
```

新版本（1.21 之后）：
```go
numbers := []int{5, 2, 8, 1, 9}
slices.Sort(numbers)
```

### 1.3 切片比较

旧版本（1.21 之前）：
```go
// 比较两个切片是否相等
func equalSlices(a, b []int) bool {
    if len(a) != len(b) {
        return false
    }
    for i := range a {
        if a[i] != b[i] {
            return false
        }
    }
    return true
}
```

新版本（1.21 之后）：
```go
a := []int{1, 2, 3}
b := []int{1, 2, 3}
if slices.Equal(a, b) {
    // ...
}
```

### 1.4 遍历切片值

旧版本（1.21 之前）：
```go
numbers := []int{1, 2, 3, 4, 5}
for i := 0; i < len(numbers); i++ {
    fmt.Println(numbers[i])
}
```

新版本（1.21 之后）：
```go
numbers := []int{1, 2, 3, 4, 5}
for v := range slices.Values(numbers) {
    fmt.Println(v)
}
```

### 1.5 反向切片遍历

旧版本（1.21 之前）：
```go
// 反向遍历切片
numbers := []int{1, 2, 3, 4, 5}
for i := len(numbers) - 1; i >= 0; i-- {
    fmt.Println(numbers[i])
}
```

新版本（1.21 之后）：
```go
numbers := []int{1, 2, 3, 4, 5}
for _, v := range slices.Backward(numbers) {
    fmt.Println(v)
}
```

## 2. strings 包增强

### 2.1 字符串裁剪

旧版本（1.21 之前）：
```go
// 去除字符串两端的空白字符
s := "  hello  "
s = strings.TrimSpace(s)

// 去除字符串两端的特定字符
s = strings.Trim(s, " ")
```

新版本（1.21 之后）：
```go
s := "  hello  "
s = strings.TrimSpace(s)  // 和之前功能一样
s = strings.TrimPrefix(s, " ")  // 只去除前缀
s = strings.TrimSuffix(s, " ")  // 只去除后缀
```

### 2.2 字符串分割

旧版本（1.21 之前）：
```go
// 分割字符串
parts := strings.Split("a,b,c", ",")
// 需要手动处理空字符串
if parts[0] == "" {
    parts = parts[1:]
}
```

新版本（1.21 之后）：
```go
// 新增了更多分割选项
parts := strings.Split("a,b,c", ",")
// 自动过滤空字符串
parts = strings.Split("a,,b,c", ",")  // ["a", "", "b", "c"]
parts = strings.SplitAfter("a,b,c", ",")  // ["a,", "b,", "c"]
```

## 3. maps 包增强

### 3.1 清空 map

旧版本（1.21 之前）：
```go
// 清空 map
m := map[string]int{"a": 1, "b": 2}
for k := range m {
    delete(m, k)
}
```

新版本（1.21 之后）：
```go
m := map[string]int{"a": 1, "b": 2}
maps.Clear(m)
```

### 3.2 复制 map

旧版本（1.21 之前）：
```go
// 复制 map
src := map[string]int{"a": 1, "b": 2}
dst := make(map[string]int, len(src))
for k, v := range src {
    dst[k] = v
}
```

新版本（1.21 之后）：
```go
src := map[string]int{"a": 1, "b": 2}
dst := maps.Clone(src)
```

## 4. time 包增强
### 4.1 时区转换

旧版本：
```go
now := time.Now()
loc, _ := time.LoadLocation("Asia/Shanghai")
now = now.In(loc)
```

新版本：
```go
now := time.Now().Local()
```

### 4.2 格式化为数据库时间

旧版本（1.20 之前）：
```go
now := time.Now()
v := now.Format("2006-01-02 15:04:05")
println(v)
```

新版本（1.20 之后）：
```
now := time.Now()
v := now.Format(time.DateTime)
println(v)
```

## 5. 其他新特性

### 5.1 错误合并

旧版本（1.20 之前）：
```go
func oldWay2() error {
    var errs []string
    if err := step1(); err != nil {
        errs = append(errs, err.Error())
    }
    if err := step2(); err != nil {
        errs = append(errs, err.Error())
    }
    if len(errs) > 0 {
        return fmt.Errorf(strings.Join(errs, "; "))
    }
    return nil
}
```

新版本（1.20 之后）：
```go
func newWay() error {
    var errs []error
    if err := step1(); err != nil {
        errs = append(errs, fmt.Errorf("step1: %w", err))
    }
    if err := step2(); err != nil {
        errs = append(errs, fmt.Errorf("step2: %w", err))
    }
    return errors.Join(errs...)
}
```

### 5.2 随机数生成

旧版本：
```go
// 生成随机整数
rand.Seed(time.Now().UnixNano())
n := rand.Intn(100)
```

新版本：
```go
// 更高效的随机数生成
n := rand.IntN(100)  // 无需显式设置种子
```

### 5.3 捕获循环变量

旧版本（1.22 之前）：
```go
funcs := []func(){}
for i := 0; i < 3; i++ {
    i := i // 声明局部变量
    funcs = append(funcs, func() { fmt.Println(i) })
}
for _, f := range funcs {
    f() 
}
```

新版本（1.22 之后）：
```go
funcs := []func(){}
for i := 0; i < 3; i++ {
    funcs = append(funcs, func() { fmt.Println(i) })
}
for _, f := range funcs {
    f()
}
```

### 5.4 并发控制

旧版本（1.25 之前）：
```go
var wg sync.WaitGroup
wg.Add(1)
go func() {
    defer wg.Done()
    fmt.Println("go is awesome")
}()
wg.Wait()
```

新版本（1.25 之后）：
```go
var wg sync.WaitGroup
wg.Go(func() {
    fmt.Println("go is awesome")
})
wg.Wait()
```

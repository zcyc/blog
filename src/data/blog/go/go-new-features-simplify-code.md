---
title: "用 Go 语言新特性简化代码"
author: "Charles"
description: "介绍 Go 1.18 及以后版本引入的实用新特性，通过新旧代码对比展示如何让代码更简洁易读。"
tags:
  - go
slug: "go-new-features-simplify-code"
pubDatetime: 2025-05-26T19:46:00.000+08:00
modDatetime: 2025-12-27T16:18:00.000+08:00
featured: false
draft: false
---

Go 语言从 1.18 版本（泛型）开始，陆续引入了许多实用函数和方法，大幅简化了常见操作。本文挑选一些高频使用的特性，通过新旧代码对比进行说明。

## 1. slices 相关

### 1.1 查找元素

1.21 之前：
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
    // ...
}
```

1.21 之后：
```go
numbers := []int{1, 2, 3, 4, 5}
if slices.Contains(numbers, 3) {
    // ...
}
```

### 1.2 切片排序

1.21 之前：
```go
numbers := []int{5, 2, 8, 1, 9}
sort.Ints(numbers)
```

1.21 之后：
```go
numbers := []int{5, 2, 8, 1, 9}
slices.Sort(numbers)
```

### 1.3 切片比较

1.21 之前：
```go
a := []int{1, 2, 3}
b := []int{1, 2, 3}

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

if equalSlices(a, b) {
    // ...
}
```

1.21 之后：
```go
a := []int{1, 2, 3}
b := []int{1, 2, 3}
if slices.Equal(a, b) {
    // ...
}
```

### 1.4 遍历切片值

1.21 之前：
```go
numbers := []int{1, 2, 3, 4, 5}
for i := 0; i < len(numbers); i++ {
    // ...
}
```

1.21 之后：
```go
numbers := []int{1, 2, 3, 4, 5}
for v := range slices.Values(numbers) {
    // ...
}
```

### 1.5 反向切片遍历

1.21 之前：
```go
numbers := []int{1, 2, 3, 4, 5}
for i := len(numbers) - 1; i >= 0; i-- {
     // ...
}
```

1.21 之后：
```go
numbers := []int{1, 2, 3, 4, 5}
for _, v := range slices.Backward(numbers) {
    // ...
}
```

## 2. strings 相关

### 2.1 字符串裁剪

1.21 之前：
```go
s := "  hello  "
s = strings.TrimSpace(s) // 去除字符串两端的空白字符
s = strings.Trim(s, " ") // 去除字符串两端的特定字符
```

1.21 之后：
```go
s := "  hello  "
s = strings.TrimPrefix(s, " ")  // 去除特定字符前缀
s = strings.TrimSuffix(s, " ")  // 去除特定字符后缀
```

## 3. maps 相关

### 3.1 清空 map

1.21 之前：
```go
m := map[string]int{"a": 1, "b": 2}
for k := range m {
    delete(m, k)
}
```

1.21 之后：
```go
m := map[string]int{"a": 1, "b": 2}
maps.Clear(m)
```

### 3.2 复制 map

1.21 之前：
```go
src := map[string]int{"a": 1, "b": 2}
dst := make(map[string]int, len(src))
for k, v := range src {
    dst[k] = v
}
```

1.21 之后：
```go
src := map[string]int{"a": 1, "b": 2}
dst := maps.Clone(src)
```

## 4. time 相关

### 4.1 使用常量格式化日期时间

1.20 之前：
```go
now := time.Now()
v := now.Format("2006-01-02 15:04:05")
```

1.20 之后：
```go
v := now.Format(time.DateTime)
```


### 5. errors 相关

### 5.1 错误合并

1.20 之前：
```go
func oldWay() error {
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

1.20 之后：
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

### 5.2 错误类型断言

1.26 之前：
```go
func handleNetworkError(err error) {
    var opErr *net.OpError
    var dnsErr *net.DNSError

    if errors.As(err, &opErr) {
        // ...
    } else if errors.As(err, &dnsErr) {
        // ...
    } else {
        // ...
    }
}
```

1.26 之后：
```go
func handleNetworkError(err error) {
    if opErr, ok := errors.AsType[*net.OpError](err "*net.OpError"); ok {
        // ...
    } else if dnsErr, ok := errors.AsType[*net.DNSError](err "*net.DNSError"); ok {
        // ...
    } else {
        // ...
    }
}
```


## 6. 其他

### 6.1 自定义泛型三元运算函数
1.18 之后：
```go
func Ter[T any](cond bool, a, b T "T any") T {
  if cond {
    return a
  }
  return b
}

func main() {
  fmt.Println(Ter(true, 1, 2))
  fmt.Println(Ter(false, 1, 2))
```

### 6.2 随机数生成

1.22 之前：
```go
rand.Seed(time.Now().UnixNano())
n := rand.Intn(100)
```

1.22 之后：
```go
n := rand.IntN(100)
```

### 6.3 捕获循环变量

1.22 之前：
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

1.22 之后：
```go
funcs := []func(){}
for i := 0; i < 3; i++ {
    funcs = append(funcs, func() { fmt.Println(i) })
}
for _, f := range funcs {
    f()
}
```

### 6.4 并发控制

1.25 之前：
```go
var wg sync.WaitGroup
wg.Add(1)
go func() {
    defer wg.Done()
    // ...
}()
wg.Wait()
```

1.25 之后：
```go
var wg sync.WaitGroup
wg.Go(func() {
    // ...
})
wg.Wait()
```

### 6.5 获取指针

1.26 之前：
```go
// 基本类型
n := 42
p1 := &n

s := "go"
p2 := &s

// 复合类型
s := []int{11, 12, 13}
p1 := &s

type Person struct{ name string }
p2 := &Person{name: "alice"}

// 函数返回值
f := func() string { return "go" }
v := f()
p := &v
```

1.26 之后：
```go
// 基本类型
p1 := new(42)
p2 := new("go")

// 复合类型
p1 := new([]int{11, 12, 13})

type Person struct{ name string }
p2 := new(Person{name: "alice"})

// 函数返回值
f := func() string { return "go" }
p := new(f())
```


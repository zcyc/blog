---
title: "Go 语言学习笔记"
author: "Charles"
description: ""
tags:
  - Go
ogImage: ""
slug: "go-notes"
pubDatetime: 2021-12-16T09:14:59.000Z
modDatetime: 2022-02-08T11:23:14.000Z
featured: false
draft: false
---

## 编译器

可以直接执行 go run main.go
也可以 go build main.go && ./main

## package 的作用

和 Java 中的包不同，和 C# 中的包也不同，是一种命名空间的概念，类似 C# 和 PHP 中的 namespace 作用。
归属于同一个包的代码包声明语句要一致，即同一级目录的源文件必须属于同一个包。
在同一个包下不同的不同文件中不能重复声明同一个变量、函数和类。

### 注意

main package 下如果有多个文件，
启动文件引用 main 包其他文件中的变量和方法是报错的，
因为同一个包下不需要 import，但是这个文件启动时候对同一个包下的文件没有引用关系，所以是不会一起编译的。

```yaml
# 同时编译启动文件和 main 包下要引用的文件
go run main.go Person.go

# 或者这样
go run *.go
```

## main 和 init

init 函数可在package main中，可在其他package中，可在同一个package中出现多次，一个文件中也可以写多个，但是太难维护了。
main 函数只能在 package main中，也只能有一个。
程序必然有一个 main 包，也必然有一个 main 方法。
文件中既有 init 又有 main 的时候，init 先于 main 执行，Uber 手册不建议使用 init。

## 可见性

无论是变量、函数还是类属性及方法，它们的可见性都是与包相关联的。
属性和方法的可见性根据其首字母大小写来决定，如果属性名或方法名首字母大写，则可以在其他包中直接访问这些属性和方法，否则只能在包内访问。
所以 Go 语言中的可见性都是包一级的，而不是类一级或者文件一级的。

## 注释

```go
// 这是行注释

/*
这是块注释
*/
```

## 代码块

```go
package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "root:toor@tcp(localhost:3306)/dev?tls=skip-verify&autocommit=true")
	if err != nil {
		log.Fatal(err)
	}
	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}

    { // 这里的代码是单独的一块，可以用 {} 括起来。如果不需要新建函数，用 {} 括起来能保证代码的可读性。
		query := `
			CREATE TABLE IF NOT EXISTS users (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(45) NOT NULL COMMENT '用户名',
                password VARCHAR(45) NOT NULL COMMENT '密码',
                status INT NOT NULL DEFAULT 0 COMMENT '0:有效帐户 1:无效帐户',
                PRIMARY KEY (id),
                UNIQUE INDEX idx_user_01 (name ASC))
                ENGINE = InnoDB
                DEFAULT CHARACTER SET = utf8
                COMMENT = '用户表'`

		if _, err := db.Exec(query); err != nil {
			log.Fatal(err)
		}
	}
}

```

## 导入

### 导入单个包

```go
import "包的名称或者地址"
```

### 导入多个包和包的别名

```go
import (
    "A包的名称或者地址"
    "B包的名称或者地址"
    C "C包的名称或者地址" 给包取别名，Uber 手册不建议给包取别名
    D "C包的名称或者地址" 可以导入两个相同的包，但是取不同的别名
    _ "包的名称或者地址"  只执行包的 init 方法，而不导入包
)
```

## 变量和常量

const 用来声明常量
:= 海象符不能用于全局变量，只能用于局部变量
var 用来声明变量

### 声明

```go
import "fmt"

func main() {
    const (
        Unknown = 0
        Female = 1
        Male = 2
	)
   const LENGTH int = 10
   const WIDTH int = 5
   var area int
   const a, b, c = 1, false, "str" //多重赋值

   area = LENGTH * WIDTH
   fmt.Printf("面积为 : %d", area)
   println()
   println(a, b, c)

  // 声明一个变量并初始化
   var a = "RUNOOB"
   fmt.Println(a)

  // 没有初始化就为零值
   var b int
   fmt.Println(b)

  // bool 零值为 false
   var c bool
   fmt.Println(c)
}

/*
面积为 : 50
1 false str
RUNOOB
0
false
*/
```

### 多重赋值

```go
package main

func main() {
	// var 内多重赋值
	var (
		a = 1
		b = 2
	)

	// 行内多重赋值
	var c, d = 1, 2

	// 交换两个变量
	a, b = b, a

	println(a, b, c, d)
}
```

### 零值

类型 零值
int, int8, int16, int32, int64 0
uint, uint8, uint16, uint32, uint64 0
uintptr 0
float32, float64 0.0
byte 0
rune 0
string "" (empty string)
complex64, complex128 (0,0i)
arrays of non-nillable types array of zero-values
arrays of nillable types array of nil-values

### 空值

nil 不是关键字或保留字，你甚至可以声明一个 nil 变量
nil 是 map、slice、pointer、channel、func、interface 的零值
不同类型 nil 的指针是一样的，不同类型的 nil 值占用的内存大小可能是不一样的
不同类型的 nil 是不能比较的，两个相同类型的 nil 值也可能无法比较，nil 标识符是不能比较的( nil == nil )直接报错，因为 nil 不是 go 的关键字

### 零值是空值(nil)的类型

```go
var a *int
var a []int
var a map[string] int
var a chan int
var a func(string) int
var a error
```

### string 和 strings

string 可以用下标取值，但是不能用下标修改值，只能给整个字符串赋值。
strings 包含的方法如下：

- 字符串长度；
- 求子串；
- 是否存在某个字符或子串；
- 子串出现的次数（字符串匹配）；
- 字符串分割（切分）为\[]string；
- 字符串是否有某个前缀或后缀；
- 字符或子串在字符串中首次出现的位置或最后一次出现的位置；
- 通过某个字符串将\[]string 连接起来；
- 字符串重复几次；
- 字符串中子串替换；
- 大小写转换；
- Trim 操作；

### 全局变量和局部变量重名

如果全局变量和局部变量重名，将使用局部变量

## panic 和 recover

panic 能够改变程序的控制流，调用 panic 后会立刻停止执行当前函数的剩余代码，并在当前 Goroutine 中递归执行调用方的 defer。
recover 可以中止 panic 造成的程序崩溃。它是一个只能在 defer 中发挥作用的函数，在其他作用域中调用不会发挥作用。

```go
func main() {
	defer println("in main")
	go func() {
		defer println("in goroutine")
		panic("")
	}()

	time.Sleep(1 * time.Second)
}

/*
in goroutine
panic:...
*/
// 当我们运行这段代码时会发现 main 函数中的 defer 语句并没有执行，执行的只有当前 Goroutine 中的 defer。
```

recover 还不是很了解，需要后期继续学习

### 用闭包垃圾来防止 panic

```go
import (
	"net/http"
)

func safeHandler(fn http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err, ok := recover().(error); ok {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				// 或者自定义错误
				//w.WriteHeader(http.StatusInternalServerError)
				//renderHtml(w,"error",e)
				//loging
			}
		}()
		fn(w, r)
	}
}
```

## 错误处理

```go
import (
    "fmt"
)

// 定义一个 DivideError 结构
type DivideError struct {
    dividee int
    divider int
}

// 实现 `error` 接口
func (de *DivideError) Error() string {
    strFormat := `
    Cannot proceed, the divider is zero.
    dividee: %d
    divider: 0
`
    return fmt.Sprintf(strFormat, de.dividee)
}

// 定义 `int` 类型除法运算的函数
func Divide(varDividee int, varDivider int) (result int, errorMsg string) {
    if varDivider == 0 {
            dData := DivideError{
                    dividee: varDividee,
                    divider: varDivider,
            }
            errorMsg = dData.Error()
            return
    } else {
            return varDividee / varDivider, ""
    }

}

func main() {

    // 正常情况
    if result, errorMsg := Divide(100, 10); errorMsg == "" {
            fmt.Println("100/10 = ", result)
    }
    // 当除数为零的时候会返回错误信息
    if _, errorMsg := Divide(100, 0); errorMsg != "" {
            fmt.Println("errorMsg is: ", errorMsg)
    }

}

/* 输出
    100/10 =  10
    errorMsg is:
        Cannot proceed, the divider is zero.
        dividee: 100
        divider: 0
*/
```

## 对象的创建和初始化

```go
type Rect struct {
	x, y          float64
	width, height float64
}

func (r *Rect) Area() float64 {
	return r.width * r.height
}

func NewRect(x, y, width, height float64) *Rect {
	return &Rect{x, y, width, height}
}

func main() {
	rect1 := new(Rect)
	println(rect1)
	rect2 := &Rect{}
	println(rect2)
	rect3 := &Rect{0, 0, 100, 200}
	println(rect3)
	rect4 := &Rect{width: 100, height: 200}
	println(rect4)
}

```

## 面向对象-类方法

```go
type Interger int

var a Interger = 1

func (a Interger) Less(b Interger) bool {
	return a < b
}
func Interger_Less(a Interger, b Interger) bool {
	return a < b
}
func main() {
	println(a.Less(2))
	println(Interger_Less(a, 2))
}

```

## 面向对象-继承

```go
type Base struct {
	Name string
}

func (base *Base) Foo() {}
func (base *Base) Bar() {}

type Foo struct {
	// 这里其实就是把上边的 Base 结构体放到了 Foo 结构中，形成了一个组合，同时 Foo 就继承了 Base 中的属性和方法
	Base
}

func (foo *Foo) Bar() {
	foo.Base.Bar()
}

/*
	上边的foo.Foo() 和 foo.Base.Foo() 效果一致
*/

type Bar struct {
	// 这里其实就是把上边的 Base 结构体的 指针 放到了 Foo 结构中，形成了一个组合，初始化 Bar 的时候要传入一个 Base 的指针才行，同时 Bar 就继承了 Base 中的属性和方法
	*Base
}

func main() {
	foo := &Foo{}
	foo.Foo()
	foo.Bar()

	bar := &Bar{}
	bar.Foo()
	bar.Bar()
}
```

## 接口

### 接口的继承关系

只要实现了一个接口的全部方法就是继承了这个接口，不需要显式的声明继承关系。

```go
type IFile interface {
	Read(buf []byte) (n int, err error)
	Write(buf []byte) (n int, err error)
	Seek(off int64, whence int) (pos int64, err error)
	Close() error
}

type IReader interface {
	Read(buf []byte) (n int, err error)
}

type IWriter interface {
	Write(buf []byte) (n int, err error)
}

type ICloser interface {
	Close() error
}

type File struct {
	// ...
}

func (f File) Read(buf []byte) (n int, err error) {
	return 0, nil
}
func (f File) Write(buf []byte) (n int, err error) {
	return 0, nil
}
func (f File) Seek(off int64, whence int) (pos int64, err error) {
	return 0, nil
}
func (f File) Close() error {
	return nil
}

//尽管File类并没有从这些接口继承，甚至可以不知道这些接口的存在，但是File类实现了  这些接口，可以进行赋值:
var file1 IFile = new(File)
var file2 IReader = new(File)
var file3 IWriter = new(File)
var file4 ICloser = new(File)

```

### 相同的接口

如果两个不同包中的接口方法列表完全相同（不管顺序），那这两个接口也相同，一个结构实现了其中一个接口就同时实现了另一个接口

### 接口的赋值

1、将对象实例赋值给接口。
2、将一个接口赋值给另一个接口。
方法完全相同的接口可以互相赋值。
如果接口A方法列表是接口B方法列表的子集，那么A也可以赋值给B。

### 查询接口的类型

```go
// 检查file1接口指向的对象实例是否实现了two.IStream接口
var file1 Writer = ...
if file5, ok := file1.(two.IStream); ok {
    ...
}

// 询问接口它指向的对象是否是某个类型
var file1 Writer = ...
if file6, ok := file1.(*File); ok { //这个if语句判断file1接口指向的对象实例是否是*File类型
    ...
}

// 询问接口指向的对象实例的类型
var v1 interface{} = ...
switch v := v1.(type) {
     case int: // 现在v的类型是int
     case string: // 现在v的类型是string
     ...
}
```

### 通过组合多个接口来创建接口

```go
import "fmt"

// 接口中可以组合其它接口，这种方式等效于在接口中添加其它接口的方法
type Reader interface {
	read()
}
type Writer interface {
	write()
}

// 定义上述两个接口的实现类
type MyReadWrite struct{}

func (mrw *MyReadWrite) read() {
	fmt.Println("MyReadWrite...read")
}

func (mrw *MyReadWrite) write() {
	fmt.Println("MyReadWrite...write")
}

// 定义一个接口，组合了上述两个接口
type ReadWriter interface {
	Reader
	Writer
}

// 上述接口等价于：
type ReadWriterV2 interface {
	read()
	write()
}

// ReadWriter和ReadWriterV2两个接口是等效的，因此可以相互赋值
func interfaceTest0104() {
	mrw := &MyReadWrite{}
	// mrw对象实现了read()方法和write()方法，因此可以赋值给ReadWriter和ReadWriterV2
	var rw1 ReadWriter = mrw
	rw1.read()
	rw1.write()

	fmt.Println("------")
	var rw2 ReadWriterV2 = mrw
	rw2.read()
	rw2.write()

	// 同时，ReadWriter和ReadWriterV2两个接口对象可以相互赋值
	rw1 = rw2
	rw2 = rw1
}
```

### Any 类型

由于Go语言中任何对象实例都满足空接口interface{}，所以interface{}看起来像是可以指向任何对象的Any类型，如下：

```go
var v1 interface{} = 1 // 将int类型赋值给interface{}
var v2 interface{} = "abc" // 将string类型赋值给interface{}
var v3 interface{} = &v2 // 将*interface{}类型赋值给interface{}
var v4 interface{} = struct{ X int }{1}
var v5 interface{} = &struct{ X int }{1}
```

## 值传递和引用传递

所有函数传入的变量都是值，所以如果你要修改传入的值，需要传指针过来
var a =\[3]int{1,2,3}
var b = a 值传递，此时 b 的类型是\[3]int
var b = \&a 引用传递，此时 b 的类型是\*\[3]int

### 值传递

```go
type user struct {
    id int
    name string
}

func passByValue(_u user){
    _u.id++
    _u.name="jack"

    // when printing structs, the plus flag (%+v) adds field names
    fmt.Printf("_u 值：%+v;地址：%p; \n",_u,&_u)
}

func exp2(){
    u:=user{1,"peter"}
    fmt.Printf("原始 u 值：%+v; 地址: %p;\n",u,&u)
    passByValue(u)
    fmt.Printf("执行完函数后 u 值：%+v; 地址: %p;\n",u,&u)
}

/*
结果说明：
_u 是 u 的一份拷贝，地址不同
函数内对参数的改变不影响原始的对象
*/
```

### 引用传递

```go
type user struct {
    id int
    name string
}

func passByPointer(_u *user){
    _u.id++
    _u.name="jack"
    fmt.Printf("_u 值：%+v ;u指向的地址：%p; u本身存放地址：%p; \n",*_u,_u,&_u)
}

func exp3(){
    u:=&user{1,"peter"}
    fmt.Printf("原始u 值：%+v; 指向的地址: %p;u本身存放地址: %p; \n",*u,u,&u)
    passByPointer(u)
    fmt.Printf("原始u 值：%+v; 指向的地址: %p;u本身存放地址: %p; \n",*u,u,&u)
}

/*
注意到，虽然参数 _u 仍然是 u 的一份拷贝对象，但是原始对象的值还是改变了。可以这么理解，因为 u 指针和 _u 指针都指向同一个对象，即 0xc0000484a0 地址上存放的对象，_u.name="jack"可以看做*(_u).name="jack，即取值后再改变值。
*/
```

### 其他情况和使用指南

<https://segmentfault.com/a/1190000018538664>

## for 循环

for init; condition; post { } // go 语言 for 循环的条件不需要小括号，init 可以用多重赋值初始化多个变量
for condition { } // 用 range 来便利整个数组，range 默认返回 index 和 value，字符串遍历不用 range 则遍历字节码
for { } // for 循环可以不写条件当作死循环用

### break 和 continue

go 的 break 和 continue 除了像其他语言一样使用，可以跳到标记处，使用方式如下：

```go
import "fmt"

func main() {

    // 不使用标记
    fmt.Println("---- continue ---- ")
    for i := 1; i <= 3; i++ {
        fmt.Printf("i: %d\n", i)
            for i2 := 11; i2 <= 13; i2++ {
                fmt.Printf("i2: %d\n", i2)
                continue
            }
    }

    // 使用标记
    fmt.Println("---- continue label ----")
    re:
        for i := 1; i <= 3; i++ {
            fmt.Printf("i: %d\n", i)
                for i2 := 11; i2 <= 13; i2++ {
                    fmt.Printf("i2: %d\n", i2)
                    continue re
                }
        }
}
/*
---- continue ----
i: 1
i2: 11
i2: 12
i2: 13
i: 2
i2: 11
i2: 12
i2: 13
i: 3
i2: 11
i2: 12
i2: 13
---- continue label ----
i: 1
i2: 11
i: 2
i2: 11
i: 3
i2: 11
*/
```

## switch...case...

默认只进入一个分支，不需要 break

```go
switch var1 {
    case val1:
        //...
    case val2:
        //...
    default:
        //...
}
```

### 不写 switch 的条件直接开始 case

```go
import "fmt"

func main() {
   /* 定义局部变量 */
   var grade string = "B"
   var marks int = 90

   switch marks {
      case 90: grade = "A"
      case 80: grade = "B"
      case 50,60,70 : grade = "C"
      default: grade = "D"
   }

   switch {
      case grade == "A" :
         fmt.Printf("优秀!\n" )
      case grade == "B", grade == "C" :
         fmt.Printf("良好\n" )
      case grade == "D" :
         fmt.Printf("及格\n" )
      case grade == "F":
         fmt.Printf("不及格\n" )
      default:
         fmt.Printf("差\n" );
   }
   fmt.Printf("你的等级是 %s\n", grade );
}
```

### 判断 interface{} 类型

```go
import "fmt"

func main() {
   var x interface{}

   switch i := x.(type) {
      case nil:
         fmt.Printf(" x 的类型 :%T",i)
      case int:
         fmt.Printf("x 是 int 型")
      case float64:
         fmt.Printf("x 是 float64 型")
      case func(int) float64:
         fmt.Printf("x 是 func(int) 型")
      case bool, string:
         fmt.Printf("x 是 bool 或 string 型" )
      default:
         fmt.Printf("未知型")
   }
}
```

### allthrought 声明

```go
import "fmt"

func main() {

    switch {
    case false:
            fmt.Println("1、case 条件语句为 false")
            fallthrough
    case true:
            fmt.Println("2、case 条件语句为 true")
            fallthrough
    case false:
            fmt.Println("3、case 条件语句为 false")
            fallthrough
    case true:
            fmt.Println("4、case 条件语句为 true")
    case false:
            fmt.Println("5、case 条件语句为 false")
            fallthrough
    default:
            fmt.Println("6、默认 case")
    }
}
```

## 函数

func function_name( \[parameter list] ) \[return_types] { 函数体 }

```go
import "fmt"

func main() {
   /* 定义局部变量 */
   var a int = 100
   var b int = 200
   var ret int

   /* 调用函数并返回最大值 */
   ret = max(a, b)

   fmt.Printf( "最大值是 : %d\n", ret )
}

/* 函数返回两个数的最大值 */
func max(num1, num2 int) int {
   /* 定义局部变量 */
   var result int

   if (num1 > num2) {
      result = num1
   } else {
      result = num2
   }
   return result
}
```

### 可变参数

```go
func myfunc(args ...int) {
    for _, arg := range args {
        fmt.Println(arg)
    }
}
```

终极指南看 <https://studygolang.com/articles/11965>

### 多返回值

python，lua 也可以

```go
import "fmt"

func swap(x, y string) (string, string) {
   return y, x
}

func main() {
   a, b := swap("Google", "Runoob")
   fmt.Println(a, b)
}
```

## 匿名函数

### 创建一个匿名函数并赋值给变量

```go
// 将匿名函数体保存到f()中
f := func(data int) {
    fmt.Println("hello", data)
}
// 使用f()调用
f(100)
```

### 创建一个匿名函数并传入参数执行

```go
func(data int) {
    fmt.Println("hello", data)
}(100)
```

### 用作回调

```go
import (
    "fmt"
)
// 遍历切片的每个元素, 通过给定函数进行元素访问
func visit(list []int, f func(int)) {
    for _, v := range list {
        f(v)
    }
}
func main() {
    // 使用匿名函数打印切片内容
    visit([]int{1, 2, 3, 4}, func(v int) {
        fmt.Println(v)
    })
}
```

### 实现操作封装

```go
import (
    "flag"
    "fmt"
)
var skillParam = flag.String("skill", "", "skill to perform")
func main() {
    flag.Parse()
    var skill = map[string]func(){
        "fire": func() {
            fmt.Println("chicken fire")
        },
        "run": func() {
            fmt.Println("soldier run")
        },
        "fly": func() {
            fmt.Println("angel fly")
        },
    }
    if f, ok := skill[*skillParam]; ok {
        f()
    } else {
        fmt.Println("skill not found")
    }
}
```

## 闭包

详细介绍 <http://c.biancheng.net/view/59.html>

```go
// 以下实例中，我们创建了函数 getSequence() ，返回另外一个函数。该函数的目的是在闭包中递增 i 变量。

import "fmt"

func getSequence() func() int {
   i:=0
   return func() int {
      i+=1
     return i
   }
}

func main(){
   /* nextNumber 为一个函数，函数 i 为 0 */
   nextNumber := getSequence()

   /* 调用 nextNumber 函数，i 变量自增 1 并返回 */
   fmt.Println(nextNumber())
   fmt.Println(nextNumber())
   fmt.Println(nextNumber())

   /* 创建新的函数 nextNumber1，并查看结果 */
   nextNumber1 := getSequence()
   fmt.Println(nextNumber1())
   fmt.Println(nextNumber1())
}
```

## defer 延迟执行

延迟执行一个方法，比如帮你关闭文件句柄，关闭数据库连接等。
这个也不是 go 独有的特征，可能 go 的用法更广泛一些。比如 python with 用法，用法相似。
如果代码中有多个 defer 将遵循栈的调度模式，最后的 defer 最先执行。

```go
import (
    "fmt"
)
func main() {
    fmt.Println("defer begin")
    // 将defer放入延迟调用栈
    defer fmt.Println(1)
    defer fmt.Println(2)
    // 最后一个放入, 位于栈顶, 最先调用
    defer fmt.Println(3)
    fmt.Println("defer end")
}

/* 输出
defer begin
defer end
3
2
1
*/
```

## goroutine 并发编程

```go
//go 关键字放在方法调用前新建一个 goroutine 并执行方法体
go GetThingDone(param1, param2);
//新建一个匿名方法并执行
go func(param1, param2) {
}(val1, val2)
//直接新建一个 goroutine 并在 goroutine 中执行代码块
go {
    //do someting...
}
```

要通过 chan 控制协程全部结束再结束进程

### channel

channel 是Go语言在语言级别提供的 goroutine 间的通信方式。我们可以使用 channel 在两个或多个 goroutine 之间传递消息。
详细看 <http://c.biancheng.net/view/97.html>

```go
var chanName chan ElementType
var ch chan int //传递类型是 int 的 channel
var ch map[string] chan bool //生成一个map，元素是bool型的 channel //这个不是很了解
ch := make(chan int) //传递类型是 int 的 channel
ch := make(chan int，10) //传递类型是 int ,缓冲长度为 10 的 channel
ch1 := make(chan int)                 // 创建一个整型类型的通道
ch2 := make(chan interface{})         // 创建一个空接口类型的通道, 可以存放任意格式
type Equip struct{ /* 一些字段 */ }
ch2 := make(chan *Equip)             // 创建Equip指针类型的通道, 可以存放*Equip
// 将0放入通道中
ch <- 0
// 将hello字符串放入通道中
ch <- "hello"
valuie:= <-ch //从channel 取出
```

#### 和 select 搭配使用

```go
func main() {
	select {
	case <-chan1:
		//如果成功从chan1读到数据则执行此case下的处理语句
	case chan2 <- 1:
		//如果成功向chan2写入数据则执行此case下的处理语句
	default:
		//如果上边都没成功执行默认处理流程
	}
}
```

#### 防止 channel 死锁

```go
import "time"

func main() {
	timeout := make(chan bool, 1)
	go func() {
		time.Sleep(1e9)
		timeout <- true
	}()
	select {
	case <-ch:
		// 此处的 ch 你是业务中的 ch，从 ch 中读取到数据，正常处理
	case <-timeout:
		// 一直没有从 ch 读到数据，但是从 timeout 中读取到数据，所以继续执行
	}
}
```

#### 单向 channel 和 channel 类型转换

```go
func main() {
	var ch1 chan int       //正常的双向chan
	var ch2 chan<- float64 //只能写float64的chan
	var ch3 <-chan int     //只能读 int 的chan
	ch4 := make(chan int)  //正常的双向chan
	ch5 := <-chan int(ch4) //只能读 int 的chan
	ch6 := chan<- int(ch4) //只能写int的chan
}
```

#### 关闭 channel

```go
func main() {
	close(ch)     //通过 close 关闭 chan
	x, ok := <-ch //通过多返回值判断是不是一个关闭的 chan
}
```

## 切片

### 切片的创建和截取

```go
import "fmt"

func main() {
   /* 创建切片 */
   numbers := []int{0,1,2,3,4,5,6,7,8}
   printSlice(numbers)

   /* 打印原始切片 */
   fmt.Println("numbers ==", numbers)

   /* 打印子切片从索引1(包含) 到索引4(不包含)*/
   fmt.Println("numbers[1:4] ==", numbers[1:4])

   /* 默认下限为 0*/
   fmt.Println("numbers[:3] ==", numbers[:3])

   /* 默认上限为 len(s)*/
   fmt.Println("numbers[4:] ==", numbers[4:])

   numbers1 := make([]int,0,5)
   printSlice(numbers1)

   /* 打印子切片从索引  0(包含) 到索引 2(不包含) */
   number2 := numbers[:2]
   printSlice(number2)

   /* 打印子切片从索引 2(包含) 到索引 5(不包含) */
   number3 := numbers[2:5]
   printSlice(number3)

}

func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
}

/* 输出
    len=9 cap=9 slice=[0 1 2 3 4 5 6 7 8]
    numbers == [0 1 2 3 4 5 6 7 8]
    numbers[1:4] == [1 2 3]
    numbers[:3] == [0 1 2]
    numbers[4:] == [4 5 6 7 8]
    len=0 cap=5 slice=[]
    len=2 cap=9 slice=[0 1]
    len=3 cap=7 slice=[2 3 4]
 */
```

### append() 和 copy()

```go
import "fmt"

func main() {
   var numbers []int
   printSlice(numbers)

   /* 允许追加空切片 */
   numbers = append(numbers, 0)
   printSlice(numbers)

   /* 向切片添加一个元素 */
   numbers = append(numbers, 1)
   printSlice(numbers)

   /* 同时添加多个元素 */
   numbers = append(numbers, 2,3,4)
   printSlice(numbers)

   /* 创建切片 numbers1 是之前切片的两倍容量*/
   numbers1 := make([]int, len(numbers), (cap(numbers))*2)

   /* 拷贝 numbers 的内容到 numbers1 */
   copy(numbers1,numbers)
   printSlice(numbers1)
}

func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
}

/* 输出
    len=0 cap=0 slice=[]
    len=1 cap=1 slice=[0]
    len=2 cap=2 slice=[0 1]
    len=5 cap=6 slice=[0 1 2 3 4]
    len=5 cap=12 slice=[0 1 2 3 4]
 */
```

### len() 和 cap()

```go
import "fmt"

func main() {
   // s := make([]int,len,cap)
   // cap 是最大长度，len 为当前长度
   var numbers = make([]int,3,5)

   printSlice(numbers)
}

func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)

}
// 输出 len=3 cap=5 slice=[0 0 0]
```

## json 使用

### 序列化和反序列化

```go
import "encoding/json"

type Book struct {
	Title       string
	Authors     []string
	Publisher   string
	IsPublished bool
	Price       float64
}

func main() {
	myBook := Book{
		"Go语言编程",
		[]string{"a", "b", "c"},
		"tooling",
		true,
		99.99,
	}
	// 序列化为 json 字符串
	b, _ := json.Marshal(myBook)
	// 反序列化为 Go 对象
	var book Book
	_ = json.Unmarshal(b, &book)
}
```

### 未知结构 json 字符串反序列化

```go
import (
	"encoding/json"
	"fmt"
)

type Book struct {
	Title       string
	Authors     []string
	Publisher   string
	IsPublished bool
	Price       float64
}

func main() {
	b := []byte(`{
    "Title": "Go语言编程",
    "Authors": ["XuShiwei", "HughLv", "Pandaman", "GuaguaSong", "HanTuo", "BertYuan","XuDaoli"],
    "Publisher": "ituring.com.cn",
    "IsPublished": true,
    "Price": 9.99,
    "Sales": 1000000
	}`)
	var r interface{}
	_ = json.Unmarshal(b, &r)
	//var r map[string]interface{} //可以承载任何类型的数组

    // 反序列化后未知结构对象的使用
	gobook, ok := r.(map[string]interface{})
	if ok {
        for k, v := range gobook {
            switch v2 := v.(type) {
                case string:
                    fmt.Println(k, "is string", v2)
                case int:
                    fmt.Println(k, "is int", v2)
                case bool:
                    fmt.Println(k, "is bool", v2)
                case []interface{}:
                    fmt.Println(k, "is an array:")
                    for i, iv := range v2 {
                        fmt.Println(i, iv)
                    }
                default:
                    fmt.Println(k, "is another type not handle yet")
            }
        }
    }
}
```

### 流式读写

```go
import (
	"encoding/json"
	"fmt"
	"os"
)

func main() {
	dec := json.NewDecoder(os.Stdin)
	enc := json.NewEncoder(os.Stdout)
	for {
		var v map[string]interface{}
		if err := dec.Decode(&v); err != nil {
			//...
		}
		for k := range v {
			if k != "Title" {
				delete(v, k)
			}
		}
		if err := enc.Encode(&v); err != nil {
			fmt.Println(err)
		}
	}
}
```

## http 服务端

```go
import (
	"io"
	"log"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "Hello,World!")
}
func main() {
	http.HandleFunc("/hello", helloHandler)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err.Error())
	}
}

```

## http 客户端

```go
import (
	"fmt"
	"net/http"
)

func main() {
	resp, err := http.Get("http://example.com/")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(resp)
}

```

## 哈希

### MD5

```go
package main

import (
"crypto/md5"
"fmt"
"io"
)

func main() {
  str := "abc123"
  //方法一
  data := []byte(str)
  has := md5.Sum(data)
  md5str1 := fmt.Sprintf("%x", has) //将[]byte转成16进制
  fmt.Println(md5str1)
  //方法二
  w := md5.New()
  io.WriteString(w, str)   //将str写入到w中
  md5str2: = fmt.Sprintf("%x", w.Sum(nil))  //w.Sum(nil)将w的hash转成[]byte格式
  fmt.Println(mdtstr2)
}
```

### SHA1

```go
package main

import (
    "crypto/sha1"
    "fmt"
)

func main() {
    s := "sha1 this string"
    h := sha1.New()
    h.Write([]byte(s))
    bs := h.Sum(nil)
    fmt.Println(s)
    fmt.Printf("%x\n", bs)
}
```

## 对 Uber 代码规范的理解

**红色部分理解可能有错误，请**[**查看原文**](https://github.com/xxjwxc/uber_go_guide_cn)**自己理解。**
如果希望接口方法修改接口中基础数据，则必须使用指针传递(将对象指针赋值给接口变量)。
零值 sync.Mutex 和 sync.RWMutex 是有效的。所以指向 mutex 的指针基本是不必要的。
如果将 Slices 和 Maps 传给其他函数，其他函数是可以修改原始数据的。
使用 defer 释放资源，比如关闭文件句柄，关闭数据库连接。
声明一个自定义类型和一个使用了 iota 的 const 组来使用枚举。由于变量的默认值为 0，因此要手动+1，因为通常应以非零值开始枚举。
使用 time.Time 表达瞬时时间，使用 time.Duration 表达时间段。
Errors 使用 fmt.Errorf("new store: %w", err)。
一般函数最后一个返回值是ok，要正确处理断言。
在生产环境中运行的代码必须避免出现 panic。
原子操作使用 go.uber.org/atomic。
避免在公共结构中嵌入类型。
避免使用内置名称，防止作用域隐式覆盖，比如你声明一个 error 局部变量就会覆盖掉 error 在对应块中的作用域。
避免使用 init()，更不要使用多个 init()。
Go程序使用 os.Exit 或 log.Fatal\* 退出，不要使用 panic。
Channel 的缓冲（size）要么是 1，要么就不设置。
避免可变全局变量，尽量缩小变量作用域。
如果函数返回值仅用于 if，则应该缩写 if err := ioutil.WriteFile(name, data, 0644); err != nil { return err }，这样能缩小变量作用域。
相似的 var、const、type、import 声明放在一组。
import 中的标准库和其他库用空行隔开。
如果导入地址的最后一段和导入的程序包名不同，要设置别名。
减少嵌套，让代码保持清晰。
减少不必要的 else，检查是否可以用默认值代替。
对于未导出的顶层常量和变量，使用\_作为前缀。
如果顶层变量是函数返回值，那么函数返回值类型和顶层变量类型只需要写一个。
结构体中的嵌入结构体要放在顶部，并且和自有字段用空行隔开。
本地变量声明要使用海象符（:=）。
用反引号 \`\` 来使用原始字符串，避免转义造成字符串难以阅读。
不要反复从固定字符串创建字节 slice。
优先使用 strconv 而不是 fmt。
var nums \[]int 和 nums := make(\[]int) 是等价的，var 完以后不需要再 make。
nil 是一个有效的 slice，要返回长度为零的切片时应该返回nil。
要检查切片是否为空，要用len(s) == 0，不能用 len(s) == nil。
make 一个要追加数据的切片时要指定容量。
用 var 生命空切片。
make 一个要 map 时要指定容量。
初始化空 Maps 一定要用 make。
初始化结构体时，应该指定字段名称。
初始化结构体时不初始化零值字段，没有被初始化的字段默认就是零值。
初始化一个省略了所有字段的结构时要用 var。
初始化 Struct 引用时要用 &，保持写法统一。
如果你在函数外声明 Printf-style 函数的格式字符串，请将其设置为const常量。
\[

]\(https://github.com/xxjwxc/uber\_go\_guide\_cn#%E4%B8%8D%E8%A6%81-panic)

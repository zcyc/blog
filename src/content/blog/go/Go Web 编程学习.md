---
title: "Go Web 编程学习"
author: "Charles"
description: ""
tags:
  - go
ogImage: ""
slug: "go-web"
pubDatetime: 2021-12-22T06:38:20.000Z
modDatetime: 2021-12-23T04:58:37.000Z
featured: false
draft: false
---

# 用 Golang 编写 Restful Api

## 启动一个 http 服务

### 通过闭包注册 HandleFunc

```go
package main
import (
    "fmt"
	"io"
	"log"
	"net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, you've requested: %s\n", r.URL.Path)
    })

    err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err.Error())
	}
}
```

### 通过函数名注册 HandleFunc

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

### 通过对比得出结论

不管是不是匿名函数，每个 Handler 函数有两个参数，分别是 w http.ResponseWriter 和 r \*http.Request，前者用来处理返回值，后者用来处理请求。
http 服务是由 http.ListenAndServe(":8080", nil) 启动的。
路由是由 http.HandleFunc("/hello", helloHandler) 控制的。
每个请求会按 path 分配到http.HandleFunc 注册的对应 Handler 中去处理。

## 处理 Rest 风格的请求

Go 的 net/http 包提供了很多功能，但是无法处理复杂的请求，例如将请求 url 分割为多个参数、区分不同 method 的请求。
gorilla/mux 刚好用来弥补 Golang 路由的不足，所以下边用 gorilla/mux 来实现高级的路由功能。

### URL Parameters

```go
package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/books/{title}/page/{page}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		title := vars["title"]
		page := vars["page"]

		fmt.Fprintf(w, "You've requested the book: %s on page %s\n", title, page)
	})

	http.ListenAndServe(":80", r)
}

```

### Methods

```go
r.HandleFunc("/books/{title}", CreateBook).Methods("POST")
r.HandleFunc("/books/{title}", ReadBook).Methods("GET")
r.HandleFunc("/books/{title}", UpdateBook).Methods("PUT")
r.HandleFunc("/books/{title}", DeleteBook).Methods("DELETE")
```

### Hostnames & Subdomains

```go
r.HandleFunc("/books/{title}", BookHandler).Host("www.mybookstore.com")
```

### Schemes

```go
r.HandleFunc("/secure", SecureHandler).Schemes("https")
r.HandleFunc("/insecure", InsecureHandler).Schemes("http")
```

### Path Prefixes & Subrouters

```go
bookrouter := r.PathPrefix("/books").Subrouter()
bookrouter.HandleFunc("/", AllBooks)
bookrouter.HandleFunc("/{title}", GetBook)
```

### Json **Encode & Json Decode**

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type User struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Status   int    `json:"status"`
}

func main() {
    // 从 request 中获取一个 json
    http.HandleFunc("/decode", func(w http.ResponseWriter, r *http.Request) {
        var user User

        // 解码成 Go 对象
        json.NewDecoder(r.Body).Decode(&user)

        fmt.Fprintf(w, "Id: %s，Name: %s，Password: %s，Status: %d", user.ID, user.Name, user.Password, user.Status)
    })

    // 向 response 返回一个 json
    http.HandleFunc("/encode", func(w http.ResponseWriter, r *http.Request) {
        user := User{
            ID:       "123",
            Name:     "Doe",
            Password: "123456",
            Status:   1,
		}

        // 编码成json
        json.NewEncoder(w).Encode(user)
    })

    http.ListenAndServe(":8080", nil)
}
```

## 用数据库为接口提供数据

### 常见的数据库操作

```go
package model

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func do() {
	db, err := sql.Open("mysql", "root:toor@tcp(localhost:3306)/dev?tls=skip-verify&autocommit=true")
	if err != nil {
		log.Fatal(err)
	}
	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}

	{ // Create a new table
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

	{ // Insert a new user
		name := "charles"
		password := "123456"
		status := 1

		result, err := db.Exec(`INSERT INTO users (name, password, status) VALUES (?, ?, ?)`, name, password, status)
		if err != nil {
			log.Fatal(err)
		}

		id, err := result.LastInsertId()
		fmt.Println(id)
	}

	{ // Query a single user
		var (
			id       int
			name     string
			password string
			status   int
		)

		query := "SELECT id, name, password, status FROM users WHERE id = ?"
		if err := db.QueryRow(query, 3).Scan(&id, &name, &password, &status); err != nil {
			log.Fatal(err)
		}

		fmt.Println(id, name, password, status)
	}

	{ // Query all users
		type user struct {
			id       int
			name     string
			password string
			status   int
		}

		rows, err := db.Query(`SELECT id, name, password, status FROM users`)
		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		var users []user
		for rows.Next() {
			var u user

			err := rows.Scan(&u.id, &u.name, &u.password, &u.status)
			if err != nil {
				log.Fatal(err)
			}
			users = append(users, u)
		}
		if err := rows.Err(); err != nil {
			log.Fatal(err)
		}

		fmt.Printf("%#v", users)
	}

    { // Update user
        result, err := db.Exec(`UPDATE users set name = ?, password =?, status=? where id=?`, user.Name, user.Password, user.Status, user.ID)
        if err != nil {
            log.Println(err)
            return
        }
    }

	{ // Delete user
		_, err := db.Exec(`DELETE FROM users WHERE id = ?`, 1)
		if err != nil {
			log.Fatal(err)
		}
	}
}
```

### 简单的数据库增删改查

```go
package main

import (
	"database/sql"
	"encoding/json"
	_ "github.com/go-sql-driver/mysql"
	"io"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

var db *sql.DB

type User struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Status   int    `json:"status"`
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/user/list", GetUserList).Methods("GET")
	r.HandleFunc("/user/{id}", GetUser).Methods("GET")
	r.HandleFunc("/user", CreateUser).Methods("POST")
	r.HandleFunc("/user", UpdateUser).Methods("PUT")
	r.HandleFunc("/user/{id}", DeleteUser).Methods("DELETE")

	err := http.ListenAndServe(":80", r)
	if err != nil {
		log.Fatal(err)
	}
}

func GetUserList(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query(`SELECT id, name, password, status FROM users`)
	if err != nil {
		log.Println(err)
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			log.Println(err)
		}
	}(rows)
	// 将查询结果转换成数组
	var users []User
	for rows.Next() {
		var u User

		err := rows.Scan(&u.ID, &u.Name, &u.Password, &u.Status)
		if err != nil {
			log.Println(err)
		}
		users = append(users, u)
	}
	if err := rows.Err(); err != nil {
		log.Println(err)
	}

	if len(users) == 0 {
		_, err := io.WriteString(w, "No users")
		if err != nil {
			log.Println("[GetUserList] No users")
			return
		}
		return
	}
	err = json.NewEncoder(w).Encode(users)
	if err != nil {
		log.Println("[GetUserList][Encode(users)]", err)
		return
	}
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	// 获取路由参数
	vars := mux.Vars(r)
	var id = vars["id"]
	log.Println("[GetUser][id]", id)

	// 接收查询结果
	var (
		name     string
		password string
		status   int
	)

	query := "SELECT id, name, password, status FROM users WHERE id = ?"
	if err := db.QueryRow(query, id).Scan(&id, &name, &password, &status); err != nil {
		if _, err := io.WriteString(w, "User not found"); err != nil {
			log.Println("[GetUser][w.Write]", err)
			return
		}
		log.Println("[GetUser][db.QueryRow]", err)
		return
	}

	if err := json.NewEncoder(w).Encode(User{
		ID:       id,
		Name:     name,
		Password: password,
		Status:   status,
	}); err != nil {
		log.Println("[GetUser][Encode(User)]", err)
		return
	}
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Println("[CreateUser][Decode(&user)]", err)
		return
	}

	if user.Name == "" || user.Password == "" {
		if _, err := io.WriteString(w, "Name/Password is empty"); err != nil {
			log.Printf("[CreateUser][io.WriteString] Name:{%s} Password:{%s} 最少有一个是空的", user.Name, user.Password)
			return
		}
		log.Printf("[CreateUser] Name:{%s} Password:{%s} 最少有一个是空的", user.Name, user.Password)
		return
	}

	result, err := db.Exec(`INSERT INTO users (name, password, status) VALUES (?, ?, ?)`, user.Name, user.Password, user.Status)
	if err != nil {
		if _, err := io.WriteString(w, user.Name+" already exists"); err != nil {
			log.Println("[CreateUser][db.Exec][w.Write]", err)
			return
		}
		log.Println("[CreateUser][db.Exec]", err)
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		log.Println("[CreateUser][result.LastInsertId]", err)
	}
	_, err = io.WriteString(w, "created user: "+strconv.FormatInt(id, 10))
	if err != nil {
		log.Println("[CreateUser][w.Write]", err)
		return
	}
}
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Println("[CreateUser][Decode(&user)]", err)
		return
	}

	if user.ID == "" || user.Name == "" || user.Password == "" {
		if _, err := io.WriteString(w, "ID/Name/Password is empty"); err != nil {
			log.Printf("[UpdateUser][io.WriteString] ID:{%s} Name:{%s} Password:{%s} 最少有一个是空的", user.ID, user.Name, user.Password)
			return
		}
		log.Printf("[UpdateUser] ID:{%s} Name:{%s} Password:{%s} 最少有一个是空的", user.ID, user.Name, user.Password)
		return
	}

	result, err := db.Exec(`UPDATE users set name = ?, password =?, status=? where id=?`, user.Name, user.Password, user.Status, user.ID)
	if err != nil {
		if _, err := io.WriteString(w, user.Name+" update failed"); err != nil {
			log.Println("[UpdateUser][db.Exec][w.Write]", err)
			return
		}
		log.Println("[UpdateUser][db.Exec]", err)
		return
	}
	rowsAffected, _ := result.RowsAffected()
	println("[UpdateUser][rowsAffected]", rowsAffected)
	if _, err := io.WriteString(w, "rowsAffected: "+strconv.FormatInt(rowsAffected, 10)); err != nil {
		log.Println("[UpdateUser][w.Write]", err)
		return
	}
}
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	// 获取路由参数
	vars := mux.Vars(r)
	var id = vars["id"]
	result, err := db.Exec(`DELETE FROM users WHERE id = ?`, id)
	if err != nil {
		if _, err := io.WriteString(w, "delete failed"+id); err != nil {
			log.Println("[DeleteUser][db.Exec][w.Write]", err)
			return
		}
		log.Println("[DeleteUser][db.Exec]", err)
		return
	}
	rowsAffected, _ := result.RowsAffected()
	println("[DeleteUser][rowsAffected]", rowsAffected)
	if _, err := io.WriteString(w, "rowsAffected: "+strconv.FormatInt(rowsAffected, 10)); err != nil {
		log.Println("[DeleteUser][w.Write]", err)
		return
	}
}

func init() {
	var err error
	db, err = sql.Open("mysql", "root:toor@tcp(localhost:3306)/dev")
	if err != nil {
		log.Fatal(err)
	}
}

```

## 中间件

中间件是洋葱模型，链式调用的，一层一层进入然后一层一层返回。

### 简单中间件

```go
package main

import (
	"fmt"
	"log"
	"net/http"
)

func logging(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.URL.Path)
		f(w, r)
	}
}

func foo(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "foo")
}

func bar(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "bar")
}

func main() {
	http.HandleFunc("/foo", logging(foo))
	http.HandleFunc("/bar", logging(bar))

	http.ListenAndServe(":8080", nil)
}

```

### 复杂中间件

```go
package main

import (
    "fmt"
    "log"
    "net/http"
    "time"
)

type Middleware func(http.HandlerFunc) http.HandlerFunc

// 日志记录所有请求及其路径和处理时间
func Logging() Middleware {

    // 创建一个新的中间件
    return func(f http.HandlerFunc) http.HandlerFunc {

        // 定义 http.HandlerFunc
        return func(w http.ResponseWriter, r *http.Request) {

            // Do middleware things
            start := time.Now()
            defer func() { log.Println(r.URL.Path, time.Since(start)) }()

            // 调用链中的下一个中间件/处理程序
            f(w, r)
        }
    }
}

// 确保只能使用特定的方法请求url，否则返回错误的请求
func Method(m string) Middleware {

    // 创建一个新的中间件
    return func(f http.HandlerFunc) http.HandlerFunc {

        // 定义 http.HandlerFunc
        return func(w http.ResponseWriter, r *http.Request) {

            // Do middleware things
            if r.Method != m {
                http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
                return
            }

            // 调用链中的下一个中间件/处理程序
            f(w, r)
        }
    }
}

// Chain 将中间件应用到 http.HandlerFunc
func Chain(f http.HandlerFunc, middlewares ...Middleware) http.HandlerFunc {
    for _, m := range middlewares {
        f = m(f)
    }
    return f
}

func Hello(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "hello world")
}

func main() {
    http.HandleFunc("/", Chain(Hello, Method("GET"), Logging()))
    http.ListenAndServe(":8080", nil)
}
```

# 用 Golang 渲染网页

## 简单渲染一个网页

### 启动一个 http 服务

```go
package main

import (
	"html/template"
	"net/http"
)

type Todo struct {
	Title string
	Done  bool
}

type TodoPageData struct {
	PageTitle string
	Todos     []Todo
}

func main() {
    // template.ParseFiles 的路径是项目根目录算起，在另一篇文章中强调过这个事情，不管启动文件在什么路径，这里都从根目录算起。
	tmpl := template.Must(template.ParseFiles("./build/book.html"))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		data := TodoPageData{
			PageTitle: "My TODO list",
			Todos: []Todo{
				{Title: "Task 1", Done: false},
				{Title: "Task 2", Done: true},
				{Title: "Task 3", Done: true},
			},
		}
		tmpl.Execute(w, data)
	})
	http.ListenAndServe(":80", nil)
}
```

### 创建一个模版文件

创建一个 build 文件夹，然后在 build 中创建一个 book.html，写入如下代码：

```go
<h1>{{.PageTitle}}</h1>
<ul>
    {{range .Todos}}
        {{if .Done}}
            <li class="done">{{.Title}}</li>
        {{else}}
            <li>{{.Title}}</li>
        {{end}}
    {{end}}
</ul>
```

## 渲染一个表单并接收返回值

### 启动一个 http 服务

```go
package main

import (
    "html/template"
    "net/http"
)

type ContactDetails struct {
    Email   string
    Subject string
    Message string
}

func main() {
    tmpl := template.Must(template.ParseFiles("./build/forms.html"))

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        // 如果当前请求不是 post 则渲染表单让用户填写
        if r.Method != http.MethodPost {
            tmpl.Execute(w, nil)
            return
        }

        // 从请求中获取表单的值
        details := ContactDetails{
            Email:   r.FormValue("email"),
            Subject: r.FormValue("subject"),
            Message: r.FormValue("message"),
        }

        // 用表单的值做一些处理，比如登陆
        _ = details

        // 如果当前请求是 post 则渲染提交成功页面
        tmpl.Execute(w, struct{ Success bool }{true})
    })

    http.ListenAndServe(":8080", nil)
}
```

### 创建一个模版文件

创建一个 build 文件夹，然后在 build 中创建一个 forms.html，写入如下代码：

```go
{{if .Success}}
    <h1>Thanks for your message!</h1>
{{else}}
    <h1>Contact</h1>
    <form method="POST">
        <label>Email:</label><br />
        <input type="text" name="email"><br />
        <label>Subject:</label><br />
        <input type="text" name="subject"><br />
        <label>Message:</label><br />
        <textarea name="message"></textarea><br />
        <input type="submit">
    </form>
{{end}}
```

## 总结

由于 go 还是用来做 api 多一些，渲染网页就到这里就行了。
从代码中可以看到，依然是注册一个 http.HandleFunc，和 api 不同的是，这里要渲染模版。

### 载入模版

tmpl := template.Must(template.ParseFiles("./build/book.html"))

### 渲染模版

tmpl.Execute(w, data)
调用刚刚创建的模版的 Execute 方法，同时传入当前 HandleFunc 的 http.ResponseWriter 和要渲染的数据。

### 根据不同 Method 作出不同返回

```go
if r.Method != http.MethodPost {
	tmpl.Execute(w, nil)
	return
}
```

### 获取 post 表单的值

```go
details := ContactDetails{
    Email:   r.FormValue("email"),
    Subject: r.FormValue("subject"),
    Message: r.FormValue("message"),
}
```

# 用 Golang 分发文件

```go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    fs := http.FileServer(http.Dir("static/"))
    http.Handle("/static/", http.StripPrefix("/static/", fs))

    http.ListenAndServe(":80", nil)
}
```

# 一些问题

## ResponseWriter.Write 和 io.WriteString 的区别

ResponseWriter.Write 的参数是字节码，io.WriteString 的参数是 ResponseWriter 和 string，如果你要写出 string 使用 io.WriteString 可以少写字节码到 string 的转换。
io 包下的方法除了 io.WriteString 还有 io.Writer，这个用法更多，用到了可以详细看看。
详细去看 <https://stackoverflow.com/questions/37863374/whats-the-difference-between-responsewriter-write-and-io-writestring>

## fmt.Printf 和 log.Printf 的区别

```go
h := "world"
fmt.Printf("hello = %v\n", h)
log.Printf("halo = %v\n", h)

/*
输出结果：
hello = world
2016/12/30 09:13:12 halo = world
*/
```

从输出结果可以看出 log.Printf 是带有时间的，fmt.Printf 仅打印你要打印的东西。还涉及到线程安全什么的。
详细去看 <https://stackoverflow.com/questions/41389933/when-to-use-log-over-fmt-for-debugging-and-printing-error>

## runtime.Caller() 和 debug.Stack() 的区别

debug.Stack() 是打印完整的调用堆栈，详细且多。runtime.Caller() 是可以控制只打印自己想要的内容的，比如行号或者文件名。
详细去看 <https://www.orztu.com/post/golang-trace/>

---
title: "Ruby 遇到的问题"
author: "Charles"
description: ""
tags:
  - ruby
ogImage: ""
slug: "ruby-problems"
pubDatetime: 2024-03-25T19:25:21.000Z
modDatetime: 2024-03-25T19:33:21.000Z
featured: false
draft: false
---

## Brew 和 rbenv 混用导致 bundle install 失败
```
rm -rf ~/.gem
```

## 修改后的代码概率性生效
sidekiq 也要重启

## IDE 断点调试不生效
sidekiq 在另一个进程，可以使用 gem 调试，如：debug、byebug、pry

## 字符串插值不生效
只能在双引号插值

## 哈希取不到值
a = { name: "foo" } 取值要用 a[:name]

## 修改 ruby 版本后项目中某些 gem 报错
rm -rf vendor/* 然后 bundle install
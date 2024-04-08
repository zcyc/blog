---
title: "nvim 使用"
author: "Charles"
description: ""
tags:
  - ide
ogImage: ""
slug: "nvim"
pubDatetime: 2024-03-04T00:02:32.000+08:00
featured: false
draft: false
---

## 注意

nvim 中 `s / S` 快捷键功能与 vim 不同

## 常用

| 按键        | 功能                |
| ----------- | ------------------- |
| w / b       | 下/上一个单词       |
| y           | Yank 选择 (复制)    |
| p / P       | 在之后/之前粘贴     |
| x           | 删除字符 (剪切)     |
| dw          | 删除单词            |
| d2w         | 删除2个单词         |
| v           | 选择                |
| V           | 按行选择            |
| \<C-h>      | 进入块模式          |
| viw         | 选中一个单词        |
| vi{         | 选中{}内的内容      |
| va{         | 选中{}的内容        |
| I / A       | 插入行的开始/结束   |
| o / O       | 在下方/上方插入新行 |
| 0           | 零，行的开始        |
| ^           | 行开头 (非空白)     |
| $           | 结束                |
| gg / G      | 第一行/最后一行     |
| n / N       | 搜索下一个/上一个   |
| \<C-h>      | 去左窗口            |
| \<C-l>      | 去右窗口            |
| \<S-h>      | 上一个标签页        |
| \<S-l>      | 下一个标签页        |
| \<leader>cd | 行诊断              |
| \<leader>ca | 代码操作            |
| \<leader>sb | 搜索当前文件        |
| \<leader>cr | 重命名              |
| s           | 字符跳转            |
| gd          | 跳转定义            |
| gr          | 查找引用            |
| gI          | 跳转实现            |
| \<C-o>      | 返回上一个          |
| \<C-i>      | 前往                |

## 更多

[Vim 备忘清单](https://wangchujiang.com/reference/docs/vim.html)

[LazyVim Keymaps](https://www.lazyvim.org/keymaps)

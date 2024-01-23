---
title: "uni-app sitemap.json 自定义"
author: "Charles"
description: ""
tags:
  - UniApp
ogImage: ""
slug: "uni-app-sitemap-custom"
pubDatetime: 2022-06-28T18:48:16.000Z
modDatetime: 2022-06-28T18:51:06.000Z
featured: false
draft: false
---

wap2app 的项目才有这个配置文件

```plsql
{
	"global": {
		"webviewParameter": {
			"titleNView": {
				"autoBackButton": true,
				"backgroundColor": "#f7f7f7", // 导航栏背景色
				"titleColor": "#000000", // 标题颜色
				"titleSize": "17px"
			},
			"statusbar": {
				// 系统状态栏样式(前景色)
				"style": "dark"
			},
			"appendCss": "",
			"appendJs": ""
		},
		"easyConfig": {
			"quit": {
				"toast": {
					"showFeedback": false // 不显示“反馈意见”链接，默认为true
				}
			}
		}
	},
	"pages": [{
		"webviewId": "__W2A__pan.h-loli.cc", // 首页
		"matchUrls": [{
			"href": "https://pan.h-loli.cc"
		}, {
			"href": "https://pan.h-loli.cc/"
		}],
		"webviewParameter": {
			"titleNView": false,
			"statusbar": {
				// 状态条背景色，
				// 首页不使用原生导航条，颜色值建议和global->webviewParameter->titleNView->backgroundColor颜色值保持一致
				// 若首页启用了原生导航条，则建议将首页的statusbar配置为false，这样状态条可以和原生导航条背景色保持一致；
				"background": "#f7f7f7"
			}
		},
		"easyConfig": {
			"back": {
				"history": true // 允许执行 history.back，防止一点返回就提示退出 APP
			}
		}
	}]
}
```

---
title: "uni-app pages.json 自定义"
author: "Charles"
description: ""
tags:
  - uniapp
ogImage: ""
slug: "uni-app-pages-custom"
pubDatetime: 2022-06-28T17:54:55.000+08:00
modDatetime: 2022-11-10T03:00:04.000+08:00
featured: false
draft: false
---

# 控制 title 展示，防止双额头

```python
{
			"path": "pages/index/index",
			"style": {
				// #ifdef MP
				"navigationBarTitleText": "首页",
				// #endif
				"h5": {
					"titleNView": false
				}
			}
		}
```

# 原生导航栏搜索框 searchInput

```python
// #ifdef MP
		{
			"path": "pages/index/index",
			"style": {
				// #ifdef MP
				"navigationBarTitleText": "首页",
				// #endif
				"h5": {
					"titleNView": false
				}
			}
		},
		// #endif
		// #ifdef H5
		{
			"path": "pages/hotel/hotel",
			"style": {
				// #ifdef MP
				"navigationBarTitleText": "酒店",
				// #endif
				"h5": {
					"titleNView": false
				},
				"app-plus": {
					"titleNView": {
						"type": "transparent",
						"searchInput": {
							"backgroundColor": "rgba(231, 231, 231,.7)",
							"borderRadius": "16px",
							"placeholder": "请输入城市 如：北京",
							"disabled": true,
							"placeholderColor": "#606266"
						},
						"buttons": [{
								"fontSrc": "/static/yticon.ttf",
								"text": "\ue60d",
								"fontSize": "26",
								"color": "#303133",
								"float": "left",
								"background": "rgba(0,0,0,0)"
							},
							{
								"fontSrc": "/static/yticon.ttf",
								"text": "\ue744",
								"fontSize": "27",
								"color": "#303133",
								"background": "rgba(0,0,0,0)",
								"redDot": true
							}
						]
					}
				}
			}
		},
		// #endif
```

# 关闭回弹效果 bounce

```python
{
			"path": "pages/shop/shop",
			"style": {
				// #ifdef MP
				"navigationBarTitleText": "商城",
				// #endif
				"h5": {
					"titleNView": false
				},
				"app-plus": {
					"bounce": "none",
					"titleNView": {
						"type": "transparent",
						"buttons": [{
								"fontSrc": "/static/yticon.ttf",
								"text": "\ue60f",
								"fontSize": "24",
								"color": "#303133",
								"width": "46px",
								"background": "rgba(0,0,0,0)"
							},
							{
								"fontSrc": "/static/yticon.ttf",
								"text": "\ue744",
								"fontSize": "28",
								"color": "#303133",
								"background": "rgba(0,0,0,0)",
								"redDot": true
							}
						]
					}
				}
			}
		},
```

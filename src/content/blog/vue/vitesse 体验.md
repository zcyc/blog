---
title: "vitesse 体验"
author: "Charles"
description: ""
tags:
  - vue
ogImage: ""
slug: "vitesse"
pubDatetime: 2022-01-21T16:18:49.000Z
modDatetime: 2022-07-01T16:12:02.000Z
featured: false
draft: false
---

直接看源代码，打开 pages 一看，傻眼了，怎么这么多名字独特的文件。

# 文件解释

## \[...all].vue

这个是 404 页面，如何实现的呢？这个文件是放在根目录的一个可以匹配任何参数路路由的文件，当其他规则都没匹配到的时候，一定会匹配到这个。

## hi/\[name].vue

这是一个用接收name参数，并且用name当作文件名注册为路由的组件。

```typescript
// [name].vue
// 文件中的这一行就是用来从 url 中获取参数的，因为文件即路由，所以你也可以理解为从文件名中取参数出来。
const props = defineProps<{ name: string }>();
```

# 其他用法

## 传多个参数

演示项目中是传了一个 string，其实也可以传 json 过来，不过还是以字符串的形式传过来的，毕竟只有字符串可以 encodeURIComponent。

```vue
<!-- index.vue -->
<script setup lang="ts">
const user = { id: "1", name: "Charles" };
const go = () => {
  router.push(`/hi/${encodeURIComponent(JSON.stringify(user))}`);
};
</script>
```

```vue
<!-- [user].vue -->
<script setup lang="ts">
const props = defineProps<{ user: string }>();
const user = JSON.parse(props.user);
</script>

<template>
  <div>{{ user.name }}</div>
</template>
```

## 同级多 url

如果是 \[user].vue 这种的组件只能有一个，因为这里组件实际上是没有名字的，user 只是给 props 取值用的，所以你文件夹下不能有多个动态路由。
你可以多放点有名字的组件，vue router 根据名字去 push 是可以有无限个的。

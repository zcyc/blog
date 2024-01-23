---
title: "vitesse tsx 踩坑"
author: "Charles"
description: ""
tags:
  - blog
ogImage: ""
slug: "vitesse-tsx"
pubDatetime: 2022-01-15T16:56:59.000Z
modDatetime: 2022-11-18T01:22:08.000Z
featured: false
draft: false
---

[vitesse](https://github.com/antfu/vitesse) 是 antfu 整合的 Vue 框架，集成的模块都是最新的，赶紧尝试一下。
为了保证和 React 开发体验统一，这回就试试能不能用 tsx。
**目前还不能在 Vitesse 中使用 tsx，项目配置都是针对 template 的。tsx 建议使用 **[vue-tsx-starter](https://github.com/widcardw/vue-tsx-starter)。

# 一、让 vitesse 把 tsx 当作页面

由于 vitesse 是 [File based routing](https://github.com/antfu/vitesse/blob/main/src/pages)，所以要让他把 tsx 识别为页面，这样加入到路由中才能访问得到

```typescript
// 1、找到 vite.config.ts 中的
Pages({
	extensions: ['vue', 'md'],
}),

// 2、在数组里边加个 'tsx'
Pages({
	extensions: ['vue', 'md', 'tsx'],
}),
```

# 二、安装 vite 的 tsx 插件

vite 对于不同框架的解析都是用插件来实现的，vitesse 集成了 vue 插件，但是没有集成 jsx 插件。

```json
// 1、在 package.json 文件中找到 plugin-vue 插件
"@vitejs/plugin-vue": "^2.0.1",

// 2、在这一行下边添加 plugin-vue-jsx 插件
"@vitejs/plugin-vue-jsx": "^1.3.3",

// 3、在项目根目录安装以来
终端执行 pnpm install

// 4、在 vite.config.ts 中引入刚才安装的插件
import vueJsx from '@vitejs/plugin-vue-jsx'

// 5、在 vite.config.ts 中找到这段代码
Vue({
	include: [/\.vue$/, /\.md$/],
}),

// 6、在这段代码的前边或者后边加上下边这一段，直接加一句 vueJsx(), 这个也可以，留着大括号是为了以后需要的时候写配置
vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
}),
```

# 三、让 tsc 把 tsx 内容交给 babel 编译

```typescript
// 在 tsconfig.json 的 compilerOptions 中加一句
"jsx": "preserve",
```

# 四、修改 eslint 让他不报 react 错误

```typescript
// 将 .eslintrc 内容替换为如下内容
{
  "extends": "@antfu",
  "rules": {
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off"
  }
}
```

# 五、写一个 tsx 组件试试

```typescript
// import { defineComponent } from 'vue' // 理论上这一行不用写，如果你那里报找不到就放开注释
export default defineComponent({
  name: 'Mouse',
  setup() {
    const { x, y } = useMouse()
    return () => <div>mouse at {x.value},{y.value}</div>
  },
})
```

# 六、引用这个组件试试

```typescript
// import { defineComponent } from 'vue' // 理论上这一行不用写，如果你那里报找不到就放开注释
import Mouse from './Mouse'
export default defineComponent({
  setup() {
    return () => <Mouse/>
  },
})

```

# 七、存在的问题

className 提示不存在
class 补全是 class={}
class 自动转换成 className 继续报错
class 和 className 中的 windicss 代码补全丢失
react 命名空间不存在 (可以通过修改 eslint 配置禁用检测)
display name XXX (可以通过修改 eslint 配置禁用检测)
无法使用 vitesse 的 layout 功能

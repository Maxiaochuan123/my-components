# 快速开始

## 安装

使用包管理器安装组件库：

```bash
npm install my-components
```

## 引入组件库

在你的应用入口文件中引入组件库：

```ts
import { createApp } from 'vue'
import naive from 'naive-ui'
import MyComponents from 'my-components'
import App from './App.vue'

const app = createApp(App)
app.use(naive)
app.use(MyComponents)
app.mount('#app')
```

## 使用组件

现在你可以在任何组件中使用我们提供的组件了：

```vue
<template>
  <my-button type="primary">主要按钮</my-button>
</template>
``` 
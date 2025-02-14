# Button 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。

```vue
<template>
  <my-button>默认按钮</my-button>
  <my-button type="primary">主要按钮</my-button>
  <my-button type="info">信息按钮</my-button>
  <my-button type="success">成功按钮</my-button>
  <my-button type="warning">警告按钮</my-button>
  <my-button type="error">错误按钮</my-button>
</template>
```

## 不同尺寸

提供四种尺寸，可以在不同场景下选择合适的按钮尺寸。

```vue
<template>
  <my-button size="tiny">超小按钮</my-button>
  <my-button size="small">小按钮</my-button>
  <my-button size="medium">中等按钮</my-button>
  <my-button size="large">大按钮</my-button>
</template>
```

## 禁用状态

按钮不可用状态。

```vue
<template>
  <my-button disabled>禁用按钮</my-button>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 按钮类型 | string | primary / info / success / warning / error | - |
| size | 按钮尺寸 | string | tiny / small / medium / large | medium |
| disabled | 是否禁用 | boolean | true / false | false |
| text | 按钮文本 | string | - | '默认按钮' |

### Events

| 事件名称 | 说明 | 回调参数 |
|---------|------|---------|
| click | 点击按钮时的回调 | (event: MouseEvent) |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 | 
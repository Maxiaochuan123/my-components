<template>
  <div class="container">
    <h1>组件库开发环境</h1>
    <div class="component-showcase">
      <h2>按钮组件</h2>
      <div class="button-demo">
        <my-button>默认按钮</my-button>
        <my-button type="primary">主要按钮</my-button>
        <my-button type="info">信息按钮</my-button>
        <my-button type="success">成功按钮</my-button>
        <my-button type="warning">警告按钮</my-button>
        <my-button type="error">错误按钮</my-button>
      </div>
      <div class="button-demo">
        <my-button size="tiny">超小按钮</my-button>
        <my-button size="small">小按钮</my-button>
        <my-button size="medium">中等按钮</my-button>
        <my-button size="large">大按钮</my-button>
      </div>
      <div class="button-demo">
        <my-button disabled>禁用按钮</my-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件已全局注册，无需导入
console.log('App.vue');
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.component-showcase {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.button-demo {
  margin: 16px 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

h2 {
  margin-bottom: 16px;
  color: #666;
}
</style>

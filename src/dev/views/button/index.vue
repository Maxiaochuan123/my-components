<template>
  <div class="component-page">
    <h1>Button 按钮</h1>
    
    <section class="demo-section">
      <h2>基础用法</h2>
      <div class="demo-block">
        <my-button>默认按钮</my-button>
        <my-button type="primary">主要按钮</my-button>
        <my-button type="info">信息按钮</my-button>
        <my-button type="success">成功按钮</my-button>
        <my-button type="warning">警告按钮</my-button>
        <my-button type="error">错误按钮</my-button>
      </div>
    </section>

    <section class="demo-section">
      <h2>不同尺寸</h2>
      <div class="demo-block">
        <my-button size="tiny">超小按钮</my-button>
        <my-button size="small">小按钮</my-button>
        <my-button size="medium">中等按钮</my-button>
        <my-button size="large">大按钮</my-button>
      </div>
    </section>

    <section class="demo-section">
      <h2>禁用状态</h2>
      <div class="demo-block">
        <my-button disabled>禁用按钮</my-button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.component-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin: 32px 0;
}

.demo-block {
  margin: 16px 0;
  padding: 24px;
  border: 1px solid #eee;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

h1 {
  margin-bottom: 24px;
  font-size: 28px;
}

h2 {
  font-size: 20px;
  color: #666;
}
</style> 
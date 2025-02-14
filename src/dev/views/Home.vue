<template>
  <div class="home">
    <h1>组件库</h1>
    <nav class="nav-menu">
      <router-link to="/button" class="nav-item">Button 按钮</router-link>
      <!-- 其他组件导航项 -->
    </nav>
  </div>
</template>

<style scoped>
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-menu {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.nav-item {
  display: block;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s;
}

.nav-item:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}
</style> 
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/button'
  },
  {
    path: '/button',
    name: 'Button',
    component: () => import('../views/button/index.vue'),
  },
  {
    path: '/button2',
    name: 'Button2',
    component: () => import('../views/button2/index.vue'),
  },
  // 其他组件路由可以按需添加
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 
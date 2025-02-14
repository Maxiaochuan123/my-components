import { createApp } from 'vue';
import naive from 'naive-ui';
import router from './router';
import App from './App.vue';
import Components from '../components';

const app = createApp(App);
app.use(naive);
app.use(router);
// 可以使用默认前缀 'My'
app.use(Components);
// 或者自定义前缀
// app.use(Components, { prefix: 'Cool' })
app.mount('#app');

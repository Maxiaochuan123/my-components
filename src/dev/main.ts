import { createApp } from 'vue';
import naive from 'naive-ui';
import router from './router';
import App from './App.vue';
import Components from '../components';

const app = createApp(App);
app.use(naive);
app.use(router);
app.use(Components);
app.mount('#app');

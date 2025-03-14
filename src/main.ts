import './assets/styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import createRouterInterceptor from '@/router/interceptor';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import 'virtual:svg-icons-register';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import SvgIcon from './components/SvgIcon/SvgIcon.vue';
import 'nprogress/nprogress.css';
import { setupGlobDirectives } from '@/directives';

dayjs.locale('zh');

const app = createApp(App);

app.use(createPinia()).use(router).use(Antd).component('SvgIcon', SvgIcon);

createRouterInterceptor(router);
setupGlobDirectives(app);

app.mount('#app');

import { createRouter, createWebHistory } from 'vue-router';
import layout from '@/views/Layout/Layout.vue';
import type { RouteRecordRaw } from 'vue-router';

/**
 * @param {Object} meta 自定义参数说明：
 * @param {Boolean} keepAlive 是否缓存页面，默认为false，需要在文件名和name相对应
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    name: 'Layout',
    redirect: 'index',
    component: layout,
    children: [
      {
        path: 'index',
        name: 'Home',
        component: () => import('@/views/Home/Home.vue'),
        meta: {
          title: '首页',
          keepAlive: true,
        },
      },
    ],
  },
];

const exception: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'Exception',
  component: () => import('@/views/Exception/Exception.vue'),
  meta: {
    title: '404',
    keepAlive: true,
  },
};
routes.push(exception);

const router = createRouter({
  routes,
  scrollBehavior: () => {
    setTimeout(() => {
      const layout = document.querySelector('#layout-content');
      layout && (layout.scrollTop = 0);
    }, 100);
  },
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
});

export default router;

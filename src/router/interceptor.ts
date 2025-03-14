import { useUserStore } from '@/stores/user';
import type { Router } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { useBaseConfig } from '@/hooks/useBaseConfig';

import NProgress from 'nprogress';
import { message } from 'ant-design-vue';
import router from '@/router/index';

NProgress.configure({
  showSpinner: false,
});

export default function createRouterInterceptor(router: Router) {
  const userStore = useUserStore();
  const appStore = useAppStore();
  const baseConfig = useBaseConfig();

  router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path === '/login') {
      if (userStore.token) {
        router.replace('/');
      } else {
        next();
      }
    } else if (!userStore.token) {
      router.replace({
        path: '/login',
        query: { redirect: window.encodeURIComponent(to.fullPath) },
      });
      NProgress.done();
    } else {
      if (userStore.userInfo.userId) {
        appStore.setCaches(to);
        next();
      } else {
        userStore.getUserInfo().then(() => {
          message.success('欢迎回到' + baseConfig.title + '!');
          appStore.setCaches(to);
          next();
        });
      }
    }
  });

  router.afterEach((to) => {
    NProgress.done();
    window.document.title = (to.meta.title as string) + '-' + baseConfig.title;
  });
}

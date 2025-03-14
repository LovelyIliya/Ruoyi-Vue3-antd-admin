import { defineStore } from 'pinia';
import { routerApi } from '@/api/system';

export const useSystemStore = defineStore('system', () => {
  const routes = ref([]);
  const addRoutes = [];
  const defaultRoutes = [];
  const topbarRouters = [];
  const sidebarRouters = [];
  function getRouter() {
    return new Promise((resolve) => {
      // 向后端请求路由数据
      getRouters().then((res) => {
        const sdata = JSON.parse(JSON.stringify(res.data));
        const rdata = JSON.parse(JSON.stringify(res.data));
        const sidebarRoutes = filterAsyncRouter(sdata);
        const rewriteRoutes = filterAsyncRouter(rdata, false, true);
        const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
        rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true });
        router.addRoutes(asyncRoutes);
        commit('SET_ROUTES', rewriteRoutes);
        commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes));
        commit('SET_DEFAULT_ROUTES', sidebarRoutes);
        commit('SET_TOPBAR_ROUTES', sidebarRoutes);
        resolve(rewriteRoutes);
      });
    });
  }
});

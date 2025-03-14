import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import type { RouteLocationNormalized } from 'vue-router';
import { themeMode, type ThemeType } from './types/appTypes';
import { setCssProperty } from '@/utils';
import variable from '@/assets/styles/variables.module.scss';

export const useAppStore = defineStore('app', () => {
  // =========================缓存路由=================================
  const caches = ref<string[]>([]);

  const setCaches = (route: RouteLocationNormalized) => {
    const needCache = route.meta?.keepAlive;
    if (!needCache || caches.value.includes(route.name as string)) {
      return;
    }
    caches.value.push(route.name as string);
  };
  const removeCaches = (routePath: string) => {
    if (caches.value.includes(routePath)) {
      caches.value.splice(caches.value.indexOf(routePath), 1);
    }
  };
  const clearCaches = () => {
    caches.value = [];
  };
  // =====================================================================

  // =========================主题皮肤配置=================================
  /**
   * 主题分为两种模式：亮色和暗黑
   * 亮色下又分为两种风格：纯白色风格 和 背景图风格
   * 暗黑模式就是纯黑背景模式
   * 三种风格不可兼容
   * */
  const theme = reactive<ThemeType>({
    mode: themeMode.light,
    bgImg: new URL('@/assets/bgImgs/bgImg_53.jpeg', import.meta.url).href, // 仅在mode === light时生效
    isWhile: false, // 仅在mode === light时生效
    isDark: false,
    mainColor: variable.MainColor,
  });

  const setMainColor = (color: string) => {
    theme.mainColor = color;
    setCssProperty('--main-color', color);
    localStorage.setItem('theme', JSON.stringify(theme));
  };

  const setTheme = (mode: themeMode, imgUrl?: string) => {
    theme.mode = mode;
    if (theme.isWhile && mode === themeMode.light) {
      theme.isDark = false;
      window.document.documentElement.setAttribute('data-theme', themeMode.light);
      setCssProperty('--base-background', variable.WhileBgColor);
    } else if (theme.isDark && mode === themeMode.dark) {
      theme.isWhile = false;
      window.document.documentElement.setAttribute('data-theme', themeMode.dark);
      setCssProperty('--base-background', variable.DarkBgColor);
    } else {
      theme.mode = themeMode.light;
      theme.isWhile = false;
      theme.isDark = false;
      theme.bgImg = imgUrl || new URL('@/assets/bgImgs/bgImg_53.jpeg', import.meta.url).href;
      window.document.documentElement.setAttribute('data-theme', themeMode.light);
      setCssProperty('--base-background', `url(${theme.bgImg})`);
    }
    localStorage.setItem('theme', JSON.stringify(theme));
  };

  const loadTheme = () => {
    const localTheme = localStorage.getItem('theme');
    if (theme) {
      Object.assign(theme, JSON.parse(localTheme as string));
      setTheme(theme.mode, theme.bgImg);
      setMainColor(theme.mainColor);
    }
  };

  // =====================================================================

  return {
    // 设置路由缓存
    setCaches,
    removeCaches,
    clearCaches,
    caches,
    // 主题设置
    theme,
    setMainColor,
    setTheme,
    loadTheme,
  };
});

<template>
  <a-config-provider
    :locale="zhCN"
    :theme="{
      algorithm: appStore.theme.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: appStore.theme.mainColor,
      },
    }"
  >
    <a-app>
      <RouterView />
    </a-app>
  </a-config-provider>
</template>

<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import { theme } from 'ant-design-vue';
  import { useAppStore } from '@/stores/app';
  import { themeMode } from '@/stores/types/appTypes';

  const appStore = useAppStore();
  appStore.theme.isWhile = true;
  appStore.setTheme(themeMode.light);
</script>
<style scoped></style>

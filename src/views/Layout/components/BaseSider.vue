<template>
  <a-layout-sider :style="siderStyle">
    <a-menu
      v-model:selectedKeys="state.selectedKeys"
      :items="items"
      v-model:openKeys="state.openKeys"
      mode="inline"
      @Select="switchRouter"
    ></a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
  import { h, type CSSProperties } from 'vue';
  import { HomeOutlined } from '@ant-design/icons-vue';
  import { type ItemType } from 'ant-design-vue';
  import router from '@/router';

  const siderStyle: CSSProperties = {
    textAlign: 'left',
    color: '#262626',
    padding: '20px 10px',
    overflow: 'auto',
  };

  const state = reactive({
    selectedKeys: [router.currentRoute.value.name],
    openKeys: [router.currentRoute.value.matched[0].name],
  });

  watch(
    () => router,
    () => {
      state.selectedKeys = [router.currentRoute.value.name];
      if (
        state.openKeys.findIndex((item) => item === router.currentRoute.value.matched[0].path) ===
        -1
      ) {
        state.openKeys.push(router.currentRoute.value.matched[0].name);
      }
    },
    { deep: true },
  );

  function getItem(
    label: string,
    key: string,
    icon?: any,
    children?: ItemType[],
    type?: 'group' | 'divider',
  ): ItemType {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as ItemType;
  }

  const items: ItemType[] = reactive([getItem('首页', 'Home', h(HomeOutlined))]);
  function switchRouter(item: ItemType) {
    router.push({ name: item?.key as string });
  }
</script>

<style scoped lang="scss"></style>

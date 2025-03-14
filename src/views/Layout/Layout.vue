<template>
  <a-layout class="layout">
    <BaseHeader />
    <a-layout class="layout">
      <BaseSider />
      <a-layout-content id="layout-content" :style="contentStyle">
        <router-view>
          <template #default="{ Component, route }">
            <transition name="fade-slide" mode="out-in" appear>
              <keep-alive :include="app.caches">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </transition>
          </template>
        </router-view>
      </a-layout-content>
    </a-layout>
    <a-back-top :target="target" style="bottom: 100px" :visibilityHeight="100" />
  </a-layout>
</template>

<script setup lang="ts">
  import { type CSSProperties } from 'vue';
  import { useAppStore } from '@/stores/app';
  import BaseSider from '@/views/Layout/components/BaseSider.vue';
  import BaseHeader from '@/views/Layout/components/BaseHeader.vue';

  const app = useAppStore();
  const contentStyle: CSSProperties = {
    padding: '24px',
    overflow: 'auto',
    background: '#fafafa',
  };

  const target = () => document.querySelector('#layout-content');
</script>

<style scoped lang="scss">
  .test-tip {
    background: #ffcc70;
    text-align: center;
    padding: 5px;
    letter-spacing: 1px;
    position: sticky;
    top: 60px;
    z-index: 10;
  }
  .layout {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: none;
  }

  /* fade-slide */
  .fade-slide-leave-active,
  .fade-slide-enter-active {
    transition: all 0.2s;
  }

  .fade-slide-enter-from {
    opacity: 0;
    transform: translateX(30px);
  }

  .fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
</style>

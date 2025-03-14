<template>
  <div class="skin-peeler" @click="showDrawer">
    <a-tooltip placement="bottom" title="换肤">
      <a-button :icon="h(SkinOutlined)" type="text" size="large"> </a-button>
    </a-tooltip>
    <a-drawer
      v-model:open="open"
      :closable="false"
      class="custom-class"
      title="主题配置"
      placement="right"
    >
      <a-divider orientation="left" style="margin-top: 0">主题色</a-divider>
      <a-popover trigger="click">
        <template #content>
          <ColorPicker
            is-widget
            picker-type="chrome"
            shape="square"
            :pure-color="theme.mainColor"
            format="hex"
            @pureColorChange="setMainColor"
          />
        </template>
        <a-button class="main-color-pop">
          <div class="in-color" :style="{ background: appStore.theme.mainColor }"></div>
          <span>{{ appStore.theme.mainColor }}</span>
        </a-button>
      </a-popover>
      <a-divider orientation="left">纯色风格</a-divider>
      <div class="use-style">
        <span>纯净白</span>
        <a-switch v-model:checked="theme.isWhile" @change="appStore.setTheme(themeMode.light)" />
      </div>
      <div class="use-style">
        <span>暗夜黑</span>
        <a-switch v-model:checked="theme.isDark" @change="appStore.setTheme(themeMode.dark)" />
      </div>
      <a-divider orientation="left">皮肤列表</a-divider>
      <div class="img-list">
        <div
          v-for="(img, index) in bgImgList.slice((imgCurrent - 1) * 12, imgCurrent * 12)"
          :key="index"
          class="img-item"
        >
          <img
            :src="img"
            :alt="'皮肤' + index"
            :style="{ cursor: theme.isWhile || theme.isDark ? 'not-allowed' : 'pointer' }"
            loading="lazy"
            @click="useImg(img)"
          />
          <CheckCircleFilled v-if="theme.bgImg === img" class="selected-icon" />
        </div>
      </div>
      <a-pagination
        v-model:current="imgCurrent"
        :total="bgImgList.length"
        :defaultPageSize="12"
        :showSizeChanger="false"
        show-less-items
      />
    </a-drawer>
  </div>
</template>
<script setup lang="ts">
  import { SkinOutlined, CheckCircleFilled } from '@ant-design/icons-vue';
  import { h } from 'vue';
  import { useAppStore } from '@/stores/app';
  import { themeMode } from '@/stores/types/appTypes';
  import { ColorPicker } from 'vue3-colorpicker';
  import 'vue3-colorpicker/style.css';
  import { storeToRefs } from 'pinia';

  const appStore = useAppStore();
  const { theme } = storeToRefs(appStore);
  appStore.loadTheme();

  const open = ref(false);
  const bgImgList = reactive<string[]>([]);
  const imgCurrent = ref(1);

  function showDrawer() {
    open.value = true;
  }

  function getBgImgList() {
    for (let i = 0; i < 100; i++) {
      bgImgList.push(new URL(`../../assets/bgImgs/bgImg_${i}.jpeg`, import.meta.url).href);
    }
  }
  watch(open, () => {
    if (open.value && !bgImgList.length) {
      getBgImgList();
    }
  });

  function setMainColor(color: string) {
    appStore.setMainColor(color);
  }

  function useImg(imgUrl: string) {
    if (theme.value.isWhile || theme.value.isDark) return;
    appStore.setTheme(themeMode.light, imgUrl);
  }
</script>

<style scoped lang="scss">
  .use-style {
    padding-left: 20px;
    margin-bottom: 1em;
    span {
      margin-right: 5px;
    }
  }

  .main-color-pop {
    width: 140px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 5px;
    cursor: pointer;
    background: none;
    height: auto;
    display: flex;
    align-items: center;
    column-gap: 10px;
    .in-color {
      width: 60px;
      height: 30px;
      border-radius: 8px;
    }
  }

  .img-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 1em;
    .img-item {
      position: relative;
      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 8px;
      }
      .selected-icon {
        color: var(--green-color);
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1;
        font-size: 20px;
      }
    }
  }
</style>
<style>
  .vc-colorpicker.white {
    background: none !important;
    box-shadow: none !important;
    .vc-colorpicker--container {
      padding: 0;
    }
  }
</style>

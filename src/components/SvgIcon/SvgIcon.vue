<template>
  <svg :style="{ width: size, height: size }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
  defineProps({
    prefix: {
      type: String,
      default: '#icon-',
    },
    //svg矢量图的名字
    name: String,
    //svg图标的颜色
    color: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '16px',
    },
  });
</script>
<style scoped></style>

<template>
  <div class="call-customer">
    <h3>请联系客服协助您注册/找回账号</h3>
    <a-image :src="kefuEwm" :height="400"></a-image>
  </div>
</template>

<script setup lang="ts">
  import kefuEwm from '../../../assets/img/kefu-ewm.jpg';
</script>

<style scoped lang="scss">
  .call-customer {
    text-align: center;
    margin-bottom: 1em;
  }
</style>

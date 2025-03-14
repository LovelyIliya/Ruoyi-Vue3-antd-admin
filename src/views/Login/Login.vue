<template>
  <div class="login-container">
    <div>
      <img alt="tu-xing" src="@/assets/loginImg/tu-xing.png" width="600" height="488" />
    </div>
    <LoginWindow class="login-window" />
  </div>
</template>

<script setup lang="ts">
  import LoginWindow from './LoginWindow/LoginWindow.vue';
  import { useUserStore } from '@/stores/user';
  const userStore = useUserStore();
</script>

<style scoped lang="scss">
  .login-container {
    background-color: #4278f2;
    background-image: url('@/assets/loginImg/bg-img.png');
    background-size: 94% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 120px;
  }
  .tip {
    font-weight: 500;
    font-size: 40px;
    color: #ffffff;
    text-align: center;
    width: 100%;
  }
</style>

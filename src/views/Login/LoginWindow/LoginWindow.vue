<template>
  <a-card class="login-card">
    <a-flex align="center" justify="center" class="example" v-if="otherLogin">
      <a-spin tip="第三方登录中..." v-if="!otherLoginErr" />
      <a-result status="warning" title="token无效" v-else />
    </a-flex>
    <div class="title" >
      {{baseConfig.title}}
    </div>
    <LoginForm v-show="mode === Mode.login" />
    <!--TODO 暂不开放注册和自主找回密码-->
    <!--<ForgotPasd v-if="mode === Mode.retrieve"></ForgotPasd>-->
    <!--<Register v-else-if="mode === Mode.register"></Register>-->
    <!--<CallCustomer v-if="[Mode.retrieve, Mode.register].includes(mode)"></CallCustomer>-->
    <!--<a-flex justify="center" align="center">-->
    <!--  <a-button type="text" @click="switchMode(Mode.register)">-->
    <!--    {{ mode === Mode.register ? '账号登录' : '注册账号' }}-->
    <!--  </a-button>-->
    <!--  <a-divider type="vertical" />-->
    <!--  <a-button type="text" @click="switchMode(Mode.retrieve)">-->
    <!--    {{ mode === Mode.retrieve ? '账号登录' : '忘记密码' }}-->
    <!--  </a-button>-->
    <!--</a-flex>-->
  </a-card>
</template>

<script setup lang="ts">
  import LoginForm from './LoginForm.vue';
  import {useBaseConfig} from "@/hooks/useBaseConfig";
  // import ForgotPasd from './ForgotPasd.vue';
  // import Register from './Register.vue';
  import CallCustomer from './CallCustomer.vue';
  import { useRoute } from 'vue-router';
  import { useUserStore } from '@/stores/user';
  import { setToken } from '@/utils/auth';

  const route = useRoute();
  const userStore = useUserStore();
  const baseConfig = useBaseConfig();
  const enum Mode {
    login = '1',
    register = '2',
    retrieve = '3',
  }
  const mode = ref(Mode.login);
  const otherLogin = ref(false);
  const otherLoginErr = ref(false);

  onMounted(() => {
    if (route.query.token) {
      otherLogin.value = true;
      setToken(route.query.token as string);
      userStore.token = route.query.token as string;
      userStore.getUserInfo().catch(() => {
        otherLoginErr.value = true;
      });
    }
  });

  function switchMode(swMode: Mode) {
    if (mode.value === swMode) {
      mode.value = Mode.login;
    } else {
      mode.value = swMode;
    }
  }
</script>

<style lang="scss" scoped>
  .login-card {
    width: 440px;
    background-size: cover;
    position: relative;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 32px;
    text-align: center;
  }
  .example {
    background: rgba(255, 255, 255, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
</style>

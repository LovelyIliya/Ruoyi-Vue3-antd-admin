<template>
  <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish">
    <a-form-item name="username" :rules="[{ required: true, message: '请输入账号' }]">
      <a-input v-model:value="formState.username" placeholder="手机号" size="large" />
    </a-form-item>

    <a-form-item
      name="password"
      :rules="[{ required: true, message: '请输入密码' }]"
      v-if="!isCodeLogin"
    >
      <a-input-password v-model:value="formState.password" placeholder="密码" size="large" />
    </a-form-item>

    <!--<a-form-item name="code" :rules="[{ required: true, message: '请输入验证码' }]" v-else>-->
    <!--  <GetCode v-model:model-value="formState.code"></GetCode>-->
    <!--</a-form-item>-->

    <a-form-item name="code" :rules="[{ required: true, message: '请输入验证码' }]">
      <a-flex gap="middle">
        <a-input v-model:value="formState.code" placeholder="请输入验证码" size="large" />
        <img
          :src="codeUrl"
          alt="图形验证码"
          title="点击切换"
          height="40"
          style="cursor: pointer"
          @click="getCodeImg"
        />
      </a-flex>
    </a-form-item>

    <a-form-item>
      <a-checkbox v-model:checked="remember">记住密码</a-checkbox>
    </a-form-item>

    <a-form-item>
      <a-flex justify="center">
        <a-button type="primary" html-type="submit" class="login-btn" :loading="logining">
          登录
        </a-button>
      </a-flex>
    </a-form-item>
    <!--TODO 暂不开放短信登录-->
    <!--<Flex justify="center">-->
    <!--  <Button type="link" @click="isCodeLogin = !isCodeLogin">-->
    <!--    {{ isCodeLogin ? '密码登录' : '短信验证码登录' }}-->
    <!--  </Button>-->
    <!--</Flex>-->
  </a-form>
</template>

<script setup lang="ts">
  // import GetCode from './GetCode.vue';
  import { getCodeImgApi, type LoginParams } from '@/api/login';
  import { useUserStore } from '@/stores/user';
  import { encrypt, decrypt } from '@/utils/jsencrypt';
  import router from '@/router';

  const useUser = useUserStore();
  const emit = defineEmits(['close']);
  const isCodeLogin = ref(false);
  const remember = ref(true);
  const logining = ref(false);

  onMounted(() => {
    if (localStorage.getItem('accountInfo')) {
      const accountInfo = JSON.parse(localStorage.getItem('accountInfo')!);
      formState.username = accountInfo.username;
      formState.password = decrypt(accountInfo.password);
    }
  });

  const formState = reactive<LoginParams>({
    username: '',
    password: '',
    code: '',
    uuid: '',
  });

  const codeUrl = ref('');
  const getCodeImg = () => {
    getCodeImgApi().then((res: Recordable) => {
      codeUrl.value = 'data:image/gif;base64,' + res.img;
      formState.uuid = res.uuid;
    });
  };
  getCodeImg();

  const onFinish = () => {
    logining.value = true;
    useUser
      .login(formState)
      .then(() => {
        logining.value = false;
        if (remember.value) {
          localStorage.setItem(
            'accountInfo',
            JSON.stringify({
              username: formState.username,
              password: encrypt(formState.password),
            }),
          );
        } else {
          localStorage.removeItem('accountInfo');
        }
      })
      .catch((err) => {
        logining.value = false;
        getCodeImg();
      });
  };
</script>

<style scoped>
  .login-btn {
    width: 360px;
    height: 46px;
    font-size: 18px;
  }
</style>

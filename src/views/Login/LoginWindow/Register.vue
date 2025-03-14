<template>
  <a-form
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item name="fullName" :rules="[{ required: true, message: '请输入真实姓名' }]">
      <a-input v-model:value="formState.fullName" placeholder="真实姓名" />
    </a-form-item>
    <a-form-item name="ID" :rules="[{ required: true, message: '请输入身份证号' }]">
      <a-input v-model:value="formState.ID" placeholder="身份证号" />
    </a-form-item>
    <a-form-item name="username" :rules="[{ required: true, message: '请输入账号' }]">
      <a-input v-model:value="formState.username" placeholder="手机号" />
    </a-form-item>

    <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
      <a-input-password v-model:value="formState.password" placeholder="新密码" />
    </a-form-item>

    <a-form-item name="rePassword" :rules="[{ validator: validatePass, trigger: 'change' }]">
      <a-input-password v-model:value="formState.rePassword" placeholder="再次输入新密码" />
    </a-form-item>

    <a-form-item name="code" :rules="[{ required: true, message: '请输入验证码' }]">
      <GetCode v-model:model-value="formState.code"></GetCode>
    </a-form-item>

    <a-form-item>
      <a-flex justify="center">
        <a-button type="primary" shape="round" html-type="submit" style="width: 200px">
          注册
        </a-button>
      </a-flex>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import type { Rule } from 'ant-design-vue/es/form';
  import GetCode from './GetCode.vue';

  interface FormState {
    fullName: string;
    ID: string;
    username: string;
    password: string;
    rePassword: string;
    code: string;
  }

  const formState = reactive<FormState>({
    fullName: '',
    ID: '',
    username: '',
    password: '',
    rePassword: '',
    code: '',
  });

  async function validatePass(_rule: Rule, value: string) {
    if (value === '') {
      return Promise.reject('请再次输入新密码');
    } else if (value !== formState.password) {
      return Promise.reject('两次密码输入不一致!');
    } else {
      return Promise.resolve();
    }
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
</script>

<style scoped></style>

<template>
  <a-flex class="user-center" gap="20">
    <a-card class="card" :bordered="false" title="用户信息">
      <div class="avatar-box" @click="openUserAvatar = true">
        <img :src="userStore.userInfo.avatar" alt="头像" class="avatar-img" />
        <a-flex justify="center" align="center" class="edit-avatar">
          <EditFilled />
        </a-flex>
      </div>
      <a-list :data-source="data" :bordered="false">
        <template #renderItem="{ item }">
          <a-list-item v-if="userStore.userInfo.userId">
            <div>
              <component :is="item.icon" />
              <span>&nbsp;{{ item.title }}</span>
            </div>
            <span v-if="item.value !== 'sex'">{{
              userStore.userInfo[item.value as keyof UserInfo]
            }}</span>
            <span v-else>
              <ManOutlined v-if="userStore.userInfo.sex === '0'" style="color: #2f54eb" />
              <WomanOutlined v-else style="color: #eb2f96" />
              {{ getDictValue('sys_user_sex', userStore.userInfo.sex) }}
            </span>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
    <a-card class="card" :bordered="false" title="编辑信息">
      <a-form :label-col="{ span: 4 }" :model="editForm" :rules="editRules" @finish="editBaseInfo">
        <a-form-item label="昵称" name="nickName">
          <a-input v-model:value="editForm.nickName" :maxlength="11" />
        </a-form-item>
        <a-form-item label="手机号码" name="phonenumber">
          <a-input v-model:value="editForm.phonenumber" :maxlength="11" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model:value="editForm.email" />
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group v-model:value="editForm.sex">
            <a-radio value="0">男</a-radio>
            <a-radio value="1">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item style="padding-left: 50px">
          <a-button html-type="submit" type="primary">确定</a-button>
        </a-form-item>
      </a-form>

      <a-divider orientation="left">修改密码</a-divider>
      <a-form
        ref="editPsdFormRef"
        :label-col="{ span: 4 }"
        :model="editPsdForm"
        :rules="editPsdRules"
        @finish="editPsd"
      >
        <a-form-item has-feedback label="旧密码" name="oldPass">
          <a-input-password
            v-model:value="editPsdForm.oldPass"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item has-feedback label="新密码" name="newPass">
          <a-input-password v-model:value="editPsdForm.newPass" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="确认密码" name="checkPass">
          <a-input-password v-model:value="editPsdForm.checkPass" autocomplete="off" />
        </a-form-item>
        <a-form-item style="padding-left: 50px">
          <a-button html-type="submit" type="primary">修改</a-button>
        </a-form-item>
      </a-form>
    </a-card>

    <UserAvatar v-model:open="openUserAvatar" />
  </a-flex>
</template>

<script setup lang="ts">
  import {
    EditFilled,
    UserOutlined,
    ManOutlined,
    WomanOutlined,
    MobileOutlined,
    MailOutlined,
    BankOutlined,
    TagOutlined,
    FieldTimeOutlined,
  } from '@ant-design/icons-vue';
  import { useUserStore } from '@/stores/user';
  import { type UserInfo } from '@/stores/types/userTypes';
  import { useDicts } from '@/hooks/useDicts';
  import { updateUserProfileApi, type EditUserInfo, updateUserPwdApi } from '@/api/user';
  import type { Rule } from 'ant-design-vue/es/form';
  import { message, type FormInstance } from 'ant-design-vue';
  import UserAvatar from './UserAvatar.vue';

  const userStore = useUserStore();
  const { getDicts, getDictValue } = useDicts();
  getDicts('sys_user_sex');

  // ===========================修改头像=========================================
  const openUserAvatar = ref(false);
  // ===========================================================================

  // ============================修改基本信息======================================
  interface Data {
    icon: any;
    title: string;
    value: keyof UserInfo;
  }
  const data: Data[] = [
    {
      icon: h(UserOutlined),
      title: '用户名',
      value: 'userName',
    },
    {
      icon: h(MobileOutlined),
      title: '手机号码',
      value: 'phonenumber',
    },
    {
      icon: h(MailOutlined),
      title: '用户邮箱',
      value: 'email',
    },
    {
      icon: h(BankOutlined),
      title: '所属机构',
      value: 'deptName',
    },
    {
      icon: h(TagOutlined),
      title: '性别',
      value: 'sex',
    },
    {
      icon: h(FieldTimeOutlined),
      title: '注册时间',
      value: 'createTime',
    },
  ];

  const editForm = ref<EditUserInfo | Recordable>({});
  watchEffect(() => {
    editForm.value = {
      nickName: userStore.userInfo.nickName,
      phonenumber: userStore.userInfo.phonenumber,
      email: userStore.userInfo.email,
      sex: userStore.userInfo.sex,
      userId: userStore.userInfo.userId,
    };
  });
  const validatPhone = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('请输入手机号');
    } else {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return Promise.reject('手机号格式不正确');
      }
      return Promise.resolve();
    }
  };
  const editRules: Record<string, Rule[]> = {
    nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
    phonenumber: [{ required: true, validator: validatPhone, trigger: 'blur' }],
  };

  const editBaseInfo = () => {
    updateUserProfileApi(unref(editForm) as EditUserInfo).then((res) => {
      userStore.getUserInfo();
      message.success('更新信息成功');
    });
  };

  //   =======================================================================================

  //   =======================修改密码==========================================================
  interface EditPsdForm {
    oldPass: string;
    newPass: string;
    checkPass: string;
  }
  const editPsdFormRef = ref<FormInstance>();
  const editPsdForm = reactive<EditPsdForm>({
    oldPass: '',
    newPass: '',
    checkPass: '',
  });
  const validatePass = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('请输入新密码');
    } else {
      if (editPsdForm.checkPass !== '') {
        editPsdFormRef.value?.validateFields('checkPass');
      }
      return Promise.resolve();
    }
  };
  const validatePass2 = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('请再次输入新密码');
    } else if (value !== editPsdForm.newPass) {
      return Promise.reject('两次密码输入不一致!');
    } else {
      return Promise.resolve();
    }
  };

  const editPsdRules: Record<string, Rule[]> = {
    oldPass: [{ required: true, message: '请输入旧密码', trigger: 'change' }],
    newPass: [{ required: true, validator: validatePass, trigger: 'change' }],
    checkPass: [{ required: true, validator: validatePass2, trigger: 'change' }],
  };

  const editPsd = () => {
    updateUserPwdApi(editPsdForm.oldPass, editPsdForm.newPass).then((res) => {
      message.success('修改密码成功');
      editPsdFormRef.value?.resetFields();
    });
  };
  //   =======================================================================================
</script>

<style scoped lang="scss">
  .user-center {
    height: 100%;
  }
  .card {
    flex: 0.5;
    min-height: 630px;
  }

  .avatar-box {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 0 auto 1em;
    .avatar-img {
      width: 100%;
      height: 100%;
    }
    .edit-avatar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      opacity: 0;
      transition: opacity 0.2s ease-in;
      color: #fff;
      font-size: 28px;
    }
    &:hover .edit-avatar {
      opacity: 1;
    }
  }
</style>

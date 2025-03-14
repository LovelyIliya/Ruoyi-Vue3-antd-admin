<template>
  <a-modal
    :open="open"
    width="800px"
    :title="getTitle"
    destroy-on-close
    :footer="null"
    :mask-closable="false"
    @cancel="handleCancel"
  >
    <a-card :bordered="false">
      <a-form
        layout="vertical"
        class="modal-form"
        ref="formRef"
        :model="form"
        :rules="rules"
        @finish="submitForm"
      >
        <a-form-item label="姓名" name="name">
          <a-input v-model:value="form.name" placeholder="请输入角色名称" allow-clear />
        </a-form-item>
        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="form.phone" placeholder="请输入角色描述" allow-clear />
        </a-form-item>
        <a-flex gap="24" justify="end">
          <a-button type="primary" html-type="submit">提交</a-button>
          <a-button @click="formRef.resetFields()">重置</a-button>
        </a-flex>
      </a-form>
    </a-card>
  </a-modal>
</template>

<script setup lang="ts">
  import type { Rule } from 'ant-design-vue/es/form';

  const emit = defineEmits(['update:open', 'reload']);
  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
    isChange: {
      type: Boolean,
      default: false,
    },
    dataObj: {
      type: Object,
      default: () => {},
    },
  });

  watch(
    () => props.open,
    (newValue) => {
      if (!newValue) {
        emit('reload');
      }
    },
  );
  function handleCancel() {
    emit('update:open', false);
  }
  const getTitle = computed(() => {
    return props.isChange ? '修改用户' : '新增用户';
  });
  const formRef = ref();
  const form = ref({
    name: '',
    phone: '',
  });

  const rules: Record<string, Rule[]> = {
    name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  };
  function submitForm() {}
</script>

<style scoped lang="scss"></style>

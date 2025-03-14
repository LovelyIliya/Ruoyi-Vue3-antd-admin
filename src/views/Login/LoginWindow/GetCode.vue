<template>
  <a-input v-model:value="inputValue" placeholder="验证码" @change="handleInput">
    <template #addonAfter>
      <a-button type="link" style="height: 30px" :disabled="!!getCodeInter" @click="getCode">
        {{ getCodeInter ? reTime + '秒后重新获取' : '获取验证码' }}
      </a-button>
    </template>
  </a-input>
</template>

<script setup lang="ts">
  const emit = defineEmits(['update:modelValue']);
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  });

  const inputValue = ref(props.modelValue);
  const reTime = ref(60);
  const getCodeInter = ref();

  function getCode() {
    getCodeInter.value = setInterval(() => {
      if (reTime.value < 2) {
        clearInterval(getCodeInter.value);
        getCodeInter.value = null;
      }
      reTime.value--;
    }, 1000);
  }

  function handleInput() {
    emit('update:modelValue', inputValue.value);
  }
</script>

<style scoped></style>

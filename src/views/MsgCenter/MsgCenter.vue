<template>
  <a-card style="height: 100%">
    <a-flex justify="space-between" style="margin-bottom: 1em">
      <a-segmented v-model:value="typeValue" :options="typeData" />
      <a-button :icon="h(ReadOutlined)">全部已读</a-button>
    </a-flex>
    <a-list :data-source="data">
      <template #renderItem="{ item }">
        <a-card :body-style="{ padding: 0 }">
          <a-list-item>
            <a-list-item-meta description="2024-12-10 12:00:00">
              <template #title>
                <a-flex style="font-weight: bold; font-size: 18px" align="center" gap="10">
                  {{ item.title }}
                  <a-badge :dot="true" />
                </a-flex>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </a-card>
      </template>
    </a-list>
  </a-card>
</template>

<script setup lang="ts">
  import { h } from 'vue';
  import { ReadOutlined } from '@ant-design/icons-vue';

  const typeData = reactive(['系统消息', '订阅消息', '订单消息']);
  const typeValue = ref(typeData[0]);

  const data = ref([{ title: '检测完成' }]);
</script>

<style scoped lang="scss"></style>

<template>
  <!--复制粘贴此模板，快速创建查询统一样式表格页面-->
  <div>
    <a-card :bordered="false" class="form-card" ref="formCardRef">
      <a-flex justify="space-between" align="start">
        <a-form layout="inline" ref="formRef" :model="form" class="page-form">
          <a-form-item label="筛选条件1" name="name">
            <a-input placeholder="请输入" v-model:value="form.name" allow-clear />
          </a-form-item>
          <a-form-item label="筛选条件2" name="phone">
            <a-input placeholder="请输入" v-model:value="form.phone" allow-clear />
          </a-form-item>
        </a-form>
        <a-space size="middle">
          <a-button :loading="tableLoading" @click="resetParams(formRef)">重置</a-button>
          <a-button :loading="tableLoading" type="primary" @click="getTableData">查询</a-button>
        </a-space>
      </a-flex>
    </a-card>
    <a-card :bordered="false" class="container-card" ref="containerRef" title="角色列表">
      <template #extra>
        <a-button type="primary" @click="addEnterprise">新建</a-button>
      </template>
      <a-table
        bordered
        :scroll="{ y: tableHeight }"
        :row-class-name="rowClassName"
        :columns="columns"
        :data-source="tableData"
        :loading="tableLoading"
        :pagination="paginationConfig"
        @change="paginationChange"
      >
        <template #bodyCell="{ record, column, index }">
          <template v-if="column.dataIndex === 'index'">
            {{ index + 1 }}
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button type="link">修改</a-button>
            <a-button type="link" danger>删除</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
    <template-form-modal v-model:open="showModal" :data-obj="editData" @reload="getTableData" />
  </div>
</template>

<script setup lang="ts">
  import { useTableQuery } from '@/hooks/useTableQuery';
  import { useTableHeight } from '@/hooks/useTableHeight';
  // import {  } from '@/api/'; 导入api查询接口
  import TemplateFormModal from './TemplateFormModal.vue';

  interface Form {
    name: string;
    phone: string;
  }
  const form = reactive<Form>({
    name: '',
    phone: '',
  });

  interface Data {
    nsrmc: string;
  }
  const formCardRef = ref();
  const containerRef = ref();
  const formRef = ref();
  const {
    tableData,
    rowClassName,
    tableLoading,
    paginationConfig,
    paginationChange,
    getTableData,
    resetParams,
  } = useTableQuery<Data>(form, () => {});
  const { tableHeight } = useTableHeight(tableData, containerRef, formCardRef);

  onMounted(() => {
    // getTableData();
  });
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
      align: 'center',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
    },
  ];
  const showModal = ref(false);
  const isChange = ref(false);
  const editData = ref<Recordable>({});
  function addEnterprise() {
    isChange.value = false;
    showModal.value = true;
  }
</script>

<style scoped lang="scss"></style>

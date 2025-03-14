import type { TablePaginationConfig, TableProps } from 'ant-design-vue';
import { matchText } from '@/utils/index';

/** 使用此hook快速获取表格数据及实现分页等功能逻辑
 *
 * @param {Object} params 查询参数
 * @param {Function} queryApi 要调用的接口
 * @param {Function} handleRes 自定义接口结果处理，如果接口返回字段和默认取的字段不一致，可传此参数
 * @param {String} matchFields 匹配字段名，搜索时匹配结果关键字进行高亮
 */
export function useTableQuery<T extends Recordable>(
  params: Recordable,
  queryApi: Fn,
  handleRes?: Fn,
  matchFields?: string | { queryField: string; resField: string },
) {
  const tableData = ref<T[]>([]);
  const tableLoading = ref(false);
  const rowClassName = (_record: Recordable, index: number) =>
    index % 2 === 1 ? 'table-striped' : null;
  const baseQueryParams = ref({
    pageSize: 10,
    pageNum: 1,
    total: 0,
  });

  const paginationConfig = computed(() => {
    const startNum = baseQueryParams.value.pageSize * (baseQueryParams.value.pageNum - 1) || 1;
    const endNum = baseQueryParams.value.pageSize * baseQueryParams.value.pageNum;
    return {
      current: baseQueryParams.value.pageNum,
      defaultPageSize: baseQueryParams.value.pageSize,
      total: baseQueryParams.value.total,
      showSizeChanger: true,
      showTotal: (total: number) =>
        `第 ${startNum.toLocaleString()} - ${endNum.toLocaleString()} 条 / 总共 ${total.toLocaleString()} 条`,
    };
  });

  function getTableData(isSearch?: boolean) {
    tableLoading.value = true;
    isSearch && (baseQueryParams.value.pageNum = 1);
    queryApi({ ...unref(params), ...baseQueryParams.value })
      .then((res: Response) => {
        if (handleRes) {
          handleRes(res);
        } else {
          tableData.value = res.rows;
          baseQueryParams.value.total = res.total;
        }
        if (matchFields) {
          tableData.value.forEach((item: Recordable) => {
            if (typeof matchFields === 'string') {
              if (!unref(params)[matchFields]) return;
              item[matchFields] = matchText(unref(params)[matchFields], item[matchFields]);
            } else {
              if (!unref(params)[matchFields.queryField]) return;
              item[matchFields.resField] = matchText(
                unref(params)[matchFields.queryField],
                item[matchFields.resField],
              );
            }
          });
        }
        tableLoading.value = false;
      })
      .catch((err: Response) => {
        tableLoading.value = false;
      });
  }
  /**
   * 重置表单方法
   * @param {Object} formRef 传入表单对象，调用重置字段方法
   * @param {Function} queryFn 自定义查询方法
   */
  function resetParams(formRef: any, queryFn?: Fn) {
    formRef.resetFields();
    baseQueryParams.value.pageNum = 1;
    baseQueryParams.value.pageSize = 10;
    baseQueryParams.value.total = 0;
    queryFn ? queryFn() : getTableData();
  }

  // 切换分页、修改显示条数
  const paginationChange = (page: TablePaginationConfig | number, pageSize: number) => {
    if (typeof page === 'number') {
      baseQueryParams.value.pageNum = page;
    } else {
      baseQueryParams.value.pageNum = page.current as number;
      baseQueryParams.value.pageSize = page.pageSize as number;
    }
    if (typeof pageSize === 'number') {
      baseQueryParams.value.pageSize = pageSize;
    }
    getTableData();
  };

  return {
    tableData,
    rowClassName,
    tableLoading,
    paginationConfig,
    baseQueryParams,
    getTableData,
    resetParams,
    paginationChange,
  };
}

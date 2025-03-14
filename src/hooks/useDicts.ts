import { getDictsApi } from '@/api/system';

enum Color {
  default = 'default',
  info = 'default',
  primary = 'blue',
  warning = 'orange',
  success = 'green',
  danger = 'red',
}

type listClass = 'default' | 'info' | 'primary' | 'warning' | 'success' | 'danger';

interface DictItem {
  dictLabel: string;
  dictValue: string;
  listClass: listClass;
}

export type Dict = {
  label: string;
  value: string;
  color: string;
};

export function useDicts() {
  const dictRecords = ref<Record<string, Dict[]>>({});

  /**
   * 获取字典
   * @param {string} dictType 字典类型获取字典数据，如：sys_user_sex
   */
  async function getDicts(dictType: string): Promise<Dict[]> {
    if (!dictType) return [];
    const sessionDicts = JSON.parse(sessionStorage.getItem('sessionDicts') as string);
    if (sessionDicts && sessionDicts[dictType] && sessionDicts[dictType].length) {
      dictRecords.value[dictType] = sessionDicts[dictType];
      return dictRecords.value[dictType];
    }
    const res = await getDictsApi(dictType);
    if (res.code === 200) {
      dictRecords.value[dictType] = res.data.map((item: DictItem) => {
        return {
          label: item.dictLabel,
          value: item.dictValue,
          color: Color[item.listClass],
        };
      });
      sessionStorage.setItem(
        'sessionDicts',
        JSON.stringify(Object.assign(sessionDicts || {}, dictRecords.value)),
      );
    }
    return dictRecords.value[dictType];
  }

  /**
   * 翻译字典
   * @param {string} dictType 字典类型获取字典数据，如：sys_user_sex
   * @param value 要翻译的字典值
   */
  function getDictValue(dictType: string, value: string) {
    if (dictRecords.value[dictType]) {
      const data = dictRecords.value[dictType].find(
        (f: Recordable) => f.value === String(value),
      ) as Dict;
      if (data) {
        return data.label;
      } else {
        return '';
      }
    }
    return '';
  }

  /**
   * 字典值回显颜色
   * @param {string} dictType 字典类型获取字典数据，如：sys_user_sex
   * @param value 要获取颜色的字典值
   */
  function getDictColor(dictType: string, value: string) {
    if (dictRecords.value[dictType]) {
      const data = dictRecords.value[dictType].find(
        (f: Recordable) => f.value === String(value),
      ) as Dict;
      if (data) {
        return data.color;
      } else {
        return '';
      }
    }
    return '';
  }
  return { getDicts, getDictValue, getDictColor };
}

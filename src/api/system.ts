import request from '@/utils/axios';
import { ContentTypeEnum } from '@/enums/axiosEnum';

// 根据字典类型查询字典数据信息
export function getDictsApi(dictType: string) {
  return request.get({
    url: '/system/dict/data/type/' + dictType,
  });
}
// 获取路由
export function routerApi() {
  return request.get({
    url: '/getRouters',
  });
}

// 下载
export function downloadFileidApi(data: string) {
  return request.get({
    url: '/common/download/' + data,
    responseType: 'blob',
    notToken: true,
  });
}

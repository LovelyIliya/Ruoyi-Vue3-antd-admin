import type { AxiosResponse, InternalAxiosRequestConfig } from './types';
import { message } from 'ant-design-vue';
import { ContentTypeEnum } from '@/enums/axiosEnum';
import qs from 'qs';
import { errorCode } from './types/errorCode';
import { useUserStore } from '@/stores/user';
import { objToFormData } from '@/utils';

const defaultRequestInterceptors = (config: InternalAxiosRequestConfig) => {
  if (
    config.method === 'post' &&
    config.headers['Content-Type'] === ContentTypeEnum.FORM_URLENCODED
  ) {
    config.data = qs.stringify(config.data);
  } else if (
    config.method === 'post' &&
    config.headers['Content-Type'] === ContentTypeEnum.FORM_DATA &&
    !(config.data instanceof FormData)
  ) {
    config.data = objToFormData(config.data);
  }
  if (config.method === 'get' && config.params) {
    let url = config.url as string;
    url += '?';
    const keys = Object.keys(config.params);
    for (const key of keys) {
      if (config.params[key] !== void 0 && config.params[key] !== null) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`;
      }
    }
    url = url.substring(0, url.length - 1);
    config.params = {};
    config.url = url;
  }
  return config;
};

const defaultResponseInterceptors = (response: AxiosResponse) => {
  // 未设置状态码则默认成功状态
  const code = response.data.code || 200;
  // 获取错误信息
  const msg = errorCode[code] || response.data.msg || errorCode['default'];
  if (
    response?.config?.responseType === 'blob' ||
    response?.config?.responseType === 'arraybuffer' ||
    response.config.url === '/pjj/jg/queryZhgjsj'
  ) {
    // 如果是文件流，直接过
    return response.data;
  } else if (code === 200 || (response.config.url === '/title/invoiceTitle' && code === '00')) {
    return response.data;
  } else {
    message.error({ content: msg, key: 'responseErr' });
    if (code === 401) {
      const userStore = useUserStore();
      userStore.logout(true);
    }
    return Promise.reject(response.data);
  }
};

export { defaultResponseInterceptors, defaultRequestInterceptors };

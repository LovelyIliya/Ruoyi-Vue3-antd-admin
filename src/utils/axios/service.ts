import axios, { AxiosError } from 'axios';
import { defaultRequestInterceptors, defaultResponseInterceptors } from './config';
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  RequestConfig,
  AxiosResponse,
} from './types';
import { message } from 'ant-design-vue';
import { useBaseConfig } from '@/hooks/useBaseConfig';
const baseConfig = useBaseConfig();

export const PATH_URL = baseConfig.baseApiPath + baseConfig.baseApiPrefix;

const abortControllerMap: Map<string, AbortController> = new Map();

const axiosInstance: AxiosInstance = axios.create({
  timeout: 60000,
  baseURL: PATH_URL,
});

axiosInstance.interceptors.request.use((res: InternalAxiosRequestConfig) => {
  const controller = new AbortController();
  const url = res.url || '';
  res.signal = controller.signal;
  abortControllerMap.set(url, controller);
  return res;
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const url = res.config.url || '';
    abortControllerMap.delete(url);
    return res;
  },
  (error: AxiosError) => {
    console.log('err： ' + error); // for debug
    message.error(error.message);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(defaultRequestInterceptors);
axiosInstance.interceptors.response.use(defaultResponseInterceptors);

const service = {
  request: (config: RequestConfig) => {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any);
      }

      axiosInstance
        .request(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  },
  cancelRequest: (url: string | string[]) => {
    const urlList = Array.isArray(url) ? url : [url];
    for (const _url of urlList) {
      abortControllerMap.get(_url)?.abort();
      abortControllerMap.delete(_url);
    }
  },
  cancelAllRequest() {
    for (const [_, controller] of abortControllerMap) {
      controller.abort();
    }
    abortControllerMap.clear();
  },
};

export default service;

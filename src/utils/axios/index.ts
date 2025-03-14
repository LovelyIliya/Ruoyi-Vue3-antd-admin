import service from './service';
import { ContentTypeEnum } from '@/enums/axiosEnum';
import { useUserStore } from '@/stores/user';

const request = (option: AxiosConfig) => {
  const { url, method, params, data, headers, responseType, notToken } = option;

  const userStore = useUserStore();
  const ngrok: Recordable = {};
  if (import.meta.env.MODE === 'development') {
    ngrok['ngrok-skip-browser-warning'] = '69420';
  }
  return service.request({
    url: url,
    method,
    params: params,
    data: data,
    responseType: responseType,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
      Authorization: notToken ? '' : (userStore.token ?? ''),
      ...headers,
      ...ngrok,
    },
  });
};

export default {
  get: <T = any>(option: AxiosConfig) => {
    return request({ method: 'get', ...option }) as Promise<Response<T>>;
  },
  post: <T = any>(option: AxiosConfig) => {
    return request({ method: 'post', ...option }) as Promise<Response<T>>;
  },
  delete: <T = any>(option: AxiosConfig) => {
    return request({ method: 'delete', ...option }) as Promise<Response<T>>;
  },
  put: <T = any>(option: AxiosConfig) => {
    return request({ method: 'put', ...option }) as Promise<Response<T>>;
  },
  cancelRequest: (url: string | string[]) => {
    return service.cancelRequest(url);
  },
  cancelAllRequest: () => {
    return service.cancelAllRequest();
  },
};

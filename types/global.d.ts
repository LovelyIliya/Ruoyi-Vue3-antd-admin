import { RawAxiosRequestHeaders } from 'axios';
declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  declare interface Fn<T = any> {
    (...arg: T[]): T;
  }

  declare type Nullable<T> = T | null;

  declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>;

  declare type RemoveReadonly<T> = {
    -readonly [P in keyof T]: T[P];
  };

  declare type ComponentRef<T> = InstanceType<T>;

  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;

  declare type AxiosContentType =
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain';

  declare type AxiosMethod = 'get' | 'post' | 'delete' | 'put';

  declare type AxiosResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

  declare interface AxiosConfig {
    params?: any;
    data?: any;
    url: string;
    method?: AxiosMethod;
    headers?: RawAxiosRequestHeaders;
    responseType?: AxiosResponseType;
    notToken?: boolean;
  }

  declare interface Response<T = any> {
    code: number;
    data: T;
    rows: T;
    msg: string;
    token?: string;
    total: number;
    result?: T;
  }

  declare interface QueryParams<T = any> {
    pageSize: number;
    pageNum: number;
    total?: number;
    [x: string]: T;
  }

  declare interface ViteEnv {
    VITE_APP_TITLE: string;
    VITE_API_BASE_PATH: string;
    VITE_GLOB_API_URL_PREFIX: string;
    VITE_PROXY: Array<[string, string]>;
    VITE_PUBLIC_PATH: string;
  }
}

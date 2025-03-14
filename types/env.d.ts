/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent, readonly } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'qs' {
  export function parse(query: string | Record<string, any>, options?: any): Record<string, any>;
  export function stringify(obj: Record<string, any>, options?: any): string;
}

declare module 'nprogress' {
  import NProgress from 'nprogress';
  export default NProgress;
}

declare module '@/utils/excelHelper.js' {
  export function exportExcel<T>(opt: T): void;
  export function readExcelFile(file: Recordable, sheetName?: number): Promise<any[]>;
}

declare module 'html2pdf.js' {
  import html2pdf from 'html2pdf.js';
  export default html2pdf;
}

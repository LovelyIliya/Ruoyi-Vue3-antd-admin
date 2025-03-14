# Ruoyi-Vue3-antd-admin
# 开发中....

基于若依服务端使用vue3+ts+antdvue开发的前端中后台管理系统

vue3 + vite + vue-router + pinia + ant-design-vue

node ≥ 18
## 规范
组件命名应始终以大写字母开头：MyComponent

重复逻辑需抽离hooks

接口函数名称以Api结尾

文字颜色等样式统一使用css变量 src/assets/styles/base.scss

## 统一样式查询表格页面可复制`src/views/_TemplateTablePage`文件，并修改相关代码，可快速产出查询页面

## hooks
获取系统配置：src/hooks/useBaseConfig.ts

使用示例：

```
import { useBaseConfig } from '@/hooks/useBaseConfig';
const baseConfig = useBaseConfig();
baseConfig.title;
```

获取字典：src/hooks/useDict.ts

使用示例：
```
import { useDicts } from '@/hooks/useDicts';
const { getDicts, getDictValue,getDictColor } = useDicts();
getDicts('sys_user_sex');
<a-tag :color="getDictColor('pjj_status_jczt', record[column.dataIndex])">
    {{ getDictValue('pjj_status_jczt', record[column.dataIndex]) }}
</a-tag>
```

获取分页数据：src/hooks/useTableQuery.ts
使用示例：src/views/_TemplateTablePage/TemplateTablePage.vue

设置表格高度：src/hooks/useTableHeight.ts
使用示例：src/views/_TemplateTablePage/TemplateTablePage.vue

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

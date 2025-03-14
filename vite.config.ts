import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv, type ProxyOptions } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  const config: UserConfig = {
    plugins: [
      vue(),
      vueJsx(),
      createHtmlPlugin(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      AutoImport({ imports: ['vue', 'vue-router', 'pinia'], dts: 'src/auto-import.d.ts' }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    base: env.VITE_PUBLIC_PATH,
    build: {
      outDir: 'piaojian_dist',
    },
    esbuild: {
      drop: mode === 'production' ? ['console'] : [],
    },
    css: {
      preprocessorOptions: {
        scss: { api: 'modern-compiler' },
      },
    },
    server: {
      // 跨域代理在.env.dev配置文件中进行配置
      proxy:
        mode === 'development'
          ? ((() => {
              const proxyObj: Record<string, ProxyOptions> = {};
              for (const [prefix, target] of JSON.parse(env.VITE_PROXY)) {
                proxyObj[prefix] = {
                  target: target,
                  changeOrigin: true,
                  rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
                };
              }
              return proxyObj;
            })() as Record<string, string | ProxyOptions>)
          : {},
    },
  };
  return config;
});

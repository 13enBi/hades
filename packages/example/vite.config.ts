import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import craeteViteNodeDevPlugin from './devPlugin';

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        craeteViteNodeDevPlugin({
            serverOptions: {
                transformMode: {
                    web: [/([jt]sx?)|(vue)/i]
                }
            }
        })
    ],

    optimizeDeps: { exclude: ['yoga-layout-prebuilt', 'chalk'] },
    build: {
        rollupOptions: {
            input: './src/index.ts'
        }
    }
});

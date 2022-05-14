import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import createViteNodeDevPlugin from './devPlugin';

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        createViteNodeDevPlugin({
            serverOptions: {
                transformMode: {
                    web: [/([jt]sx?)|(vue)/i]
                }
            }
        })
    ],

    optimizeDeps: {
        exclude: ['yoga-layout-prebuilt', 'chalk', 'terminal-image', 'got']
    },
    build: {
        rollupOptions: {
            input: './src/index.ts'
        }
    }
});

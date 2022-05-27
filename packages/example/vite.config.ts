import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import hades from '@hades/vite';

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        hades({
            server: {
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

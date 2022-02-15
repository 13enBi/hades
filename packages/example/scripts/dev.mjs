import { createServer } from 'vite';
import { ViteNodeServer } from 'vite-node/server';
import { ViteNodeRunner } from 'vite-node/client';

const run = async () => {
    const server = await createServer({
        logLevel: 'error',
        root: './',
        clearScreen: true,
        configFile: './vite.config.ts',
        watch: { usePolling: true }
    });
    await server.pluginContainer.buildStart({});

    const node = new ViteNodeServer(server, { transformMode: { web: [/./] } });

    const runner = new ViteNodeRunner({
        root: server.config.root,
        base: server.config.base,
        fetchModule(id) {
            return node.fetchModule(id);
        }
    });

    await runner.executeId('/@vite/env');

    await runner.executeFile('./src/index.ts');

    server.watcher.addListener('change', async () => {
        await server.close();
        run();
    });
};

run();

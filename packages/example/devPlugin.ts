import { ViteNodeServer } from 'vite-node/server';
import { ViteNodeRunner } from 'vite-node/client';
import { ViteDevServer, Plugin } from 'vite';

type Params<T> = T extends new (...args: infer P) => any ? P : never;

interface Options {
    serverOptions?: Params<typeof ViteNodeServer>[1];
    clientOptions?: Partial<Params<typeof ViteNodeRunner>[0]>;
}

const craeteViteNodeDevPlugin = ({
    serverOptions,
    clientOptions
}: Options): Plugin => {
    let viteNodeServer: ViteNodeServer;
    let viteNodeRunner: ViteNodeRunner;

    const run = async (server: ViteDevServer) => {
        const input = server.config.build.rollupOptions.input;
        if (!input) return;

        viteNodeServer?.server.restart();

        viteNodeServer = new ViteNodeServer(server, serverOptions);
        viteNodeRunner = new ViteNodeRunner({
            root: server.config.root,
            base: server.config.base,
            fetchModule: id => viteNodeServer.fetchModule(id),
            ...clientOptions
        });

        await viteNodeRunner.executeId('/@vite/env');

        const files =
            typeof input === 'string'
                ? [input]
                : Array.isArray(input)
                ? input
                : Object.values(input);

        files.forEach(file => {
            viteNodeRunner.executeFile(file);
        });
    };

    return {
        name: 'vite-node-dev',
        handleHotUpdate: async ({ server }) => {
            await run(server);
        },
        configureServer: async server => {
            await run(server);
        }
    };
};

export default craeteViteNodeDevPlugin;

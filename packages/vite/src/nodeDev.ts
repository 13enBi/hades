import { ViteDevServer } from 'vite';
import { ViteNodeRunner } from 'vite-node/client';
import { ViteNodeServer } from 'vite-node/server';

type Params<T> = T extends new (...args: infer P) => any ? P : never;

export interface Options {
    server?: Params<typeof ViteNodeServer>[1];
    client?: Partial<Params<typeof ViteNodeRunner>[0]>;
}

export const runNodeDevServer = async (
    server: ViteDevServer,
    { server: serverOptions, client: clientOptions }: Options
) => {
    const input = server.config.build.rollupOptions.input;
    if (!input) return;

    const viteNodeServer = new ViteNodeServer(server, serverOptions);
    const viteNodeRunner = new ViteNodeRunner({
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

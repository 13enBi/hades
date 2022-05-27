import { runNodeDevServer, Options } from './nodeDev';
import { Plugin, ResolvedConfig } from 'vite';
import { HADES_HMR_EVENT, HADES_MODE_ENV } from './constant';
import { runWorker } from './worker';

const unResolve = () => new Promise(() => {});

export const hadesVitePlugin = (options: Options): Plugin => {
    const isHadesMode = !!process.env[HADES_MODE_ENV];

    let config: ResolvedConfig;

    return {
        name: 'vite-hades-dev',
        enforce: 'post',

        configResolved: resolvedConfig => {
            config = resolvedConfig;
        },

        handleHotUpdate: () => {
            if (!isHadesMode) return;

            process.send?.(HADES_HMR_EVENT);
        },

        configureServer: async server => {
            if (isHadesMode) await runNodeDevServer(server, options);
            else if (config.mode === 'development' && !isHadesMode) {
                runWorker();
                await unResolve();
            }
        }
    };
};

export default hadesVitePlugin;

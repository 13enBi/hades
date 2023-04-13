import { ChildProcess, fork } from 'child_process';

import { HADES_HMR_EVENT, HADES_MODE_ENV } from './constant';

const viteStarter = './node_modules/vite/bin/vite.js';
const env = { [HADES_MODE_ENV]: HADES_MODE_ENV, ...process.env };

let worker: ChildProcess;

const createWorker = () =>
    fork(viteStarter, { env }).on('message', async value => {
        if (value !== HADES_HMR_EVENT) return;

        worker?.kill();
        runWorker();
    });

export const runWorker = () => {
    worker = createWorker();
};

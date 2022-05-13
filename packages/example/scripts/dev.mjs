import { Worker, } from 'worker_threads'

const viteStarter = './node_modules/vite/bin/vite.js'

let worker

const createWorker = () => new Worker(viteStarter).on('message', async (value) => {
    if (value !== 'hot-update') return
    await worker?.terminate();

    worker = createWorker()
})

worker = createWorker()
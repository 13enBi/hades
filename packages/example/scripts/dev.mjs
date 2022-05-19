import { fork } from 'child_process'

const viteStarter = './node_modules/vite/bin/vite.js'

let worker

const createWorker = () => fork(viteStarter).on('message', async (value) => {
    if (value !== 'hot-update') return
    await worker?.kill()

    worker = createWorker()
})

worker = createWorker()
import fs, { readFileSync } from 'fs';
import os from 'os';
import minimist from 'minimist';
import { argv } from 'process';
import { execa } from 'execa';

const PACKAGES_PATH = './packages';

const readPackageJson = path => {
    const json = readFileSync(`${path}/package.json`, 'utf8');
    return JSON.parse(json);
};

const getAllTargets = () =>
    fs.readdirSync(PACKAGES_PATH).map(path => `${PACKAGES_PATH}/${path}`);

const getTargets = args => {
    const argTargets = args.filter ?? args.f ?? args._;
    const targets = argTargets?.length ? argTargets : getAllTargets();

    return targets
        .map(target => [target, readPackageJson(target)])
        .filter(
            ([, packageJson]) =>
                !packageJson.private && packageJson.buildOptions.input
        );
};

const runParallel = async (promises, max) => {
    let currentIndex = 0;

    const result = [];

    const run = async () => {
        const index = currentIndex++;
        const p = promises[index];
        if (!p) return;

        try {
            result[index] = {
                status: 'fulfilled',
                value: await p()
            };
        } catch (reason) {
            result[index] = {
                status: 'rejected',
                reason
            };
        } finally {
            await run();
        }
    };

    await Promise.all([...Array(max)].map(run));

    return result;
};

const run = async () => {
    const args = minimist(argv.slice(2));
    const targets = getTargets(args);

    const tasks = targets.map(async ([path, { buildOptions }]) => {
        fs.rmdirSync(`${path}/dist`, { recursive: true });

        await execa(
            'pnpm tsup-node',
            [
                buildOptions.input,
                '--target',
                'node16',
                '--dts',
                '--format',
                'cjs,esm'
            ],
            { stdio: 'inherit', cwd: path }
        );
    });

    await runParallel(tasks, os.cpus().length);
};

run();

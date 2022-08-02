import { readFileSync, readdirSync } from 'fs';
import { rm } from 'fs/promises';
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
    readdirSync(PACKAGES_PATH).map(path => `${PACKAGES_PATH}/${path}`);

const shouldArray = value => (Array.isArray(value) ? value : [value]);

const getTargets = args => {
    const argTargets = shouldArray(args.filter ?? args.f ?? args._);
    const targets = argTargets.length ? argTargets : getAllTargets();

    return targets
        .map(target => [target, readPackageJson(target)])
        .filter(
            ([, packageJson]) =>
                !packageJson.private && packageJson.buildOptions.input
        );
};

const runParallel = async (source, iterator, max) => {
    let currentIndex = 0;

    const result = [];

    const run = async () => {
        if (currentIndex >= source.length) return;

        const index = currentIndex++;
        const item = source[index];

        try {
            result[index] = {
                status: 'fulfilled',
                value: await iterator(item, index)
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

    await runParallel(
        targets,
        ([path, { buildOptions }]) =>
            rm(`${path}/dist`, { recursive: true }).then(() =>
                execa(
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
                )
            ),
        os.cpus().length
    );
};

run();

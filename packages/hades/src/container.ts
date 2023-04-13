import ansi from 'ansi-escapes';
import { queuePostFlushCb } from 'vue';

import { HadesViewElement } from '@hades/layout';
import { render } from '@hades/render';

import { Options } from './options';

const { clearScreen } = ansi;

export class HadesContainer extends HadesViewElement {
    update: () => void;

    constructor({ stdout }: Options) {
        super();

        const renderContainer = async () =>
            stdout.write(clearScreen + (await render(this, true)));

        this.update = () => queuePostFlushCb(renderContainer);
    }
}

export const createContainer = (options: Options) =>
    new HadesContainer(options);

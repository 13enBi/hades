import { stdin, stdout } from 'process';
import { App } from 'vue';

import { KEY_STDIN, KEY_STDOUT } from './constant';

export interface Options {
    stdout: NodeJS.WriteStream;
    stdin: NodeJS.ReadStream;
}

const defaultOptions: Options = {
    stdin,
    stdout
};

export const resolveOptions = (
    options?: Partial<Options>
): Required<Options> => ({
    ...defaultOptions,
    ...options
});

export const provideOptions = (
    app: App,
    { stdout, stdin }: Required<Options>
) => {
    app.provide(KEY_STDOUT, stdout);
    app.provide(KEY_STDIN, stdin);
};

export default provideOptions;

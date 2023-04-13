import { onMounted, onUnmounted } from 'vue';

import { entriesMap, isFunction } from '@hades/shared';

import { useStdin } from './';

const KEY_MAP = {
    up: '\u001B[A',
    down: '\u001B[B',
    left: '\u001B[D',
    right: '\u001B[C',
    pageDown: '\u001B[6~',
    pageUp: '\u001B[5~',
    return: '\r',
    escape: '\u001B',
    backspace: '\u0008',

    ctrl: (input: string) => input <= '\u001A' && input !== KEY_MAP.return,
    shift: (input: string) =>
        input.length === 1 &&
        ((input >= 'A' && input <= 'Z') || (input >= 'А' && input <= 'Я')),
    tab: (input: string) => input === '\t' || input === '\u001B[Z',
    delete: (input: string) => input === '\u007F' || input === '\u001B[3~',
    meta: (input: string) => input.startsWith('\u001B')
};

const KEY_FORMAT = {
    ctrl: (input: string) =>
        String.fromCharCode(input.charCodeAt(0) + 'a'.charCodeAt(0) - 1),

    meta: (input: string) => input.slice(1),

    tab: () => '',
    backspace: () => '',
    delete: () => ''
} as const;

type Keys = Record<keyof typeof KEY_MAP, boolean>;

export type InputHandler = (input: string, keys: Keys) => void;

const getKeys = (input: string) =>
    entriesMap(KEY_MAP, ([key, check]) => [
        key,
        !!(isFunction(check) ? check(input) : check === input)
    ]) as Keys;

const formatInputWithKeys = (input: string, keys: Keys) =>
    Object.entries(KEY_FORMAT).reduce(
        (acc, [key, format]) => (keys[key as keyof Keys] ? format(acc) : acc),
        input
    );

let disposeCount = 0;
const startRawMode = (stdin: NodeJS.ReadStream) => {
    if (++disposeCount > 1) return;

    stdin.resume();
    stdin.setRawMode(true);
    stdin.setEncoding('utf8');
};

const stopRawMode = (stdin: NodeJS.ReadStream) => {
    if (--disposeCount > 0) return;

    stdin.setRawMode(false);
    stdin.pause();
};

const isExit = (input: string, keys: Keys) => input === 'c' && keys.ctrl;

export const useInput = (handler: InputHandler) => {
    const stdin = useStdin();

    let isActive = true;
    const on = () => {
        isActive = true;
    };
    const off = () => {
        isActive = false;
    };

    const listener = (data: Buffer) => {
        const input = data.toString();
        const keys = getKeys(input);

        if (isExit(input, keys)) return process.exit();

        isActive && handler(formatInputWithKeys(input, keys), keys);
    };

    onMounted(() => {
        startRawMode(stdin);
        stdin.addListener('data', listener);

        onUnmounted(() => {
            stopRawMode(stdin);
            stdin.removeListener('data', listener);
        });
    });

    return {
        on,
        off
    };
};

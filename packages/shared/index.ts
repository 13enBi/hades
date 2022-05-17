import _stringWidth from 'string-width';

export type Undef = undefined | null;
export type Func<T extends any[] = any[], R = any> = (...args: T) => R;
export type MaybeArray<T> = T | T[];

export const NOOP = () => {};

export const stringWidth = (s: string) =>
    _stringWidth(s, { ambiguousIsNarrow: true });

export const isString = (val: unknown): val is string =>
    typeof val === 'string';
export const isNumber = (val: unknown): val is number =>
    typeof val === 'number';
export const isArray = Array.isArray;
export const isObject = (val: unknown): val is Record<string, any> =>
    !!val && typeof val === 'object';
export const isFunction = (val: unknown): val is Func =>
    typeof val === 'function';
export const isUndef = (val: unknown): val is undefined => val == void 0;

export const anchorSplice = <T>(
    arr: T[],
    anchor: T,
    count: number,
    ...items: T[]
) => {
    const index = arr.indexOf(anchor);
    ~index && arr.splice(index, count, ...items);

    return index;
};

export const removeItem = <T>(arr: T[], i: T) => anchorSplice(arr, i, 1);

export const insertItem = <T>(arr: T[], i: T, anchor: T | null = null) => {
    const index = anchorSplice(arr, anchor, 0, i);
    return ~index ? index : arr.push(i) - 1;
};

export const memo = <K extends PropertyKey | Undef, T>(fn: Func<[K], T>) => {
    const record = {} as Record<NonNullable<K>, T>;

    return (str: K) =>
        str ? record[str!] || (record[str!] = fn(str)) : fn(str);
};

const camelizeRE = /-(\w)/g;
export const camelize = memo((str: string) =>
    str.replace(camelizeRE, (_, $1) => $1?.toUpperCase() || '')
);

export const capitalize = memo(
    <T extends string>(str: T) =>
        (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>
);

export const lfSplit = (str: string) => str.split('\n');

export const getContentSize = memo((content: string | null) => {
    if (!content)
        return {
            width: 0,
            height: 0
        };

    const lines = lfSplit(content);
    return {
        width: Math.max(...lines.map(stringWidth)),
        height: lines.length
    };
});

export const generateSquare = (w = 1, h = 1) =>
    w > 0 && h > 0 ? Array(h).fill(' '.repeat(w)).join('\n') : '';

export const splicingHorizontalString = (...strs: string[]) => {
    const splittedLines = strs.map(lfSplit);
    const longestLen = Math.max(...splittedLines.map(({ length }) => length));
    const [first] = splittedLines;

    for (let i = 1, len = splittedLines.length; i < len; i++)
        for (let j = 0; j < longestLen; j++)
            first[j] = (first[j] || '') + (splittedLines[i][j] || '');

    return first.join('\n');
};

export const splicingVerticalString = (...strs: string[]) =>
    strs.filter(Boolean).join('\n');

export type Spacing = {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
};

export const splicingSpacing = (
    content: string,
    { top = '', right = '', bottom = '', left = '' }: Spacing
) =>
    splicingVerticalString(
        top,
        splicingHorizontalString(
            splicingHorizontalString(left, content),
            right
        ),
        bottom
    );

export const entriesMap = <V extends any, T extends Record<string, V>, R>(
    obj: T,
    fn: (i: [string, V]) => [string, R]
) => Object.fromEntries(Object.entries(obj).map(fn));

export const splitSpace = memo((str: string) =>
    str
        .split(' ')
        .map(s => s.trim())
        .filter(Boolean)
);

export const isEmptyArray = (arr: any[]) => !arr.length;

export const eachCall =
    <A extends any[] = any[]>(...fns: Func<A, any>[]) =>
    (...args: A) =>
        fns.forEach(fn => fn(...args));

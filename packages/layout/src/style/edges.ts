import Yoga from 'yoga-layout-prebuilt';

import {
    capitalize,
    isEmptyArray,
    isNumber,
    isUndef,
    splitSpace
} from '@hades/shared';

import { isNoneValue, SetStyleFn, StyleValue } from './helper';

const { EDGE_TOP, EDGE_RIGHT, EDGE_BOTTOM, EDGE_LEFT } = Yoga;
const EDGE_TYPES = {
    top: EDGE_TOP,
    right: EDGE_RIGHT,
    bottom: EDGE_BOTTOM,
    left: EDGE_LEFT
};

type EdgeType = 'padding' | 'margin' | 'border';
type EdgeRawKey = 'top' | 'right' | 'bottom' | 'left';
export type EdgeValue = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};

export type EdgeStyle<T extends EdgeType> = { [k in T]: string | number } & {
    [k in `${T}Top` | `${T}Bottom` | `${T}Right` | `${T}Left`]: number;
};

const toRawKey = (type: string, key: string) =>
    key.replace(type, '').toLowerCase() as EdgeRawKey;

const makeEdgeFullValue = (value: number) =>
    Object.fromEntries(
        ['top', 'right', 'bottom', 'left'].map(key => [key, value])
    ) as EdgeValue;

export const parseEdgeLength = (value: StyleValue): EdgeValue => {
    if (isNoneValue(value)) return makeEdgeFullValue(0);
    if (isNumber(value)) return makeEdgeFullValue(value);

    const lengthValue = splitSpace(value);
    if (isEmptyArray(lengthValue)) return makeEdgeFullValue(0);

    const [top, right = top, bottom = top, left = right] =
        lengthValue.map<number>(s => +s.trim());
    return {
        top,
        right,
        bottom,
        left
    };
};

export const createSetEdgeStyle = (
    type: EdgeType
): SetStyleFn<Partial<EdgeValue> | undefined> => {
    const setEdgeKey = `set${capitalize(type)}` as const;

    return ({ yoga }, key, value) => {
        if (!key.startsWith(type)) return;

        if (key === type) {
            const lengthValue = parseEdgeLength(value);

            Object.entries(lengthValue).forEach(([key, length]) =>
                yoga[setEdgeKey](EDGE_TYPES[key as EdgeRawKey], length)
            );

            return lengthValue;
        }

        const rawKey = toRawKey(type, key);
        const edgeType = EDGE_TYPES[rawKey];
        if (!isUndef(edgeType)) {
            if (isNoneValue(value)) {
                yoga[setEdgeKey](edgeType, 0);
                return { [rawKey]: 0 };
            }

            value = +value;
            yoga[setEdgeKey](edgeType, value);

            return { [rawKey]: value };
        }
    };
};

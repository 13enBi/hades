import { capitalize } from '@hades/shared';

import { isPercentage, Percentage, SetStyleFn } from './helper';

export type DimensionsStyle = Record<
    'width' | 'height' | 'minWidth' | 'minHeight' | 'maxWidth' | 'maxHeight',
    number | Percentage | 'auto'
>;

const DIMENSIONS_KEYS = [
    'width',
    'height',
    'minWidth',
    'minHeight',
    'maxWidth',
    'maxHeight'
];

export const setDimensions: SetStyleFn = (element, key, value) => {
    if (!DIMENSIONS_KEYS.includes(key)) return;

    const capitalizedKey = capitalize(key);
    const setKey =
        !value || value === 'auto'
            ? `set${capitalizedKey}Auto`
            : isPercentage(key)
            ? `set${capitalizedKey}Percent`
            : `set${capitalizedKey}`;

    //@ts-ignore
    element.yoga[setKey]?.(parseInt(value));
};

export default setDimensions;

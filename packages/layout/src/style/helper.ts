import { camelize, capitalize, memo, Undef } from '@hades/shared';

import { HadesElement } from '../node';

export type Percentage = `${number}%`;
export const isPercentage = memo((str: string): str is Percentage =>
    str.endsWith('%')
);

export type StyleValue = string | number | Undef;
export type SetStyleFn<T = any> = (
    element: HadesElement,
    key: string,
    value: StyleValue
) => T;
export type WithNoneValue<T extends object> = {
    [K in keyof T]: T[K] | '' | null | undefined;
};

export const isNoneValue = (value: StyleValue): value is Undef | 'none' =>
    !value || value === 'none';

export const createSetMapStyle =
    <M extends Record<string, string | number>, K extends string>(
        map: M,
        propKey: K
    ): SetStyleFn =>
    (element, key, value) => {
        if (key !== propKey || isNoneValue(value)) return;
        const camelizedValue = camelize(`${value}`);

        map[camelizedValue] &&
            //@ts-ignore
            element.yoga[`set${capitalize(propKey)}`]?.(map[camelizedValue]);
    };

export const isDisplayNone = (element: HadesElement) =>
    element.style.display === 'none';

export const isDisplayInline = (element: HadesElement) =>
    element.style.display === 'inline';

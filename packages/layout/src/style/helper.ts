import { HadesElement } from '../node';
import { camelize, capitalize, memo, Undef } from '@hades/shared';
import { HadesNode } from '..';
import Yoga from 'yoga-layout-prebuilt';

export type Percentage = `${number}%`;
export const isPercentage = memo((str: string) => str.endsWith('%'));

export type StyleValue = string | number | Undef;
export type SetStyleFn<T = any> = (
    element: HadesElement,
    key: string,
    value: StyleValue
) => T;

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

export const isDisplayNone = (node: HadesNode) =>
    node.shape.display === Yoga.DISPLAY_NONE;

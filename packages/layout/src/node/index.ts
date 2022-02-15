import { YogaNode } from 'yoga-layout-prebuilt';
import { Func } from '@hades/shared';
import { HadesElement, createViewElement } from '..';

export type Layout = ReturnType<YogaNode['getComputedLayout']>;
export type Props = Record<string, any>;
export type Content = string | null;

export enum NodeType {
    NONE = 'hades_none',
    VIEW = 'hades_view',
    RAW_TEXT = 'hades_raw_text'
}

export * from './node';
export * from './element';
export * from './text';

const NODE_TYPE_MAP: Record<
    string,
    Func<[Props | null | undefined], HadesElement>
> = {
    [NodeType.VIEW]: createViewElement
};
export const createElement = (type: string, props?: Props | null) =>
    NODE_TYPE_MAP[type]?.(props) || createViewElement(props);

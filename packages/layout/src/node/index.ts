import { YogaNode } from 'yoga-layout-prebuilt';
import { Func } from '@hades/shared';
import { HadesNode } from './node';
import { HadesElement } from './element';
import { createViewElement } from './view';
import { createTextElement } from './text';

export type Layout = ReturnType<YogaNode['getComputedLayout']>;
export type Props = Record<string, any> | null;
export type Content = string | null;
export type Anchor = HadesNode | null | undefined;

export const enum NodeType {
    RAW_TEXT = 'hades_raw_text',
    TEXT = 'hades_text',
    VIEW = 'hades_view'
}

export * from './node';
export * from './element';
export * from './view';
export * from './text';
export * from './rawText';

const NODE_TYPE_MAP: Record<
    string,
    Func<[Props | null | undefined], HadesElement>
> = {
    [NodeType.VIEW]: createViewElement,
    [NodeType.TEXT]: createTextElement
};
export const createElement = (type: string, props?: Props) => {
    const creator = NODE_TYPE_MAP[type];
    if (!creator) throw new Error(`Unknown element type: ${type}`);

    return creator(props);
};

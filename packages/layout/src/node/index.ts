import { HadesNode } from './node';
import { HadesElement, isElement } from './element';
import { HadesViewElement } from './view';
import { HadesTextElement } from './text';
import { HadesLinkElement } from './link';
import { HadesImageElement } from './image';

export type Props = Record<string, any> | null;
export type Content = string | null;
export type Anchor = HadesNode | null | undefined;

export const enum NodeType {
    RAW_TEXT = 'hades_raw_text',
    TEXT = 'hades_text',
    VIEW = 'hades_view',
    LINK = 'hades_link',
    IMAGE = 'hades_image'
}

export { HadesRawTextNode, createRawText } from './rawText';
export {
    isElement,
    HadesNode,
    HadesElement,
    HadesViewElement,
    HadesTextElement,
    HadesLinkElement
};

const NODE_TYPE_MAP: Record<string, typeof HadesElement> = {
    [NodeType.VIEW]: HadesViewElement,
    [NodeType.TEXT]: HadesTextElement,
    [NodeType.LINK]: HadesLinkElement,
    [NodeType.IMAGE]: HadesImageElement
};
export const createElement = (type: string, props?: Props) => {
    const creator = NODE_TYPE_MAP[type];
    if (!creator) throw new Error(`Unknown element type: ${type}`);

    return new creator(props);
};

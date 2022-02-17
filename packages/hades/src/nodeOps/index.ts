import { RendererOptions } from 'vue';
import {
    createElement,
    createRawText,
    HadesElement,
    HadesNode,
    HadesRawTextNode
} from '@hades/layout';
import { HadesContainer } from '../container';
import patchStyle from './patchStyle';

export type HadesRendererOptions = RendererOptions<HadesNode, HadesElement>;

export const createNodeOps = (
    rootContainer: HadesContainer
): HadesRendererOptions => ({
    insert: (child, parent, anchor) => {
        parent.insertBefore(child, anchor);

        rootContainer.update();
    },

    remove: child => {
        const { parent } = child;
        if (!parent) return;

        parent.removeChild(child);

        rootContainer.update();
    },

    createElement: (type, _, __, props) => createElement(type, props),

    createText: text => createRawText(text),

    createComment: () => createRawText(null),

    setText: (node: HadesRawTextNode, text) => {
        node.setTextContent(text);

        rootContainer.update();
    },

    setElementText: (element, text) => {
        element.content = text;

        rootContainer.update();
    },

    parentNode: ({ parent }) => parent,

    nextSibling: node => node.nextSibling,

    patchProp: (element, key, prevValue, nextValue) => {
        if (key === 'style') {
            patchStyle(element, prevValue, nextValue);

            rootContainer.update();
        }

        element.props[key] = nextValue;
    }
});

export default createNodeOps;

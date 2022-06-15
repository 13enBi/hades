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
        switch (key) {
            case 'style':
                element.style = {
                    ...element.style,
                    ...patchStyle(prevValue, nextValue)
                };

                break;

            default:
                if (Reflect.has(element, key)) {
                    //@ts-ignore
                    element[key] = nextValue;
                } else {
                    element.props[key] = nextValue;
                }
        }

        rootContainer.update();
    }
});

export default createNodeOps;

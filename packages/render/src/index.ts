import { processLink } from './link';
import { processText } from './text';
import { processImage } from './image';
import { processView } from './view';
import {
    HadesNode,
    NodeType,
    HadesTextElement,
    isDisplayNone,
    isElement,
    HadesViewElement,
    HadesLinkElement,
    HadesImageElement
} from '@hades/layout';

export const render = async (node: HadesNode, isCalcLayout = false) => {
    if (isCalcLayout) node.yoga.calculateLayout();

    node.context.layout = node.yoga.getComputedLayout();

    if (isElement(node) && isDisplayNone(node)) return '';

    switch (node.type) {
        case NodeType.VIEW:
            await processView(node as HadesViewElement);
            break;

        case NodeType.TEXT:
            processText(node as HadesTextElement);
            break;

        case NodeType.LINK:
            processLink(node as HadesLinkElement);
            break;

        case NodeType.IMAGE:
            await processImage(node as HadesImageElement);
            break;

        default:
    }

    return node.content;
};

export default render;

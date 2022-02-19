import {
    HadesNode,
    NodeType,
    HadesTextElement,
    isDisplayNone,
    isElement,
    HadesViewElement
} from '@hades/layout';
import { processText } from './text';
import processView from './view';

export const render = (node: HadesNode, isCalcLayout = false) => {
    if (isCalcLayout) node.yoga.calculateLayout();

    node.layout = node.yoga.getComputedLayout();

    if (isElement(node) && isDisplayNone(node)) return '';

    switch (node.type) {
        case NodeType.VIEW:
            processView(node as HadesViewElement);
            break;

        case NodeType.TEXT:
            processText(node as HadesTextElement);
            break;

        default:
    }

    return node.content;
};

export default render;

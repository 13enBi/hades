import { HadesNode, HadesElement, NodeType } from '@hades/layout';
import processView from './view';

export const render = (node: HadesNode, isCalcLayout = false) => {
    if (isCalcLayout) node.yoga.calculateLayout();

    node.layout = node.yoga.getComputedLayout();

    switch (node.type) {
        case NodeType.VIEW:
            processView(node as HadesElement);

        default:
    }

    return node.content;
};

export default render;

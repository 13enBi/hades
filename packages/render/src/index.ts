import { HadesNode, NodeType, isDisplayNone, isElement } from '@hades/layout';
import { processRawText, processText } from './text';
import { processView } from './view';
import { processLink } from './link';
import { processImage } from './image';

const PROCESSOR_MAP = {
    [NodeType.VIEW]: processView,
    [NodeType.TEXT]: processText,
    [NodeType.LINK]: processLink,
    [NodeType.IMAGE]: processImage,
    [NodeType.RAW_TEXT]: processRawText
};

export const render = async (node: HadesNode, isCalcLayout = false) => {
    if (!node.isDirty && !isCalcLayout) return node.content;
    node.isDirty = false;

    if (isCalcLayout) node.yoga.calculateLayout();
    node.context.layout = node.yoga.getComputedLayout();

    if (isElement(node) && isDisplayNone(node)) return '';
    await PROCESSOR_MAP[node.type]?.(node as any);

    return node.content;
};

export default render;

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
    if (isElement(node) && isDisplayNone(node)) return '';

    if (isCalcLayout) node.yoga.calculateLayout();
    node.context.layout = node.yoga.getComputedLayout();

    const processor = PROCESSOR_MAP[node.type];
    if (!processor) throw new Error(`Unknown node type: ${node.type}`);
    // @ts-ignore
    await processor(node);

    node.isDirty = false;
    return node.content;
};

export default render;

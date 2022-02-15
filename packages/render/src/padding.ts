import { HadesElement, EdgeValue } from '@hades/layout';
import { generateSquare, getContentSize, splicingSpacing } from '@hades/shared';

export const nonePadding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};

const generatePadding = (content: string, padding: EdgeValue) => {
    const { top, right, bottom, left } = { ...nonePadding, ...padding };
    const { width, height } = getContentSize(content);

    const horizontal = left + width + right;

    return splicingSpacing(content, {
        top: generateSquare(horizontal, top),
        right: generateSquare(right, height),
        bottom: generateSquare(horizontal, bottom),
        left: generateSquare(left, height)
    });
};

export const processPadding = (element: HadesElement) => {
    const {
        content,
        shape: { padding: paddingPayload }
    } = element;

    if (!paddingPayload) return;

    element.content = generatePadding(content || '', paddingPayload);
};

export default processPadding;

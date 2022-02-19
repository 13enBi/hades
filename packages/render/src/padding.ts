import { HadesElement, EdgeValue } from '@hades/layout';
import { generateSquare, getContentSize, splicingSpacing } from '@hades/shared';

const generatePadding = (content: string, padding: EdgeValue) => {
    const { top, right, bottom, left } = padding;
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
        context: { padding: paddingPayload }
    } = element;

    if (!paddingPayload) return;

    element.content = generatePadding(content || '', paddingPayload);
};

export default processPadding;

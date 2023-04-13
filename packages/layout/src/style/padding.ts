import { isDisplayInline } from './';
import { createSetEdgeStyle, EdgeStyle } from './edges';
import { SetStyleFn } from './helper';

export type PaddingStyle = EdgeStyle<'padding'>;

const setPaddingEdge = createSetEdgeStyle('padding');

export const setPadding: SetStyleFn = (element, key, value) => {
    if (isDisplayInline(element)) return;

    const paddingLength = setPaddingEdge(element, key, value);
    if (!paddingLength) return;

    const { context } = element;
    context.padding = {
        ...context.padding,
        ...paddingLength
    };
};

export default setPadding;

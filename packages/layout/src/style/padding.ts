import { SetStyleFn } from './helper';
import { createSetEdgeStyle, EdgeStyle } from './edges';

export type PaddingStyle = EdgeStyle<'padding'>;

const setPaddingEdge = createSetEdgeStyle('padding');

export const setPadding: SetStyleFn = (element, key, value) => {
    const paddingLength = setPaddingEdge(element, key, value);
    if (!paddingLength) return;

    const { shape } = element;
    shape.padding = { ...shape.padding, ...paddingLength };
};

export default setPadding;

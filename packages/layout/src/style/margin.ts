import { createSetEdgeStyle, EdgeStyle } from './edges';

export type MarginStyle = EdgeStyle<'margin'>;

export const setMargin = createSetEdgeStyle('margin');

export default setMargin;

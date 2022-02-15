import { SetStyleFn, isNoneValue } from './helper';
import { createSetEdgeStyle } from './edges';

export interface BorderStyle {
    borderStyle: string;
    borderColor: string;
}

const setBorderEdge = createSetEdgeStyle('border');

export const setBorder: SetStyleFn = (element, key, value) => {
    if (key !== 'borderStyle' && key !== 'borderColor') return;

    if (isNoneValue(value)) return (element.shape[key] = void 0);

    //@ts-ignore
    element.shape[key] = value;
    setBorderEdge(element, 'border', 1);
};

export default setBorder;

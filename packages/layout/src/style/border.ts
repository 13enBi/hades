import { SetStyleFn, isNoneValue } from './helper';
import { createSetEdgeStyle } from './edges';
import { isDisplayInline } from '.';

export interface BorderStyle {
    borderStyle: string;
    borderColor: string;
}

const setBorderEdge = createSetEdgeStyle('border');

export const setBorder: SetStyleFn = (element, key, value) => {
    if (isDisplayInline(element)) return;
    if (key !== 'borderStyle' && key !== 'borderColor') return;

    if (isNoneValue(value)) return (element.shape[key] = void 0);

    //@ts-ignore
    element.shape[key] = value;
    setBorderEdge(element, 'border', 1);
};

export default setBorder;

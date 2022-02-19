import { SetStyleFn, isNoneValue } from './helper';
import { createSetEdgeStyle } from './edges';
import { isDisplayInline } from '.';

export interface BorderStyle {
    borderStyle: string;
    borderColor: string;
}

const setBorderEdge = createSetEdgeStyle('border');

export const setBorder: SetStyleFn = (element, key, value) => {
    if (
        isDisplayInline(element) ||
        (key !== 'borderStyle' && key !== 'borderColor') ||
        isNoneValue(value)
    )
        return;

    setBorderEdge(element, 'border', 1);
};

export default setBorder;

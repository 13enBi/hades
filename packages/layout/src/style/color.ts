import { isNoneValue, SetStyleFn } from './helper';

export interface ColorStyle {
    color: string;
    backgroundColor: string;
}

export const setColor: SetStyleFn = (element, key, value) => {
    if (key !== 'color' && key !== 'backgroundColor') return;

    element.shape[key] = isNoneValue(value) ? void 0 : `${value}`;
};

export default setColor;

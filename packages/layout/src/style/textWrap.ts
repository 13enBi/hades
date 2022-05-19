import { SetStyleFn } from './helper';

export type TextWrapType =
    | 'wrap'
    | 'end'
    | 'truncate'
    | 'truncate-start'
    | 'truncate-middle'
    | 'truncate-end';

export interface TextWrapStyle {
    textWrap: TextWrapType;
}

export const setTextWrap: SetStyleFn = (element, key, value) => {
    if (key !== 'textWrap' || !value) return;

    // @ts-ignore
    element.style.textWrap = value;
};

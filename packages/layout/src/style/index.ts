import { eachCall } from '@hades/shared';
import setPadding, { PaddingStyle } from './padding';
import setMargin, { MarginStyle } from './margin';
import setBorder, { BorderStyle } from './border';
import setDisplay, { DisplayStyle } from './display';
import setDimensions, { DimensionsStyle } from './dimensions';
import setFlex, { FlexStyle } from './flex';
import { HadesElement } from '..';
import { WithNoneValue } from './helper';
import { TextWrapStyle } from './textWrap';

interface ColorStyle {
    color: string;
    backgroundColor: string;
}

export type Style = WithNoneValue<
    Partial<
        DisplayStyle &
            BorderStyle &
            MarginStyle &
            PaddingStyle &
            ColorStyle &
            DimensionsStyle &
            FlexStyle &
            TextWrapStyle
    >
>;

export { isDisplayNone, isDisplayInline } from './helper';
export { EdgeStyle, EdgeValue } from './edges';
export { TextWrapType } from './textWrap';

const setStyleFns = eachCall(
    setPadding,
    setMargin,
    setBorder,
    setDisplay,
    setDimensions,
    setFlex
);

export const setStyle = (element: HadesElement, style: Style) =>
    Object.entries(style).forEach(([key, value]) =>
        setStyleFns(element, key, value)
    );

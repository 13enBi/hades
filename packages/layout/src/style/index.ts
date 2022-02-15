import { eachCall } from '@hades/shared';
import setPadding, { PaddingStyle } from './padding';
import setMargin, { MarginStyle } from './margin';
import setColor, { ColorStyle } from './color';
import setBorder, { BorderStyle } from './border';
import setDisplay, { DisplayStyle } from './display';
import setDimensions, { DimensionsStyle } from './dimensions';
import setFlex, { FlexStyle } from './flex';

export type Style = Partial<
    DisplayStyle &
        BorderStyle &
        MarginStyle &
        PaddingStyle &
        ColorStyle &
        DimensionsStyle &
        FlexStyle
>;

export * from './edges';
export { isDisplayNone, StyleValue } from './helper';

export const setStyle = eachCall(
    setColor,
    setPadding,
    setMargin,
    setBorder,
    setDisplay,
    setDimensions,
    setFlex
);

export default setStyle;

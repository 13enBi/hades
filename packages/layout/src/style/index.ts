import { eachCall } from '@hades/shared';
import setPadding, { PaddingStyle } from './padding';
import setMargin, { MarginStyle } from './margin';
import setColor, { ColorStyle } from './color';
import setBorder, { BorderStyle } from './border';
import setDisplay, { DisplayStyle } from './display';
import setDimensions, { DimensionsStyle } from './dimensions';
import setFlex, { FlexStyle } from './flex';
import { HadesElement } from '..';
import { WithNoneValue } from './helper';

export type Style = WithNoneValue<
    Partial<
        DisplayStyle &
            BorderStyle &
            MarginStyle &
            PaddingStyle &
            ColorStyle &
            DimensionsStyle &
            FlexStyle
    >
>;

export { isDisplayNone, isDisplayInline } from './helper';

const setStyleFns = eachCall(
    setColor,
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

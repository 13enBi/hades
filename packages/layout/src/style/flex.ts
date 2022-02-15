import Yoga from 'yoga-layout-prebuilt';
import { capitalize, eachCall, isNumber, splitSpace } from '@hades/shared';
import {
    createSetMapStyle,
    Percentage,
    SetStyleFn,
    isPercentage
} from './helper';

export interface FlexStyle {
    flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    flexShrink: number;
    flexGrow: number;
    flexBasis: number | Percentage;
    alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    alignSelf:
        | 'auto'
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'stretch'
        | 'baseline';
    justifyContent:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly';
    flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
}

const parseBasisValue = (value: string | number) => {
    if (isNumber(value)) return { grow: value, shrink: value, basis: 'auto' };
    if (value === 'auto') return { grow: 1, shrink: 1, basis: 'auto' };
    if (value === 'none') return { grow: 0, shrink: 0, basis: 'auto' };

    const [grow, shrink, basis] = splitSpace(value);
    return { grow: +grow, shrink: +shrink, basis };
};

const setFlexBasis: SetStyleFn = (element, key, value) => {
    if (!value) return;

    const { yoga } = element;

    if (key === 'flex') {
        const { grow, shrink, basis } = parseBasisValue(value);

        isPercentage(basis)
            ? yoga.setFlexBasisPercent(parseInt(basis))
            : yoga.setFlexBasis(basis);
        yoga.setFlexGrow(grow);
        yoga.setFlexShrink(shrink);
    }

    if (key === 'flexGrow' || key === 'flexShrink') {
        const setKey = `set${capitalize(key)}` as const;

        yoga[setKey](+value);
    }

    if (key === 'flexBasis') {
        isNumber(value)
            ? yoga.setFlexBasis(value)
            : isPercentage(value)
            ? yoga.setFlexBasisPercent(parseInt(value))
            : yoga.setFlexBasis(value);
    }
};

const FLEX_DIRECTION_MAP = {
    row: Yoga.FLEX_DIRECTION_ROW,
    rowReverse: Yoga.FLEX_DIRECTION_ROW_REVERSE,
    column: Yoga.FLEX_DIRECTION_COLUMN,
    columnReverse: Yoga.FLEX_DIRECTION_COLUMN_REVERSE
};
const setFlexDirection = createSetMapStyle(FLEX_DIRECTION_MAP, 'flexDirection');

const ALIGN_MAP = {
    auto: Yoga.ALIGN_AUTO,
    stretch: Yoga.ALIGN_STRETCH,
    flexStart: Yoga.ALIGN_FLEX_START,
    flexEnd: Yoga.ALIGN_FLEX_END,
    center: Yoga.ALIGN_CENTER
};
const setAlignItems = createSetMapStyle(ALIGN_MAP, 'alignItems');
const setAlignSelf = createSetMapStyle(ALIGN_MAP, 'alignSelf');

const JUSTIFY_MAP = {
    flexStart: Yoga.JUSTIFY_FLEX_START,
    flexEnd: Yoga.JUSTIFY_FLEX_END,
    center: Yoga.JUSTIFY_CENTER,
    spaceBetween: Yoga.JUSTIFY_SPACE_BETWEEN,
    spaceAround: Yoga.JUSTIFY_SPACE_AROUND
};
const setJustifyContent = createSetMapStyle(JUSTIFY_MAP, 'justifyContent');

export const setFlex: SetStyleFn = eachCall(
    setFlexBasis,
    setFlexDirection,
    setAlignItems,
    setAlignSelf,
    setJustifyContent
);

export default setFlex;

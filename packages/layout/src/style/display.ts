import Yoga from 'yoga-layout-prebuilt';
import { SetStyleFn } from './helper';

export interface DisplayStyle {
    display: 'flex' | 'none';
}

const DISPLAY_VALUE_MAP = {
    flex: Yoga.DISPLAY_FLEX,
    none: Yoga.DISPLAY_NONE
};

export const setDisplay: SetStyleFn = (element, key, value) => {
    if (key !== 'display' || !value) return;

    // @ts-ignore
    const display = DISPLAY_VALUE_MAP[value] || Yoga.DISPLAY_FLEX;
    const { yoga, shape } = element;

    yoga.setDisplay(display);
    shape.display = display;
};

export default setDisplay;

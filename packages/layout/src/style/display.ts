import Yoga from 'yoga-layout-prebuilt';

import { SetStyleFn } from './helper';

export interface DisplayStyle {
    display: 'inline' | 'flex' | 'none';
}

const DISPLAY_VALUE_MAP = {
    inline: Yoga.DISPLAY_COUNT,
    flex: Yoga.DISPLAY_FLEX,
    none: Yoga.DISPLAY_NONE
};

export const setDisplay: SetStyleFn = (element, key, value) => {
    if (key !== 'display' || !value) return;

    // @ts-ignore
    const display = DISPLAY_VALUE_MAP[value];
    if (!display) return;

    element.yoga.setDisplay(display);
};

export default setDisplay;

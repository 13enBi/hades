import chalk from 'chalk';

import { HadesElement } from '@hades/layout';
import { capitalize } from '@hades/shared';

const isHex = (color: string) => color.startsWith('#');

const rbgRE = /^(rgba?|hsl|hsv|hwb)/i;
const isRgb = (color: string) => !!color.match(rbgRE);

const parseRE = /\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
const parseRgb = (rgb: string) =>
    (rgb.match(parseRE)?.slice(1).map(Number) as [number, number, number]) || [
        0, 0, 0
    ];

const preParseBg = <T extends string>(name: T, isBackground: boolean) =>
    isBackground ? (`bg${capitalize(name)}` as const) : name;

export const colorize = (
    content: string,
    color: string,
    isBackground = false
): string => {
    if (isHex(color))
        return chalk[preParseBg('hex', isBackground)](color)(content);

    if (isRgb(color))
        return chalk[preParseBg('rgb', isBackground)](...parseRgb(color))(
            content
        );

    //@ts-ignore
    return chalk[preParseBg(color, isBackground)]?.(content) || content;
};

export const processColor = (element: HadesElement) => {
    const {
        style: { color, backgroundColor },
        content
    } = element;

    if (!content) return;

    let colorizeContent = color ? colorize(content, color) : content;
    if (backgroundColor) {
        colorizeContent = colorize(colorizeContent, backgroundColor, true);
    }

    element.content = colorizeContent;
};

export default processColor;

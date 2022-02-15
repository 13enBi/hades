import cliBoxes from 'cli-boxes';
import { HadesElement } from '@hades/layout';
import { entriesMap, Spacing, splicingSpacing } from '@hades/shared';
import { colorize } from './color';

const generateBorderSpacing = (
    style: string,
    width: number,
    height: number
) => {
    const {
        topLeft,
        top,
        topRight,
        left,
        right,
        bottomLeft,
        bottom,
        bottomRight
    } =
        //@ts-ignore
        cliBoxes[style];

    const repeatWidth = width - 2;
    const repeatHeight = height - 2;

    return {
        top: topLeft + top.repeat(repeatWidth) + topRight,
        left: `${left}\n`.repeat(repeatHeight - 1) + left,
        right: `${right}\n`.repeat(repeatHeight - 1) + right,
        bottom: bottomLeft + bottom.repeat(repeatWidth) + bottomRight
    };
};

const colorizedBorderSpacing = (
    spacing: Spacing,
    borderColor: string
): Spacing =>
    entriesMap(spacing, ([key, value]) => [
        key,
        colorize(value as string, borderColor)
    ]);

export const processBorder = (element: HadesElement) => {
    const {
        content,
        shape: { borderStyle, borderColor },
        layout: { width, height }
    } = element;

    if (!content || !borderStyle) return;

    const spacing = generateBorderSpacing(borderStyle, width, height);

    element.content = splicingSpacing(
        content,
        borderColor ? colorizedBorderSpacing(spacing, borderColor) : spacing
    );
};

export default processBorder;

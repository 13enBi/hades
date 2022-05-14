import slice from 'slice-ansi';
import { HadesElement } from '@hades/layout';
import { lfSplit, stringWidth } from '@hades/shared';
import render from '.';

const generateChildOutputAndOffset = ({ context, style }: HadesElement) => {
    const { padding, layout } = context;
    const { width, height } = layout;
    const borderWidth = +!!style.borderStyle;

    const offsetLeft = borderWidth + padding.left;
    const offsetTop = borderWidth + padding.top;

    const outputWidth = width - (offsetLeft + borderWidth + padding.right);
    const outputHeight = height - (offsetTop + borderWidth + padding.bottom);
    const output = Array<string>(outputHeight).fill(' '.repeat(outputWidth));

    return { output, offsetLeft, offsetTop };
};

export const processChildren = async (element: HadesElement) => {
    const { output, offsetLeft, offsetTop } =
        generateChildOutputAndOffset(element);

    await Promise.all(
        element.children.map(async child => {
            await render(child);

            const {
                content,
                context: {
                    layout: { left, top }
                }
            } = child;
            if (!content) return;

            const x = left - offsetLeft;
            const y = top - offsetTop;

            lfSplit(content).forEach((line, index) => {
                const offset = y + index;

                const currentLine = output[offset];
                if (!currentLine) return;

                output[offset] =
                    slice(currentLine, 0, x) +
                    line +
                    slice(currentLine, x + stringWidth(line));
            });
        })
    );

    element.content = output.join('\n');
};

export default processChildren;

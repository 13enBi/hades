import { Buffer } from 'buffer';
import terminalImage from 'terminal-image';

import { HadesImageElement } from '@hades/layout';
import { isString } from '@hades/shared';

export const processImage = async (element: HadesImageElement) => {
    const { src } = element;
    if (!src) return;

    const { width, height } = element.context.layout;
    const renderingBuffer = isString(src) ? Buffer.from(src, 'base64') : src;

    element.content = await terminalImage.buffer(renderingBuffer, {
        preserveAspectRatio: false,
        width,
        height
    });
};

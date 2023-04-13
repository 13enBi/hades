import truncate, { Options as TruncateOptions } from 'cli-truncate';
import wrapAnsi from 'wrap-ansi';

import {
    HadesRawTextNode,
    HadesTextElement,
    TextWrapType
} from '@hades/layout';

const processTextWrap = (
    content: string | null,
    maxWidth: number,
    type?: TextWrapType
) => {
    if (!type || !content) return content;

    if (type.startsWith('truncate')) {
        const position = type.replace('truncate-', '') || 'end';

        return truncate(content, maxWidth, {
            position: position as TruncateOptions['position']
        });
    }

    if (type === 'wrap')
        return wrapAnsi(content, maxWidth, {
            trim: false,
            hard: true
        });

    return content;
};

export const processText = (element: HadesTextElement) => {
    element.content = processTextWrap(
        element.children.map(child => child.content).join(''),
        element.context.layout.width,
        element.style.textWrap as TextWrapType
    );
};

export const processRawText = (element: HadesRawTextNode) => {
    element.content = processTextWrap(
        element.content,
        element.context.layout.width,
        'wrap'
    );
};

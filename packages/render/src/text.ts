import { HadesRawTextNode, HadesTextElement } from '@hades/layout';
import truncate from 'cli-truncate';

export const processText = (element: HadesTextElement) => {
    const text = element.children.map(child => child.content).join('');

    element.content = truncate(text, element.context.layout.width, {
        position: 'end'
    });
};

export const processRawText = (element: HadesRawTextNode) => {
    const { content } = element;
    if (!content) return;

    element.content = truncate(content, element.context.layout.width, {
        position: 'end'
    });
};

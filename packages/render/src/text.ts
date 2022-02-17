import { HadesTextElement } from '@hades/layout';

export const processText = (element: HadesTextElement) => {
    element.content = element.children.map(child => child.content).join('');
};

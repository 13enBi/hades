import chalk from 'chalk';
import terminalLink from 'terminal-link';

import { HadesLinkElement } from '@hades/layout';

import { processText } from './text';

export const processLink = (element: HadesLinkElement) => {
    processText(element);

    if (element.content) {
        element.content = terminalLink(element.content, element.href || '/', {
            fallback: text => chalk.underline(text)
        });
    }
};

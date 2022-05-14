import { HadesElement } from '@hades/layout';
import processBorder from './border';
import processChildren from './children';
import processColor from './color';
import processPadding from './padding';

export const processView = async (element: HadesElement) => {
    await processChildren(element);
    processPadding(element);
    processColor(element);
    processBorder(element);
};

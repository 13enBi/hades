import { HadesElement, isDisplayNone } from '@hades/layout';
import { eachCall } from '@hades/shared';
import processBorder from './border';
import processChildren from './children';
import processColor from './color';
import processPadding from './padding';

const viewProcessors = eachCall(
    processChildren,
    processPadding,
    processColor,
    processBorder
);

export const processView = (element: HadesElement) =>
    isDisplayNone(element) ? '' : viewProcessors(element);

export default processView;

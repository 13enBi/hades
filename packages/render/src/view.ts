import { eachCall } from '@hades/shared';
import processBorder from './border';
import processChildren from './children';
import processColor from './color';
import processPadding from './padding';

export const processView = eachCall(
    processChildren,
    processPadding,
    processColor,
    processBorder
);

export default processView;

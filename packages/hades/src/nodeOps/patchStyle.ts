import { Style } from '@hades/layout';
import { isObject } from '@hades/shared';

export const patchStyle = (prevStyle: Style, nextStyle: Style) => {
    const prevIsObject = isObject(prevStyle);
    const nextIsObject = isObject(nextStyle);

    const resolvedStyle: any = {};

    if (!nextIsObject) {
        prevIsObject &&
            Object.keys(prevStyle).forEach(key => (resolvedStyle[key] = null));

        return resolvedStyle;
    }

    Object.entries(nextStyle).forEach(
        ([key, value]) => (resolvedStyle[key] = value)
    );

    prevIsObject &&
        Object.keys(prevStyle).forEach(key => {
            if (!Reflect.has(nextStyle, key)) resolvedStyle[key] = null;
        });

    return resolvedStyle;
};

export default patchStyle;

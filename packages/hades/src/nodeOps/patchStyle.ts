import { setStyle, HadesElement, Style } from '@hades/layout';
import { isObject } from '@hades/shared';

export const patchStyle = (
    element: HadesElement,
    prevStyle: Style,
    nextStyle: Style
) => {
    const prevIsObject = isObject(prevStyle);
    const nextIsObject = isObject(nextStyle);

    if (!nextIsObject)
        return (
            prevIsObject &&
            Object.keys(prevStyle).forEach(key => setStyle(element, key, null))
        );

    Object.entries(nextStyle).forEach(([key, value]) =>
        setStyle(element, key, value)
    );

    prevIsObject &&
        Object.keys(prevStyle).forEach(key => {
            if (!Reflect.has(nextStyle, key)) setStyle(element, key, null);
        });
};

export default patchStyle;

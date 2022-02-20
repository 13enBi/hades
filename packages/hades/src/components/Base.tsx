import { NodeType, Style } from '@hades/layout';
import { ComponentObjectPropsOptions, defineComponent, h, PropType } from 'vue';

export const createBaseComponent = <
    T extends NodeType,
    N extends string,
    P extends ComponentObjectPropsOptions = { style: PropType<Style> }
>(
    type: T,
    name: N,
    props: P = { style: Object as PropType<Style> } as any
) =>
    defineComponent({
        name,
        props,

        setup:
            (props, { slots }) =>
            () =>
                h(type, props, slots.default?.())
    });

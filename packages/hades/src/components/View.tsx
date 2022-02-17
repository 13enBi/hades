import { defineComponent, PropType } from 'vue';
import { Style, NodeType } from '@hades/layout';

export const View = defineComponent({
    name: 'h-view',

    props: {
        style: Object as PropType<Style>
    },

    setup:
        (props, { slots, attrs }) =>
        () =>
            (
                <NodeType.VIEW style={props.style} {...attrs}>
                    {slots.default?.()}
                </NodeType.VIEW>
            )
});

export default View;

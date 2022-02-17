import { NodeType, Style } from '@hades/layout';
import { defineComponent, PropType } from 'vue';

export const Text = defineComponent({
    name: 'h-text',

    props: { style: Object as PropType<Style> },

    setup:
        (props, { slots, attrs }) =>
        () =>
            (
                <NodeType.TEXT style={props.style} {...attrs}>
                    {slots.default?.()}
                </NodeType.TEXT>
            )
});

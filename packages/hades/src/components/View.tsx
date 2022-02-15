import { computed, defineComponent, PropType } from 'vue';
import { Style, NodeType } from '@hades/layout';

const viewDefaultStyle: Style = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 1,
    margin: 0,
    padding: 0
};

export const View = defineComponent({
    props: {
        style: Object as PropType<Style>
    },
    setup: (props, { slots, attrs }) => {
        const style = computed(() => ({ ...viewDefaultStyle, ...props.style }));

        return () => (
            <NodeType.VIEW style={style.value} {...attrs}>
                {slots.default?.()}
            </NodeType.VIEW>
        );
    }
});

export default View;

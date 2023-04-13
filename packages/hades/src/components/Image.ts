import { PropType } from 'vue';

import { NodeType, Style } from '@hades/layout';

import { createBaseComponent } from './Base';

export const Image = createBaseComponent(NodeType.IMAGE, 'h-link', {
    style: Object as PropType<Style>,
    src: [String, Object] as PropType<string | Buffer>
});

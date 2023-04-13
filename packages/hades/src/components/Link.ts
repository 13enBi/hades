import { PropType } from 'vue';

import { NodeType, Style } from '@hades/layout';

import { createBaseComponent } from './Base';

export const Link = createBaseComponent(NodeType.LINK, 'h-link', {
    style: Object as PropType<Style>,
    href: String
});

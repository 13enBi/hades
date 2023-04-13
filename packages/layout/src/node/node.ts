import Yoga, { YogaNode } from 'yoga-layout-prebuilt';

import { createRenderContext } from '../context';
import { Content, NodeType } from './';
import { HadesElement } from './element';

export class HadesNode {
    type: NodeType = null!;
    parent: HadesElement | null = null;
    content: Content = null;
    yoga: YogaNode = Yoga.Node.create();
    context = createRenderContext(this); //will be set synchronously right after render
    isDirty = true;

    markDirty() {
        this.isDirty = true;
        this.parent && this.parent.markDirty();
    }

    get nextSibling(): HadesNode | null {
        const { parent } = this;
        if (!parent) return null;

        const index = parent.children.indexOf(this);
        return ~index ? parent.children[index + 1] || null : null;
    }
}

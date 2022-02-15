import Yoga, { YogaNode } from 'yoga-layout-prebuilt';
import { NodeType, HadesElement, Layout, Content } from '.';
import { ShapePayload } from '../shape';

export class HadesNode {
    type: NodeType = NodeType.NONE;
    parent: HadesElement | null = null;
    content: Content = null;
    yoga: YogaNode = Yoga.Node.create();
    shape: ShapePayload = {};
    layout: Layout = null!; //will be set synchronously right after render

    get nextSibling(): HadesNode | null {
        const { parent } = this;
        if (!parent) return null;

        const index = parent.children.indexOf(this);
        return ~index ? parent.children[index + 1] || null : null;
    }
}

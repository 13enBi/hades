import { insertItem, removeItem } from '@hades/shared';
import { NodeType, Props } from './index';
import { HadesNode } from './node';

export class HadesElement extends HadesNode {
    props: Props;
    type = NodeType.VIEW;
    children: HadesNode[] = [];

    constructor(props?: Props | null) {
        super();
        this.props = props || {};
    }

    insertBefore(
        this: this,
        child: HadesNode,
        anchor: HadesNode | undefined | null
    ) {
        if (child.parent) child.parent.removeChild(child);

        const index = insertItem(this.children, child, anchor);
        this.yoga.insertChild(child.yoga, index);
        child.parent = this;
    }

    removeChild(this: this, child: HadesNode) {
        removeItem(this.children, child);
        this.yoga.removeChild(child.yoga);
        child.parent = null;
    }
}

export const createViewElement = (props?: Props | null) =>
    new HadesElement(props);

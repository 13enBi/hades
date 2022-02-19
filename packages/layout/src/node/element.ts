import { insertItem, removeItem } from '@hades/shared';
import { Anchor, setStyle, Style } from '..';
import { Props } from './index';
import { HadesNode } from './node';

export class HadesElement extends HadesNode {
    props: NonNullable<Props>;
    children: HadesNode[] = [];
    style: Style = {};

    constructor(props?: Props) {
        super();
        this.props = props || {};
    }

    setStyle(style: Style) {
        setStyle(this, (this.style = style));
    }

    insertBefore(this: HadesElement, child: HadesNode, anchor: Anchor) {
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

export const isElement = (node: unknown): node is HadesElement =>
    node instanceof HadesElement;

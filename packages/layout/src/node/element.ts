import { insertItem, removeItem } from '@hades/shared';
import { Anchor, setStyle, Style } from '..';
import { Props } from './index';
import { HadesNode } from './node';

export class HadesElement extends HadesNode {
    props: NonNullable<Props>;
    children: HadesNode[] = [];
    protected _style: Style = {};

    constructor(props?: Props) {
        super();
        this.props = props || {};
    }

    get style() {
        return this._style;
    }

    set style(style: Style) {
        setStyle(this, (this._style = style));

        this.markDirty();
    }

    insertBefore(this: HadesElement, child: HadesNode, anchor: Anchor) {
        if (child.parent) child.parent.removeChild(child);

        const index = insertItem(this.children, child, anchor);
        this.yoga.insertChild(child.yoga, index);
        child.parent = this;

        child.markDirty();
    }

    removeChild(this: this, child: HadesNode) {
        removeItem(this.children, child);
        this.yoga.removeChild(child.yoga);
        child.parent = null;

        child.markDirty();
    }
}

export const isElement = (node: unknown): node is HadesElement =>
    node instanceof HadesElement;

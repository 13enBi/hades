import { Anchor, HadesNode, NodeType, Props } from '.';
import { HadesElement } from './element';

export class HadesTextElement extends HadesElement {
    type = NodeType.TEXT;

    constructor(props?: Props) {
        super(props);
    }

    insertBefore(this: this, child: HadesNode, anchor: Anchor) {
        if (child instanceof HadesElement)
            throw new Error(`element can not be a child of a <Text> element`);

        super.insertBefore(child, anchor);
    }
}

export const createTextElement = (props?: Props) => new HadesTextElement(props);

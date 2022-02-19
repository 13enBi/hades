import { Anchor, HadesNode, NodeType, Props } from '.';
import { Style } from '..';
import { TextDefaultStyle } from '../style/default';
import { HadesElement } from './element';

export class HadesTextElement extends HadesElement {
    type = NodeType.TEXT;
    style = TextDefaultStyle;

    setStyle(style: Style) {
        if (style.display === 'flex') style.display = 'inline';

        super.setStyle(style);
    }

    insertBefore(this: this, child: HadesNode, anchor: Anchor) {
        if (child instanceof HadesElement)
            throw new Error(`element can not be a child of a <Text> element`);

        super.insertBefore(child, anchor);
    }
}

export const createTextElement = (props?: Props) => new HadesTextElement(props);

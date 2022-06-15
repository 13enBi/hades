import { Anchor, HadesNode, NodeType } from '.';
import { Style } from '..';
import { TextDefaultStyle } from '../style/default';
import { HadesElement } from './element';

export class HadesTextElement extends HadesElement {
    type = NodeType.TEXT;
    _style = TextDefaultStyle;

    set style(style: Style) {
        if (style.display === 'flex') style.display = 'inline';

        super.style = style;
    }

    insertBefore(this: this, child: HadesNode, anchor: Anchor) {
        if (child instanceof HadesElement)
            throw new Error(
                `<${child.type}> element can not be a child of a <${this.type}> element`
            );

        super.insertBefore(child, anchor);
    }
}

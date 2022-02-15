import { getContentSize } from '@hades/shared';
import { NodeType, Content } from './';
import { HadesNode } from './node';

export class HadesTextNode extends HadesNode {
    type = NodeType.RAW_TEXT;

    constructor() {
        super();

        this.yoga.setMeasureFunc(() => getContentSize(this.content));
    }

    setTextContent(text: string) {
        this.yoga.markDirty();
        this.content = text;
    }
}

export const createTextNode = (content: Content) => {
    const node = new HadesTextNode();
    node.content = content;

    return node;
};

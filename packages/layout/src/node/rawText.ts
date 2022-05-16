import { getContentSize } from '@hades/shared';
import { NodeType, Content } from '.';
import { HadesNode } from './node';

export class HadesRawTextNode extends HadesNode {
    type = NodeType.RAW_TEXT;

    constructor() {
        super();

        this.yoga.setMeasureFunc(() => getContentSize(this.content));
    }

    setTextContent(text: string) {
        this.yoga.markDirty();
        this.markDirty();
        this.content = text;
    }
}

export const createRawText = (content: Content) => {
    const node = new HadesRawTextNode();
    node.content = content;

    return node;
};

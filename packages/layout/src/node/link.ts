import { NodeType } from './';
import { HadesTextElement } from './text';

export class HadesLinkElement extends HadesTextElement {
    type = NodeType.LINK;

    protected _href = '';

    get href() {
        return this._href;
    }

    set href(newHref) {
        this._href = newHref;

        this.markDirty();
    }
}

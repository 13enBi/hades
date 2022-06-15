import { NodeType } from '.';
import { ImageDefaultStyle } from '../style/default';
import { HadesElement } from './element';

export class HadesImageElement extends HadesElement {
    type = NodeType.IMAGE;
    _style = ImageDefaultStyle;

    protected _src: string | Buffer = '';

    get src() {
        return this._src;
    }

    set src(newSrc) {
        this._src = newSrc;

        this.markDirty();
    }
}

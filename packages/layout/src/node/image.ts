import { NodeType } from '.';
import { ImageDefaultStyle } from '../style/default';
import { HadesElement } from './element';

export class HadesImageElement extends HadesElement {
    type = NodeType.IMAGE;
    src: string | Buffer = '';
    style = ImageDefaultStyle;
}

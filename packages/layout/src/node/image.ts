import { NodeType } from '.';
import { HadesElement } from './element';

export class HadesImageElement extends HadesElement {
    type = NodeType.IMAGE;
    src = '';
    alt = '';
}

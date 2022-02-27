import { HadesElement, NodeType } from '.';

export class HadesImageElement extends HadesElement {
    type = NodeType.IMAGE;
    src = '';
    alt = '';
}

import { NodeType } from '.';
import { HadesTextElement } from './text';

export class HadesLinkElement extends HadesTextElement {
    type = NodeType.LINK;
    href = '';
}

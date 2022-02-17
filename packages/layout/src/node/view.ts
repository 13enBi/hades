import { NodeType, Props } from '.';
import { HadesElement } from './element';

export class HadesViewElement extends HadesElement {
    type = NodeType.VIEW;
}

export const createViewElement = (props?: Props) => new HadesViewElement(props);

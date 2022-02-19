import { NodeType, Props } from '.';
import { ViewDefaultStyle } from '../style/default';
import { HadesElement } from './element';

export class HadesViewElement extends HadesElement {
    type = NodeType.VIEW;
    style = ViewDefaultStyle;
}

export const createViewElement = (props?: Props) => new HadesViewElement(props);

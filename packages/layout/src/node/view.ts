import { ViewDefaultStyle } from '../style/default';
import { NodeType } from './';
import { HadesElement } from './element';

export class HadesViewElement extends HadesElement {
    type = NodeType.VIEW;
    _style = ViewDefaultStyle;
}

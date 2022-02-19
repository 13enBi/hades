import { YogaNode } from 'yoga-layout-prebuilt';
import { HadesNode } from '.';
import { EdgeValue } from './style/edges';

type Layout = ReturnType<YogaNode['getComputedLayout']>;

export type RenderContext = { layout: Layout; padding: EdgeValue };

const nonePadding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};

export const createRenderContext = (node: HadesNode): RenderContext => ({
    layout: node.yoga.getComputedLayout(),
    padding: nonePadding
});

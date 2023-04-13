import { App, Component, ComponentPublicInstance, createRenderer } from 'vue';

import { HadesElement } from '@hades/layout';
import { NOOP } from '@hades/shared';

import { registerComponents } from './components/register';
import { createContainer } from './container';
import createNodeOps from './nodeOps';
import provideOptions, { Options, resolveOptions } from './options';

type HadesApp = App<HadesElement> & {
    mount: () => ComponentPublicInstance;
};

export const createHadesApp = (
    rootComponent: Component,
    options?: Partial<Options>
) => {
    const resolvedOptions = resolveOptions(options);
    const container = createContainer(resolvedOptions);
    const nodeOps = createNodeOps(container);
    const { createApp } = createRenderer(nodeOps);
    const app = createApp(rootComponent);

    app.config.compilerOptions.comments = false;
    app.config.warnHandler = NOOP;
    app.use(provideOptions, resolvedOptions);
    app.use(registerComponents);

    const { mount } = app;
    app.mount = () => mount(container);

    return app as HadesApp;
};

export default createHadesApp;

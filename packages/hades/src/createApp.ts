import { App, Component, ComponentPublicInstance, createRenderer } from 'vue';
import { HadesElement } from '@hades/layout';
import { NOOP } from '@hades/shared';
import createNodeOps from './nodeOps';
import { createContainer } from './container';
import provideOptions, { Options, resolveOptions } from './options';
import { View } from './components';

type HadesApp = App<HadesElement> & {
    mount: () => ComponentPublicInstance;
};

const registerComponents = (app: App) => {
    app.component('h-view', View);
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

    registerComponents(app);

    app.config.compilerOptions.comments = false;
    app.config.warnHandler = NOOP;
    app.use(provideOptions, resolvedOptions);

    const { mount } = app;
    app.mount = () => mount(container);

    return app as HadesApp;
};

export default createHadesApp;

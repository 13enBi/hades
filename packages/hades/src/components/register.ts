import { App } from 'vue';

import * as components from './';

export const registerComponents = (app: App) => {
    Object.values(components).forEach(component => {
        app.component(component.name, component);
    });
};

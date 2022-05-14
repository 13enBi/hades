import { createHadesApp } from 'hades';
import Jest from './jest';
import Counter from './counter/index.vue';
import Image from './image/index';

createHadesApp(Image).mount();

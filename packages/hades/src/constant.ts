import { InjectionKey } from 'vue';

export const KEY_STDOUT = Symbol('stdout') as InjectionKey<NodeJS.WriteStream>;
export const KEY_STDIN = Symbol('stdin') as InjectionKey<NodeJS.ReadStream>;

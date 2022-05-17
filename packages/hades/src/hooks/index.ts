import { inject } from 'vue';
import { KEY_STDIN, KEY_STDOUT } from '../constant';

export const useStdin = () => inject(KEY_STDIN)!;

export const useStdout = () => inject(KEY_STDOUT)!;

export * from './useInput';

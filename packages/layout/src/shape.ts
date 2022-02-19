import Yoga from 'yoga-layout-prebuilt';

import { EdgeValue } from './style/edges';

type WithUndef<T extends object> = {
    [P in keyof T]?: T[P] | void;
};

export type ShapePayload = WithUndef<{
    color: string;
    backgroundColor: string;

    padding: EdgeValue;

    borderStyle?: string;
    borderColor?: string;
}>;

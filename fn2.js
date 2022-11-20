import { L, take, curry, pipe } from './fn.js';

export const takeAll = take(Infinity);

export const map = curry(pipe(L.map, takeAll));

export const filter = curry(pipe(L.filter, takeAll));
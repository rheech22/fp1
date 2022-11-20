import { L, pipe, take, curry, go, range } from './fn.js';
import { map, filter, takeAll } from './fn2.js';

const { log } = console;

// log(map(a => a + 10, L.range(4)));

// log(filter(a => a % 2, L.range(10)));

// L.flatten

const isIterable = a => a && a[Symbol.iterator];

// L.flatten = function* (iter) {
//   for (const a of iter) {
//     if (isIterable(a)) {
//       for (const b of a) yield b;
//     }
//     else yield a;
//   }
// };

// 위와 같다
L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};

const arr = [[1, 2], 3, 4, [5, 6], [7, 8, 9]];
const it = L.flatten(arr);

// log(it.next());
// log(it.next());
// log(it.next());
// log(it.next());

// log(take(3, it));

const flatten = pipe(L.flatten, takeAll);

// log(flatten(arr))

const arr2 = [[1, 2], 3, 4, [5, 6], [7, 8, 9, [10, 11, 12]]];

// log(flatten(arr2))

// 깊은 플랫을 원한다면
L.DeepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};

// log(...L.DeepFlat(arr2))

// FlatMap

L.flatMap = curry(pipe(
  L.map,
  L.flatten,
));

const res = L.flatMap(a => a, [[1, 2], 3, [4, 5]]);

log([...res])

// with range

// log(...L.flatMap(L.range, map(a => a + 1, [1, 2, 3])));


// with take

// log(take(3, L.flatMap(L.range, map(a => a + 1, [1, 2, 3]))));




import {
  map,
  filter,
  reduce,
  go,
  pipe,
  curry,
  take,
  range,
  join,
  L,
  find
} from './fn.js';

const { log } = console;

// reduce

const queryStr = obj => go(
  obj,
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  reduce((a, b) => `${a}&${b}`)
);

log(queryStr({ limit: 10, offset: 10, type: 'notice' }))

const queryStr2 = pipe(
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  reduce((a, b) => `${a}&${b}`)
);

log(queryStr2({ limit: 10, offset: 10, type: 'notice' }))

// join - 모든 이터레이터에서 작동 가능한

// const join = curry((sep = ',', iter) => reduce((a, b) => `${a}${sep}${b}`, iter));

const queryStr3 = pipe(
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  join('&')
);

log(queryStr3({ limit: 10, offset: 10, type: 'notice' }))

const queryStr4 = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join('&')
);

log(queryStr4({ limit: 10, offset: 10, type: 'notice' }))

// take, find

const users = [
  { age: 32 },
  { age: 31 },
  { age: 29 },
  { age: 31 },
  { age: 19 },
  { age: 38 },
  { age: 40 },
  { age: 41 },
  { age: 33 },
]

const find2 = (f, iter) => go(
  iter,
  // 모두 순회하는 아쉬움
  filter(a => (log(a), f(a))),
  take(1),
  ([a]) => a
);

log(find2(u => u.age < 30, users));

log('-----------------------------');

// const find = curry((f, iter) => go(
//   iter,
//   L.filter(f),
//   take(1),
//   ([a]) => a
// ));

log(find(u => u.age < 30)(users), 'here');

go(
  users,
  L.map(u => u.age),
  find(n => n < 30),
  log
)
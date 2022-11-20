const { log } = console;

export const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

export const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
})

export const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
})

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

export const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }

  // let cur;

  // while (!(cur = iter.next()).done) {
  //   const a = cur.value;
  //   acc = f(acc, a);
  //   // acc = acc instanceof Promise ? acc.then(acc => f(acc, a)) : f(acc, a);
  // }

  return go1(
    acc,
    function recur(acc) {
      let cur;

      while (!(cur = iter.next()).done) {
        const a = cur.value;

        acc = f(acc, a);

        if (acc instanceof Promise) {
          return acc.then(recur);
        }
      }

      return acc;
    });
})

export const go = (...args) => reduce((a, f) => f(a), args);
// about `go`
// acc =  arr, iter = [map, reduce]
// acc =  arr, a = map, (arr, map) => map(arr)
// acc = map(arr), iter = [reduce], a = reduce, (map(arr), reduce) => reduce(map(arr))
// const go = (initialValue, ...fs) => reduce((acc, f) => f(acc), initialValue, fs);

export const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const queryStr = pipe(
  Object.entries, // f
  map(([k, v]) => `${k}=${v}`), // fs1
  reduce((a, b) => `${a}&${b}`) // fs2
);

const param = { limit: 10, offset: 10, type: 'notice' } // as

queryStr(param)

go(
  Object.entries(param),
  map(([k, v]) => `${k}=${v}`), // fs1
  reduce((a, b) => `${a}&${b}`) // fs2
)

export const range = l => {
  let i = -1;
  let res = [];

  while (++i < l) {
    res.push(i);
  }

  return res;
}

export const L = {};

L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
}

export const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
})

L.map = curry(function* (f, iter) {
  for (const a of iter) yield f(a);
})

L.filter = curry(function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
})

L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
}

export const join = curry((sep = ',', iter) => reduce((a, b) => `${a}${sep}${b}`, iter));

export const find = curry((f, iter) => go(
  iter,
  L.filter(f),
  take(1),
  ([a]) => a
));

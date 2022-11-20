import {
  map,
  filter,
  reduce,
  go,
  pipe,
  curry,
  take,
  range,
  L
} from './fn.js';

const { log } = console;

const products = [
  { name: 'a', price: 1500 },
  { name: 'b', price: 1200 },
  { name: 'c', price: 1300 },
  { name: 'd', price: 1400 },
  { name: 'e', price: 1700 },
];

log(map(p => p.name, products));
log(map(p => p.price, products));

function* gen() {
  yield 2;
  yield 3;
  yield 4;
}

log(map(a => a * 2, gen()));

let m = new Map();

m.set('a', 10);
m.set('b', 20);

log(new Map(map(([k, a]) => [k, a * 2], m)));

log(...filter(p => p.price < 1500, products));

log(...filter(p => p.price >= 1500, products));

log(filter(n => n % 2, function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
}()))

const add = (a, b) => a + b;

log(reduce(add, 0, [1, 2, 3, 4, 5]))
log(reduce(add, [1, 2, 3, 4, 5]))

log(
  reduce(
    (acc, cur) => acc + cur.price,
    0,
    products
  )
)

log(
  reduce(
    add,
    map(p => p.price,
      filter(p => p.price >= 1300, products)
    )
  )
);

log(
  reduce(
    add,
    filter(p => p >= 1300,
      map(p => p.price, products),
    )
  )
);

go(
  0,
  a => a + 1,
  a => a + 10,
  a => a + 100,
  log
);

const f = pipe(
  (a, b) => a + b,
  a => a + 10,
  a => a + 100
);

log(f(0, 1));

go(
  products,
  products => filter(p => p.price >= 1300, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  log
)

const mult = curry((a, b) => a * b);

log(mult(1, 3));
log(mult(1)(3));

const totalPrice = pipe(
  map(p => p.price),
  reduce(add),
)

const baseTotalPrice = predi => pipe(
  filter(predi),
  totalPrice
)

go(
  products,
  baseTotalPrice(p => p.price >= 1300),
  log
)


log(range(5));
log(range(2));

const list = range(4);
log(list);
log(reduce(add, list))


const list2 = L.range(4);

log(list2);
log(reduce(add, list2));

// const test = (name, time, f) => {
//   console.time(name);
//   while (time--) f();
//   console.timeEnd(name);
// }

// test('L.range', 10, () => reduce(add, L.range(10000000)));
// test('range', 10, () => reduce(add, range(10000000)));

console.time('')

go(
  range(100000),
  // take(5),
  reduce(add),
  log
)
console.timeEnd('')

console.time('')

go(
  L.range(100000),
  // take(5),
  reduce(add),
  log
)
console.timeEnd('')


const it2 = map(a => a + 10, [1, 2, 3]);

log(it2);

const it = L.map(a => a + 10, [1, 2, 3]);

log([...it]);

// log(it.next());
// log(it.next());
// log(it.next());

// L.filter

const it3 = L.filter(a => a % 2, [1, 2, 3, 4]);

log(it3.next());
log(it3.next());
log(it3.next());


go(
  range(10),
  map(n => n + 10),
  filter(n => n % 2),
  take(2),
  log
)

go(
  L.range(10),
  L.map(n => n + 10),
  L.filter(n => n % 2),
  take(2),
  log
)
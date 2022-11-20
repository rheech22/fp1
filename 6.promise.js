import { find, go } from "./fn.js";

const { log } = console;

// Promise

// 일급

// const add10 = (a, cb) => {
//   setTimeout(() => cb(a + 10), 100);
// }

// const a = add10(5, res => {
//   add10(res, res => {
//     add10(res, res => {
//       log(res)
//     });
//   });
// });

// log(a) // undefined

// 비동기 상황을 코드로서가 아닌, 값으로서 즉 일급으로 다룬다는 점이 가장 큰 차이
// const add20 = (a) => {
//   return new Promise(resolve => setTimeout(() => resolve(a + 20), 100));
// }

// const b = add20(5).then(add20).then(add20).then(log);

// log(b) // Promise{ <pending> }


// 일급 활용
// const delay100 = a => new Promise(resolve => setTimeout(() => resolve(a), 100));

// const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);
// const add5 = a => a + 5;

// const n = 10;
// const r = go1(10, add5);

// // log(r);
// const s1 = go1(n, add5);
// const s2 = go1(s1, log);
// log(s1, 's1');
// log(s2, 's2');

// const n2 = delay100(10);
// const r2 = go1(n2, add5)

// const s3 = go1(n2, add5);
// const s4 = go1(s3, log)

// log(s3, 's3');
// log(s4, 's4');

// Composition

// const g = a => a + 1;
// const f = a => a * a;

// log(f(g(1))); // 4
// log(f(g())); // NaN -> not safe

// // 특정 상황에서 안전하게 함수를 합성하기 위한 방식

// Array.of(1).map(g).map(f).forEach(r => log(r)); // 4
// [].map(g).map(f).forEach(r => log(r)); // nothing

// // 프라미스도 마찬가지

// Promise.resolve(2).then(g).then(f).then(r => log(r)); // 4
// new Promise(resolve => setTimeout(() => resolve(1), 100)).then(g).then(f).then(r => log(r)) // 4

// Kleisli Composition

// f(g(x)) = f(g(x))
// f(g(x)) = g(x)

const users = [
  { id: 1, name: 'aa' },
  { id: 2, name: 'bb' },
  { id: 3, name: 'cc' },
];

const getUserById = id => find(u => u.id === id, users);

const f2 = ({ name }) => name;
const g2 = getUserById;

// const fg2 = id => f2(g2(id));

// const r = fg2(2);

// log(r);

// 만약 데이터가 변경된다면? 

users.pop();
users.pop();

// 에러가 뜸 - 이는 안전한 합성이 아님

// const r2 = fg2(2);

// log(r2); // 에러

// 안전한 합성을 위해서 논리연산자 활용

// const getUserById2 = id => find(u => u.id === id, users) || Promise.reject('없어요 !');

// const f3 = ({ name }) => name;
// const g3 = getUserById2;

// const fg3 = id => Promise.resolve(id).then(g3).then(f3).catch(a => a);

// fg3(2).then(log);

const res = go(
  Promise.resolve(1),
  a => a + 10,
  // a => Promise.reject('error ---'),
  a => Promise.resolve(a + 200),
  // a => log('-----'),
  a => a + 1000,
  a => a + 10000,
  a => a * 2,
)

res.then(a => log(a))




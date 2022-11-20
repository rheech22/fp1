
const { log } = console;

// ES5에서의 리스트 순회

const list = [1, 2, 3];

for (let i = 0; i < list.length; i++) {
  log(list[i]);
}

// ES6에서의 리스트 순회 - 좀 더 선언적이고 간결함

for (const a of list) {
  log(a);
}

// 이터러블/이터레이터 프로토콜
// 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]()를 가진 값
// 이터레이터: { value, done } 객체를 리턴하는 next()를 가진 값
// 이터러블/이터레이터 프로토콜: 이터러블을 for ... of, 전개 연산자 등과 함께 동작하도록 한 규약

log('Array ---------');

const arr = [1, 2, 3];

// 이터레이터를 지우면 for ... of 문 동작 안함
// arr[Symbol.iterator] = null;
for (const a of arr) log(a);

let arrayIterator = arr[Symbol.iterator]();

log(arrayIterator.next()); // { value: 1, done: false }
log(arrayIterator.next()); // { value: 2, done: false }
log(arrayIterator.next()); // { value: 3, done: false }
log(arrayIterator.next()); // { value: undefined, done: true }

log('Set ---------');

const set = new Set([1, 2, 3]);
for (const a of set) log(a);

let setIterator = set[Symbol.iterator]();

log(setIterator.next()); // { value: 1, done: false }
log(setIterator.next()); // { value: 2, done: false }
log(setIterator.next()); // { value: 3, done: false }
log(setIterator.next()); // { value: undefined, done: true }

log('Map ---------');
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const a of map) log(a);
for (const a of map.keys()) log(a);
for (const a of map.values()) log(a);
for (const a of map.entries()) log(a);

let mapIterator = map[Symbol.iterator]();

log(mapIterator.next()); // { value: [ 'a', 1 ], done: false }
log(mapIterator.next()); // { value: [ 'b', 2 ], done: false }
log(mapIterator.next()); // { value: [ 'c', 3 ], done: false }
log(mapIterator.next()); // { value: undefined, done: true }

let mapValuesIterator = map.values()[Symbol.iterator]();

log(mapValuesIterator.next());
log(mapValuesIterator.next());
log(mapValuesIterator.next());
log(mapValuesIterator.next());

// 실제 이터러블, 이터레이터는 ? 

const realIterable = [1, 2, 3]; // 이터러블

let realIterator = realIterable[Symbol.iterator](); // 이터레이터

// 이터레이터's 이터레이터 함수가 리턴하는 건 자기 자신인 이터레이터
log(realIterator[Symbol.iterator]() === realIterator);

// 사용자 정의 이터러블을 통해 알아보기

const customIterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
      [Symbol.iterator]() { return this; }
    }
  }
}

for (const a of customIterable) log(a);

let customIterator = customIterable[Symbol.iterator]();

for (const a of customIterator) log(a);

log(customIterator.next());
log(customIterator.next());
log(customIterator.next());
log(customIterator.next());

// 전개 연산자도 이터레이터 프로토콜을 따름

const a = [1, 2];

// a[Symbol.iterator] = null;
log([...a, ...[3, 4]]);
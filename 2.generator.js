

// 제너레이터: 이터레이터이자 이터러블을 생성하는 함수

const { log } = console;

function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 100; // 순회에서는 배제
}

let iter = gen();

log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());

for (const a of gen()) log(a);

// odds

function* infinity(i = 0) {
  while (true) yield i++;
}

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a === l) return;
  }
}

function* odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

let iter2 = odds(10);

log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());

for (const a of odds(40)) log(a);

// for of, 전개 연산자, 구조 분해, 나머지 연산자

log(...odds(10));

const [head, ...tail] = odds(5)
log(head);
log(tail);
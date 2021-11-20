import { Interval } from "./sicp/interval-arithmetic";
import {
  list,
  listRef,
  tail,
  length,
  lengthIter,
  map,
  print,
  pair,
  Pair,
  countLeaves,
  mapTree,
  accumulate,
  filter,
} from "./sicp/pair";

const x = list(1, 2, 3, 4);
// console.log(x);
// console.log(listRef(x, 5));
// console.log(lengthIter(x));
// console.log(map(x, (n) => 3 * n));

const y = pair(list(1, 2), list(3, 4));
// console.log(y);
// console.log(map(y, (n) => 3 * n));
// console.log(countLeaves(list(y, y)));
// console.log(mapTree(y, (x) => 3 * x));
// print(y);

// console.log(filter(x, (t) => t > 3));
console.log(
  accumulate(
    filter(x, (t) => t % 2 === 0),
    0,
    (a, b) => a + b
  )
);

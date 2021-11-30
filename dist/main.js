"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pair_1 = require("./sicp/pair");
const x = pair_1.list(1, 2, 3, 4);
// console.log(x);
// console.log(listRef(x, 5));
// console.log(lengthIter(x));
// console.log(map(x, (n) => 3 * n));
const y = pair_1.pair(pair_1.list(1, 2), pair_1.list(3, 4));
// console.log(y);
// console.log(map(y, (n) => 3 * n));
// console.log(countLeaves(list(y, y)));
// console.log(mapTree(y, (x) => 3 * x));
// print(y);
// console.log(filter(x, (t) => t > 3));
console.log(pair_1.accumulate(pair_1.filter(x, (t) => t % 2 === 0), 0, (a, b) => a + b));
//# sourceMappingURL=main.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pair_1 = require("./sicp/pair");
const symbolic_data_1 = require("./sicp/symbolic-data");
// const x = list(1, 2, 3, 4);
// print(x);
// print(reverse(x));
// print(reverse2(x));
// function plus_curried(x: number) {
//   return (y: number) => x + y;
// }
// function brooks(f, items) {
//   return isNull(items) ? f : brooks(f(head(items)), tail(items));
// }
// function brooks_curried(items) {
//   return brooks(head(items), tail(items));
// }
// 2.2
// print(brooks_curried(list(brooks_curried, list(plus_curried, 3, 4))));
// (print(fringe(list(x,x))));
// const seq_seq = list(
//   list(1, 2, 3),
//   list(4, 5, 6),
//   list(7, 8, 9),
//   list(10, 11, 12)
// );
// print(accumulate_n(seq_seq, 0, (x, y) => x + y));
// print(reverse(x));
// print(reverse2(x));
// print(x);
// print(listRef(x, 5));
// print(lengthIter(x));
// (print(map(x, (n) => 4 * n)));
// const y = pair(list(1, 2), list(3, 4));
// print(y);
// print(map(y, (n) => 3 * n));
// print(countLeaves(list(y, y)));
// print((print(mapTree(seq_seq, (x) => 3 * x))));
// print(y);
// print(filter(x, (t) => t > 3));
// print(
//   accumulate(
//     filter(x, (t) => t % 2 === 0),
//     0,
//     (a, b) => a + b
//   )
// );
// print(unique_pairs_3(5));
// print(unique_triples(5))
// 2.3
(0, pair_1.print)((0, pair_1.list)("a", "b"));
(0, pair_1.print)((0, symbolic_data_1.member)("apple", (0, pair_1.list)("pear", "banana", "apple", "prune")));
console.log((0, symbolic_data_1.equal)((0, pair_1.list)('a', 2, 2), (0, pair_1.list)('b', 2, 2)));
//# sourceMappingURL=main.js.map
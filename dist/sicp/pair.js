"use strict";
// export class Pair {
//   pair: [any, any];
Object.defineProperty(exports, "__esModule", { value: true });
exports.accumulate = exports.filter = exports.mapTree = exports.countLeaves = exports.map = exports.lengthIter = exports.length = exports.isNull = exports.listRef = exports.list = exports.print = exports.isPair = exports.tail = exports.head = exports.pair = void 0;
function pair(a, b) {
    return [a, b];
}
exports.pair = pair;
function head(p) {
    return p[0];
}
exports.head = head;
function tail(p) {
    return p[1];
}
exports.tail = tail;
function isPair(val) {
    return Array.isArray(val) && val.length === 2;
}
exports.isPair = isPair;
function print(ls) {
    const retString = (list) => {
        if (isNull(list)) {
            return "";
        }
        // 单节点
        if (!isPair(list)) {
            console.log(list);
            return list.toString();
        }
        // Pair
        if (tail(list) === null) {
            return print(head(list));
        }
        else {
            return `(${print(head(list))},${print(tail(list))})`;
        }
    };
    return console.log(retString(ls));
}
exports.print = print;
// 从最后一个开始结合
function list(...args) {
    // 这里null可以理解为一个空的list
    return args.reverse().reduce((acc, curr) => {
        return pair(curr, acc);
    }, null);
}
exports.list = list;
// 获取第n个位置的内容
function listRef(ls, n) {
    return n === 0 ? head(ls) : listRef(tail(ls), n - 1);
}
exports.listRef = listRef;
// 判断是否为空节点
function isNull(node) {
    if (node === null) {
        return true;
    }
}
exports.isNull = isNull;
// 如果序列尾部不是null该如何实现？
function length(ls) {
    return isNull(ls) ? 0 : 1 + length(tail(ls));
}
exports.length = length;
// 迭代版本
function lengthIter(ls, len = 0) {
    return isNull(ls) ? len : lengthIter(tail(ls), len + 1);
}
exports.lengthIter = lengthIter;
// 要求来说应该是有能力处理list 而非node的func 后续可能还有优化（树的map处理）
function map(ls, func) {
    return isNull(list) ? null : pair(func(head(ls)), map(tail(ls), func));
}
exports.map = map;
// 树的叶子节点计算
function countLeaves(tr) {
    if (isNull(tr))
        return 0;
    if (!isPair(tr))
        return 1;
    return countLeaves(head(tr)) + countLeaves(tail(tr));
}
exports.countLeaves = countLeaves;
function mapTree(tr, func) {
    if (isNull(tr))
        return null;
    if (!isPair(tr))
        return func(tr);
    return pair(mapTree(head(tr), func), mapTree(tail(tr), func));
}
exports.mapTree = mapTree;
// 根据断言predicate过滤ls
function filter(ls, predicate) {
    if (isNull(ls))
        return ls;
    if (predicate(head(ls))) {
        return pair(head(ls), filter(tail(ls), predicate));
    }
    else {
        return filter(tail(ls), predicate);
    }
}
exports.filter = filter;
// 累积函数 输入的函数为二元运算
function accumulate(ls, initial, op) {
    if (isNull(ls))
        return initial;
    return op(head(ls), accumulate(tail(ls), initial, op));
}
exports.accumulate = accumulate;
//# sourceMappingURL=pair.js.map
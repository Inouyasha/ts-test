"use strict";
// export class Pair {
//   pair: [any, any];
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique_triples = exports.unique_pairs_3 = exports.unique_pairs = exports.fold_left = exports.accumulate_n = exports.accumulate = exports.filter = exports.fringe = exports.mapTree = exports.countLeaves = exports.forEach = exports.map = exports.deepReverse = exports.reverse2 = exports.reverse = exports.lastPair = exports.append = exports.lengthIter = exports.length = exports.isNull = exports.listRef = exports.list = exports.print = exports.isPair2 = exports.tail2 = exports.head2 = exports.pair2 = exports.isPair = exports.tail = exports.head = exports.pair = void 0;
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
// 另外一种pair的实现
// 可以将这种闭包式实现的pair理解为一个class
function pair2(a, b) {
    const dispatch = (index) => {
        if (index === 0) {
            return a;
        }
        if (index === 1) {
            return b;
        }
        throw new Error("not valid index");
    };
    return dispatch;
}
exports.pair2 = pair2;
function head2(p) {
    return p(0);
}
exports.head2 = head2;
function tail2(p) {
    return p(1);
}
exports.tail2 = tail2;
// ?这个怎么证明
function isPair2(val) {
    return Array.isArray(val) && val.length === 2;
}
exports.isPair2 = isPair2;
function print(ls) {
    const retString = (list) => {
        if (isNull(list)) {
            return "";
        }
        // 单节点
        if (!isPair(list)) {
            return list.toString();
        }
        // Pair
        if (tail(list) === null) {
            const x = head(list);
            return retString(head(list));
        }
        else {
            return `(${retString(head(list))},${retString(tail(list))})`;
        }
    };
    console.log(retString(ls));
    return retString(ls);
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
    return node === null;
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
// 合并两个list 找到list1的null 把list2放进去
function append(list1, list2) {
    return isNull(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}
exports.append = append;
// 2.17 返回非空list最后一个pair
function lastPair(list) {
    return isNull(tail(list)) ? list : lastPair(tail(list));
}
exports.lastPair = lastPair;
// 2.18 反转list
function reverse(list) {
    let newList = pair(head(list), null);
    let node = tail(list);
    while (!isNull(node)) {
        newList = pair(head(node), newList);
        node = tail(node);
    }
    return newList;
}
exports.reverse = reverse;
function reverse2(list) {
    function reverseIter(items, result) {
        return isNull(items)
            ? result
            : reverseIter(tail(items), pair(head(items), result));
    }
    return reverseIter(list, null);
}
exports.reverse2 = reverse2;
// 2.27 深度反转树
function deepReverse(list) {
    return isNull(list)
        ? null
        : isPair(list)
            ? // 相邻节点 深度反转后 调转位置
                append(deepReverse(tail(list)), deepReverse(head(list)))
            : // 首节点反转后 和 null调转位置
                pair(deepReverse(head(list)), null);
}
exports.deepReverse = deepReverse;
// 要求来说应该是有能力处理list 而非node的func 后续可能还有优化（树的map处理）
function map(ls, func) {
    return isNull(ls) ? null : pair(func(head(ls)), map(tail(ls), func));
}
exports.map = map;
// 2.23
function forEach(ls, func) {
    return isNull(ls) ? null : pair(func(head(ls)), forEach(tail(ls), func));
}
exports.forEach = forEach;
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
// 2.28 把所有叶子节点拉到同级
function fringe(tree) {
    if (isNull(tree))
        return null;
    if (isPair(tree)) {
        return append(fringe(head(tree)), fringe(tail(tree)));
    }
    // 叶子节点
    return list(tree);
}
exports.fringe = fringe;
// 2.32  全部子集 包含null
function subsets(l) {
    if (isNull(l)) {
        return list(null);
    }
    else {
        const rest = subsets(tail(l));
        return append(rest, map(rest, (subset) => {
            return pair(head(subset), subset);
        }));
    }
}
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
// 累积函数 输入的函数为二元运算 需要注意的
function accumulate(ls, initial, op) {
    if (isNull(ls))
        return initial;
    return op(head(ls), accumulate(tail(ls), initial, op));
}
exports.accumulate = accumulate;
function accumulate_n(seqs, init, op) {
    return isNull(head(seqs))
        ? null
        : pair(accumulate(map(seqs, (x) => head(x)), init, op), accumulate_n(map(seqs, (x) => tail(x)), init, op));
}
exports.accumulate_n = accumulate_n;
// 左结合的accumulate
function fold_left(op, initial, sequence) {
    function iter(result, rest) {
        return isNull(rest)
            ? result
            : //  这是个迭代 每一次先结合在去到下一级
                // op的输入方向和accumulate相反
                iter(op(result, head(rest)), tail(rest));
    }
    return iter(initial, sequence);
}
exports.fold_left = fold_left;
// 生成序列 [low,high]
function enumerate_interval(low, high) {
    return low > high ? null : pair(low, enumerate_interval(low + 1, high));
}
// 作用后打平 输出一个List
function flatmap(f, seq) {
    return accumulate(map(seq, f), null, append);
}
// 生成1<=j<i<=n的序列
function unique_pairs(n) {
    return flatmap((i) => map(enumerate_interval(1, i - 1), (j) => list(i, j)), enumerate_interval(1, n));
}
exports.unique_pairs = unique_pairs;
function unique_pairs_3(n) {
    return flatmap((p) => {
        const i = head(p);
        const j = head(tail(p));
        return map(enumerate_interval(1, j - 1), (k) => list(i, j, k));
    }, flatmap((i) => map(enumerate_interval(1, i - 1), (j) => list(i, j)), enumerate_interval(1, n)));
}
exports.unique_pairs_3 = unique_pairs_3;
function unique_triples(n) {
    return flatmap((i) => flatmap((j) => map(enumerate_interval(1, j - 1), (k) => list(i, j, k)), enumerate_interval(1, i - 1)), enumerate_interval(1, n));
}
exports.unique_triples = unique_triples;
//# sourceMappingURL=pair.js.map
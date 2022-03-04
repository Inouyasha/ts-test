// export class Pair {
//   pair: [any, any];

//   constructor(a: any, b: any) {
//     this.pair = [a, b];
//   }

//   head() {
//     return this.pair[0];
//   }
//   tail() {
//     return this.pair[0];
//   }
// }
export type Pair<T> = [T, T];
export type List<T> = [List<T>, List<T>];
export type Func = (...args: any) => any;

export function pair<T>(a: T, b: T): Pair<T> {
  return [a, b];
}

export function head<T>(p: Pair<T>) {
  return p[0];
}
export function tail<T>(p: Pair<T>) {
  return p[1];
}
export function isPair<T>(val: Pair<T> | any) {
  return Array.isArray(val) && val.length === 2;
}

export type Pair2<T> = (index: number) => T;
// 另外一种pair的实现
// 可以将这种闭包式实现的pair理解为一个class
export function pair2<T>(a: T, b: T): Pair2<T> {
  const dispatch = (index: number) => {
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

export function head2<T>(p: Pair2<T>) {
  return p(0);
}
export function tail2<T>(p: Pair2<T>) {
  return p(1);
}
// ?这个怎么证明
export function isPair2<T>(val: Pair<T> | any) {
  return Array.isArray(val) && val.length === 2;
}

export function print<T>(ls: List<T>) {
  const retString = (list: List<T>) => {
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
    } else {
      return `(${retString(head(list))},${retString(tail(list))})`;
    }
  };

  console.log(retString(ls));
  return retString(ls);
}

// 从最后一个开始结合
export function list(...args: Array<any>) {
  // 这里null可以理解为一个空的list
  return args.reverse().reduce((acc, curr) => {
    return pair(curr, acc);
  }, null);
}

// 获取第n个位置的内容
export function listRef<T>(ls: List<T>, n: number) {
  return n === 0 ? head(ls) : listRef(tail(ls), n - 1);
}
// 判断是否为空节点
export function isNull(node: any) {
  return node === null;
}
// 如果序列尾部不是null该如何实现？
export function length<T>(ls: List<T>) {
  return isNull(ls) ? 0 : 1 + length(tail(ls));
}
// 迭代版本
export function lengthIter<T>(ls: List<T>, len: number = 0) {
  return isNull(ls) ? len : lengthIter(tail(ls), len + 1);
}

// 合并两个list 找到list1的null 把list2放进去
export function append<T>(list1: List<T>, list2: List<T>) {
  return isNull(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

// 2.17 返回非空list最后一个pair
export function lastPair<T>(list: List<T>) {
  return isNull(tail(list)) ? list : lastPair(tail(list));
}
// 2.18 反转list
export function reverse<T>(list: List<T>) {
  let newList: List<T> = pair(head(list), null);

  let node = tail(list);
  while (!isNull(node)) {
    newList = pair(head(node), newList);
    node = tail(node);
  }

  return newList;
}
export function reverse2<T>(list: List<T>) {
  function reverseIter(items: List<T>, result) {
    return isNull(items)
      ? result
      : reverseIter(tail(items), pair(head(items), result));
  }
  return reverseIter(list, null);
}
// 2.27 深度反转树
export function deepReverse<T>(list: List<T>) {
  return isNull(list)
    ? null
    : isPair(list)
    ? // 相邻节点 深度反转后 调转位置
      append(deepReverse(tail(list)), deepReverse(head(list)))
    : // 首节点反转后 和 null调转位置
      pair(deepReverse(head(list)), null);
}

// 要求来说应该是有能力处理list 而非node的func 后续可能还有优化（树的map处理）
export function map<T>(ls: List<T>, func: Func) {
  return isNull(ls) ? null : pair(func(head(ls)), map(tail(ls), func));
}

// 2.23
export function forEach<T>(ls: List<T>, func: Func) {
  return isNull(ls) ? null : pair(func(head(ls)), forEach(tail(ls), func));
}

// 树的叶子节点计算
export function countLeaves<T>(tr: List<T>) {
  if (isNull(tr)) return 0;
  if (!isPair(tr)) return 1;

  return countLeaves(head(tr)) + countLeaves(tail(tr));
}

export function mapTree<T>(tr: List<T>, func: Func) {
  if (isNull(tr)) return null;
  if (!isPair(tr)) return func(tr);

  return pair(mapTree(head(tr), func), mapTree(tail(tr), func));
}

// 2.28 把所有叶子节点拉到同级
export function fringe<T>(tree: List<T>) {
  if (isNull(tree)) return null;
  if (isPair(tree)) {
    return append(fringe(head(tree)), fringe(tail(tree)));
  }

  // 叶子节点
  return list(tree);
}

// 2.32  全部子集 包含null
function subsets<T>(l: List<T>) {
  if (isNull(l)) {
    return list(null);
  } else {
    const rest = subsets(tail(l));
    return append(
      rest,
      map(rest, (subset: List<T>) => {
        return pair(head(subset), subset);
      })
    );
  }
}

// 根据断言predicate过滤ls
export function filter<T>(ls: List<T>, predicate: (arg: any) => boolean) {
  if (isNull(ls)) return ls;

  if (predicate(head(ls))) {
    return pair(head(ls), filter(tail(ls), predicate));
  } else {
    return filter(tail(ls), predicate);
  }
}

// 累积函数 输入的函数为二元运算 需要注意的
export function accumulate<T>(
  ls: List<T>,
  initial: any,
  op: (a: any, b: any) => any
) {
  if (isNull(ls)) return initial;

  return op(head(ls), accumulate(tail(ls), initial, op));
}

export function accumulate_n<T>(seqs: List<T>, init: any, op: Func) {
  return isNull(head(seqs))
    ? null
    : pair(
        accumulate(
          map(seqs, (x) => head(x)),
          init,
          op
        ),
        accumulate_n(
          map(seqs, (x) => tail(x)),
          init,
          op
        )
      );
}

// 左结合的accumulate
export function fold_left<T>(op: Func, initial: any, sequence: List<T>) {
  function iter(result: any, rest: List<T>) {
    return isNull(rest)
      ? result
      : //  这是个迭代 每一次先结合在去到下一级
        // op的输入方向和accumulate相反
        iter(op(result, head(rest)), tail(rest));
  }
  return iter(initial, sequence);
}

// 生成序列 [low,high]
function enumerate_interval<T>(low: number, high: number) {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high));
}

// 作用后打平 输出一个List
function flatmap<T>(f: Func, seq: List<T>): List<T> {
  return accumulate(map(seq, f), null, append);
}

// 生成1<=j<i<=n的序列
export function unique_pairs(n: number) {
  return flatmap(
    (i) => map(enumerate_interval(1, i - 1), (j) => list(i, j)),
    enumerate_interval(1, n)
  );
}

export function unique_pairs_3(n: number) {
  return flatmap(
    (p) => {
      const i: number = head(p);
      const j: number = head(tail(p));

      return map(enumerate_interval(1, j - 1), (k) => list(i, j, k));
    },
    flatmap(
      (i) => map(enumerate_interval(1, i - 1), (j) => list(i, j)),
      enumerate_interval(1, n)
    )
  );
}
export function unique_triples(n: number) {
  return flatmap(
    (i: number) =>
      flatmap(
        (j: number) =>
          map(enumerate_interval(1, j - 1), (k: number) => list(i, j, k)),
        enumerate_interval(1, i - 1)
      ),
    enumerate_interval(1, n)
  );
}

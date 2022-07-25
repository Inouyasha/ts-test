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
export type Pair = [any, any];
export type List = [Pair, Pair];
export type Func = (...args: any) => any;

export function pair(a: any, b: any): Pair {
  return [a, b];
}

export function head(p: Pair) {
  return p[0];
}
export function tail(p: Pair) {
  return p[1];
}
export function isPair(val: Pair | any) {
  return Array.isArray(val) && val.length === 2;
}

export function print(ls: List) {
  const retString = (list: List) => {
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
    } else {
      return `(${print(head(list))},${print(tail(list))})`;
    }
  };

  return console.log(retString(ls));
}

// 从最后一个开始结合
export function list(...args: Array<any>) {
  // 这里null可以理解为一个空的list
  return args.reverse().reduce((acc, curr) => {
    return pair(curr, acc);
  }, null);
}

// 获取第n个位置的内容
export function listRef(ls: List, n: number) {
  return n === 0 ? head(ls) : listRef(tail(ls), n - 1);
}
// 判断是否为空节点
export function isNull(node: any) {
  if (node === null) {
    return true;
  }
}
// 如果序列尾部不是null该如何实现？
export function length(ls: List) {
  return isNull(ls) ? 0 : 1 + length(tail(ls));
}
// 迭代版本
export function lengthIter(ls: List, len: number = 0) {
  return isNull(ls) ? len : lengthIter(tail(ls), len + 1);
}
// 要求来说应该是有能力处理list 而非node的func 后续可能还有优化（树的map处理）
export function map(ls: List, func: Func) {
  return isNull(list) ? null : pair(func(head(ls)), map(tail(ls), func));
}

// 树的叶子节点计算
export function countLeaves(tr: List) {
  if (isNull(tr)) return 0;
  if (!isPair(tr)) return 1;

  return countLeaves(head(tr)) + countLeaves(tail(tr));
}

export function mapTree(tr: List, func: Func) {
  if (isNull(tr)) return null;
  if (!isPair(tr)) return func(tr);

  return pair(mapTree(head(tr), func), mapTree(tail(tr), func));
}

// 根据断言predicate过滤ls
export function filter(ls: List, predicate: (arg: any) => boolean) {
  if (isNull(ls)) return ls;

  if (predicate(head(ls))) {
    return pair(head(ls), filter(tail(ls), predicate));
  } else {
    return filter(tail(ls), predicate);
  }
}

// 累积函数 输入的函数为二元运算
export function accumulate(
  ls: List,
  initial: any,
  op: (a: any, b: any) => any
) {
  if (isNull(ls)) return initial;

  return op(head(ls), accumulate(tail(ls), initial, op));
}

import {
  append,
  filter,
  forEach,
  head,
  isNull,
  List,
  pair,
  tail,
} from "./pair";

// set是一个形如list(1,2,3,4)的List
export type set<T> = List<T>;

/**
 * set中加入元素x
 *
 * @export
 * @template T
 * @param {T} x
 * @param {set<T>} set
 * @return {*}
 */
export function adjoinSet<T>(x: T, set: set<T>) {
  return isElementOfSet(x, set) ? set : pair(x as any, set);
}

/**
 * 判断集合元素的x，y是否相同
 *
 * @param {*} x
 * @param {*} y
 * @return {*}
 */
function equal(x: any, y: any) {
  return x === y;
}

/**
 * 集合set中是否存在元素x
 *
 * @export
 * @template T
 * @param {T} x
 * @param {set<T>} set
 * @return {*}
 */
export function isElementOfSet<T>(x: T, set: set<T>) {
  return isNull(set)
    ? false
    : equal(x, head(set))
    ? true
    : isElementOfSet(x, tail(set));
}

/**
 * 返回集合的交集
 *
 * @export
 * @template T
 * @param {set<T>} set1
 * @param {set<T>} set2
 * @return {*}
 */
export function intersectionSet<T>(set1: set<T>, set2: set<T>) {
  return filter(set1, (ele) => {
    return isElementOfSet(ele, set2);
  });
}

/**
 * 求并集
 *
 * @export
 * @template T
 * @param {set<T>} set1
 * @param {set<T>} set2
 * @return {*}
 */
export function unionSet<T>(set1: set<T>, set2: set<T>) {
  // 找到set1中和set2不交的部分
  const notDuplicateSet = filter(set1, (ele) => {
    return !isElementOfSet(ele, set2);
  });

  // 合并两部分
  return append(notDuplicateSet, set2);
}

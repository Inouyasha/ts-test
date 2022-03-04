import { head, isNull, isPair, list, List, tail } from "./pair";

export type sList = List<string>;

/**
 * 判断给定字符串list是否包含item，包含返回包含item的块
 *
 * @param {string} item
 * @param {sList} x
 * @return {*}
 */
export function member(item: string, x: sList) {
  return isNull(x)
    ? null
    : item === (head(x) as any)
    ? x
    : member(item, tail(x));
}


/**
 * 判断listA与listB是否相同
 *
 * @export
 * @template T
 * @param {List<T>} listA
 * @param {List<T>} listB
 * @return {*} 
 */
export function equal<T>(listA: List<T>, listB: List<T>) {
  console.log(listA, listB);
  // 防止访问空节点的情况
  if (isNull(listA) || isNull(listB)) {
    return isNull(listA) && isNull(listB);
  }

  const listAHead = head(listA);
  // 空节点对应空节点
  if (isNull(listAHead)) {
    return isNull(head(listB));
  }

  // 头节点不相同
  if (isPair(listAHead) && !equal(listAHead, head(listB))) {
    return false;
  }

  // 头节点为普通节点
  if (listAHead !== head(listB)) {
    return false;
  }

  // 判断尾节点
  return equal(tail(listA), tail(listB));
}





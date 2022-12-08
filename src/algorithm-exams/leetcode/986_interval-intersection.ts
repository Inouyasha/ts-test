/**
 * 给定两个由一些 闭区间 组成的列表，firstList 和 secondList ，其中 firstList[i] = [starti, endi] 而 secondList[j] = [startj, endj] 。每个区间列表都是成对 不相交 的，并且 已经排序 。

返回这 两个区间列表的交集 。

形式上，闭区间 [a, b]（其中 a <= b）表示实数 x 的集合，而 a <= x <= b 。

两个闭区间的 交集 是一组实数，要么为空集，要么为闭区间。例如，[1, 3] 和 [2, 4] 的交集为 [2, 3] 。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/interval-list-intersections
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {*}  {number[][]}
 */
function intervalIntersection(
  firstList: number[][],
  secondList: number[][]
): number[][] {
  // 数组的指针
  let p = 0,
    q = 0;
  const ret: number[][] = [];

  while (p < firstList.length && q < secondList.length) {
    const [pStart, pEnd] = firstList[p],
      [qStart, qEnd] = secondList[q];

    let rangeStart: number = pStart > qStart ? pStart : qStart,
      rangeEnd: number = pEnd < qEnd ? pEnd : qEnd;
    if (rangeEnd >= rangeStart) {
      ret.push([rangeStart, rangeEnd]);
    }

    if (pEnd > qEnd) {
      q++;
    } else {
      p++;
    }
  }
  return ret;
}

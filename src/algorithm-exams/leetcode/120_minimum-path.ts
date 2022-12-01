/**
 * 给定一个三角形 triangle ，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/triangle
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[][]} triangle
 * @return {*}  {number}
 */
// 使用回溯可以做 其中可以被统一计算的部分保留 向上反推
function minimumTotal(triangle: number[][]): number {
  // 从最后一行开始
  let index = triangle.length - 1;
  let dp = triangle[index];
  while (index > 0) {
    const prev = index - 1;
    const prevRow = triangle[prev];

    const newDp: number[] = [];
    for (let i = 0; i < prevRow.length; i++) {
      // 选择下面能走的一条路
      newDp.push(prevRow[i] + Math.min(dp[i], dp[i + 1]));
    }
    dp = newDp;
    index--;
  }
  return Math.max(...dp);
}

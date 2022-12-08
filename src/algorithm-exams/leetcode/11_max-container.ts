/**
 *给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

说明：你不能倾斜容器。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/container-with-most-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} height
 * @return {*}  {number}
 */
function maxArea(height: number[]): number {
  let p = 0,
    q = height.length - 1;
  let max = 0;
  while (p < q) {
    const pVal = height[p],
      qVal = height[q];

    const area = Math.min(pVal, qVal) * (q - p);
    if (area > max) {
      max = area;
    }

    // 核心 如果左边值小 应该向里找 如果右边向里 高度不超过pVal 但是宽度小 必不是最大面积
    if (pVal < qVal) {
      p++;
    } else {
      q--;
    }
  }
  return max;
}
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));

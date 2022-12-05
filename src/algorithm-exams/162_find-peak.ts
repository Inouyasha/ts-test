/**
 *峰值元素是指其值严格大于左右相邻值的元素。

给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。

你可以假设 nums[-1] = nums[n] = -∞ 。

数组没有重复元素

你必须实现时间复杂度为 O(log n) 的算法来解决此问题。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/find-peak-element
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} nums
 * @return {*}  {number}
 */
function findPeakElement(nums: number[]): number {
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    nums[m] < nums[m + 1] ? (l = m + 1) : (r = m);
  }
  return l;
}


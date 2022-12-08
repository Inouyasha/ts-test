/**
 *给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/minimum-size-subarray-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number} target
 * @param {number[]} nums
 * @return {*}  {number}
 */
function minSubArrayLen(target: number, nums: number[]): number {
  let sum = 0;
  let len = Infinity;

  let l = 0,
    r = 0;
  while (r < nums.length) {
    const v = nums[r];
    r++;
    sum += v;

    while (sum >= target) {
      len = Math.min(len, r - l);

      // 左窗口右移
      const lv = nums[l];
      l++;
      sum -= lv;
    }
  }
  return len === Infinity ? 0 : len;
}

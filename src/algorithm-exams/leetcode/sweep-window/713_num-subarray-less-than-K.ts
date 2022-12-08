/**
 * 给你一个整数数组 nums 和一个整数 k ，请你返回子数组内所有元素的乘积严格小于 k 的连续子数组的数目。
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {*}  {number}
 */
function numSubarrayProductLessThanK(nums: number[], k: number): number {
  let curr = 1;
  let count = 0;

  let l = 0,
    r = 0;
  while (r < nums.length) {
    const v = nums[r];
    r++;

    curr *= v;
    while (l < r && curr >= k) {
      const lv = nums[l];
      l++;
      curr /= lv;
    }

    // 增加数量
    // 这一点很重要 实际上是找窗口中以r位置结尾的满足条件的序列
    count += r - l;
  }
  return count;
}
console.log(numSubarrayProductLessThanK([1, 1, 1], 1));

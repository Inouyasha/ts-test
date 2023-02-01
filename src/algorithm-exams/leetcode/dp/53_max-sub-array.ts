/**
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组 是数组中的一个连续部分。
dp[i] 以第i项结尾的数组和最大值
 *
 * @param {number[]} nums
 * @return {*}  {number}
 */
function maxSubArray(nums: number[]): number {
  const len = nums.length;
  const dp = Array.from({ length: len }, () => -1);
  // 至少有一项 且包含该项
  dp[0] = nums[0];
  let max = dp[0];

  for (let i = 1; i < len; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    max = Math.max(dp[i], max);
  }
  return max;
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

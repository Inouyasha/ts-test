/**
 *给你一个整数数组 nums ，你可以对它进行一些操作。

每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除 所有 等于 nums[i] - 1 和 nums[i] + 1 的元素。

开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。

dp[i]为nums最大值为i情况下的输出

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/delete-and-earn
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} nums
 * @return {*}  {number}
 */
function deleteAndEarn(nums: number[]): number {
  // 记录不同数字的数量
  const numCount: Record<number, number> = {};
  for (let num of nums) {
    if (num in numCount) {
      numCount[num]++;
    } else {
      numCount[num] = 1;
    }
  }
  // 所有数字从大到小排序
  const numsSort = Object.keys(numCount)
    .map((n) => +n)
    .sort((a, b) => a - b);
  // 离散性很强的dp 不用数组保存 key为最大值 value为对应sum
  const dp: Record<number, number> = {};
  // 最小值时应该选择所有的该值
  dp[numsSort[0]] = numCount[numsSort[0]] * numsSort[0];
  for (let i = 1; i <= numsSort.length; i++) {
    const preNum = numsSort[i - 1];
    const currNum = numsSort[i];
    // 不选择的结果numSort[i]
    const unSelectResult = dp[preNum];
    // 选择的结果 因为这时numSort[i]是最大值 考虑两种情况 前一项是否比现在项小1
    const selectResult =
      preNum === currNum - 1
        ? (i >= 2 ? dp[numsSort[i - 2]] : 0) + currNum * numCount[currNum]
        : dp[preNum] + currNum * numCount[currNum];
    dp[currNum] = Math.max(selectResult, unSelectResult);
  }
  // 返回最后一项
  return dp[numsSort[numsSort.length - 1]];
}
console.log(deleteAndEarn([2]))
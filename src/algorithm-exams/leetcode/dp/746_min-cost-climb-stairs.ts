/**
 * 给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。

你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。

请你计算并返回达到楼梯顶部的最低花费。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/min-cost-climbing-stairs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

dp[i] 定义为从i到最后一阶的花费 
dp[i]=min(dp[i+1],dp[i+2])+cost[i]
 *
 * @param {number[]} cost
 * @return {*}  {number}
 */
function minCostClimbingStairs(cost: number[]): number {
  if (cost.length === 0) {
    return cost[0];
  }

  const len = cost.length;
  const dp = Array.from({ length: len }, () => -1);
  // 最后两层的最小值应该直接取cost
  dp[len - 1] = cost[len - 1];
  dp[len - 2] = cost[len - 2];

  for (let i = len - 3; i >= 0; i--) {
    dp[i] = Math.min(dp[i + 1], dp[i + 2]) + cost[i];
  }
  return Math.min(dp[0], dp[1]);
}

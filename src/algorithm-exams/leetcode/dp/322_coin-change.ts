/**
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。

计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。

你可以认为每种硬币的数量是无限的。

 

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/coin-change
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} coins
 * @param {number} amount
 * @return {*}  {number}
 */
function coinChange(coins: number[], amount: number): number {
  // 0使用0个coin
  const dp: number[] = [0];
  // 初始化
  // 遍历
  for (let i = 1; i <= amount; i++) {
    let min = Infinity;
    for (let coin of coins) {
      const index = i - coin;
      // 不合理方案
      if (index < 0) {
        continue;
      }
      // 更新最小值
      min = Math.min(min, dp[index] + 1);
    }
    dp[i] = min;
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
console.log(coinChange([2], 0));

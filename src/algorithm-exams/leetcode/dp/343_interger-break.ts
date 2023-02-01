/**
 *给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化。

返回 你可以获得的最大乘积 。
 *
 * @param {number} n
 * @return {*}  {number}
 */
function integerBreak(n: number): number {
  const dp: number[] = [0, 1];

  for (let i = 2; i <= n; i++) {
    let max = -Infinity;
    for (let j = 1; j < i; j++) {
      const result = j * Math.max(dp[i - j], i - j);
      max = Math.max(result, max);
    }
    dp[i] = max;
  }
  return dp[n];
}
console.log(integerBreak(11));

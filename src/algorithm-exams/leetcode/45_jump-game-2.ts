/**
 * 给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。

每个元素 nums[i] 表示从索引 i 向前跳转的最大长度。换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j] 处:

0 <= j <= nums[i] 
i + j < n
返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。

 

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/jump-game-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} nums
 * @return {*}  {number}
 */
function jump2(nums: number[]): number {
  // 设置dp 判断每一位是否可以跳到终点 dp[k]=min(dp[k+1]||dp[k+2]||...||dp[k+s])+1 s为nums[k]
  const dp: number[] = Array.from({ length: nums.length });
  // 最后一位必定为真
  dp[nums.length - 1] = 0;

  for (let i = nums.length - 2; i >= 0; i--) {
    const v = nums[i];
    let steps = Infinity;
    let j = 1;

    while (i + j < nums.length && j <= v) {
      const temp = dp[i + j];
      if (steps > temp) {
        steps = temp;
      }
      j++;
    }
    dp[i] = steps + 1;
  }
  return dp[0];
}

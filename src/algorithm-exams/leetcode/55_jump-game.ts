/**
 * 给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/jump-game
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} nums
 * @return {*}  {boolean}
 */
function canJump(nums: number[]): boolean {
  // 设置dp 判断每一位是否可以跳到终点 dp[k]=dp[k+1]||dp[k+2]||...||dp[k+s] s为nums[k]
  const dp: boolean[] = Array.from({ length: nums.length });
  // 最后一位必定为真
  dp[nums.length - 1] = true;

  for (let i = nums.length - 2; i >= 0; i--) {
    const v = nums[i];
    let flag = false;
    let j = 1;

    while (i + j < nums.length && j <= v) {
      const temp = dp[i + j];
      if (temp) {
        flag = true;
        break;
      } else {
        j++;
      }
    }
    dp[i] = flag;
  }
  return dp[0];
}

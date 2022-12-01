/**
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/house-robber
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} nums
 * @return {*}  {number}
 */
function rob(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  if (nums.length === 1) {
    return nums[0];
  }
  if (nums.length === 2) {
    return Math.max(...nums);
  }

  // dp fn =max(nums[n-1]+fn-2,fn-1) 是否选择当前值
  let max = Math.max(nums[0], nums[1]);
  // 保存以当前位置为结尾的最大数值
  const dpArray = [nums[0], max];
  let index = 2;
  while (index < nums.length) {
    [dpArray[0], dpArray[1]] = [
      dpArray[1],
      Math.max(dpArray[0] + nums[index], dpArray[1]),
    ];

    if (dpArray[1] > max) {
      max = dpArray[1];
    }

    index++;
  }
  return max;
}
console.log(rob([2, 1, 1, 2]));

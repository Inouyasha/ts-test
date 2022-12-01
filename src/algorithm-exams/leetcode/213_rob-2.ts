/**
 *你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。

给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/house-robber-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} nums
 * @return {*}  {number}
 */
function rob2(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  // 少于两位直接输出数组最大值
  if (nums.length <= 2) {
    return Math.max(...nums);
  }

  // dp中两个序列 一个包含首部 一个不包含首部
  let dpWithHead = [nums[0], nums[0]]; //前两个因为选择了头部 只有第一个
  let dpWithoutHead = [0, nums[1]]; // 没有选择头部 比选第二个
  // 上面所有数的最大值
  let max = Math.max(nums[0], nums[1]);

  // 迭代 但是不会到最后以为
  for (let i = 2; i < nums.length; i++) {
    // 最后一位 只会作用于withoutHead
    if (i === nums.length - 1) {
      [dpWithoutHead[0], dpWithoutHead[1]] = [
        dpWithoutHead[1],
        Math.max(dpWithoutHead[0] + nums[i], dpWithoutHead[1]),
      ];
      [dpWithHead[0], dpWithHead[1]] = [dpWithHead[1], dpWithHead[0]];
    } else {
      [dpWithoutHead[0], dpWithoutHead[1]] = [
        dpWithoutHead[1],
        Math.max(dpWithoutHead[0] + nums[i], dpWithoutHead[1]),
      ];
      [dpWithHead[0], dpWithHead[1]] = [
        dpWithHead[1],
        Math.max(dpWithHead[0] + nums[i], dpWithHead[1]),
      ];
    }

    // 计算此轮最大值
    const currMax = Math.max(dpWithHead[1], dpWithoutHead[1]);
    if (currMax > max) {
      max = currMax;
    }
  }
  return max;
}

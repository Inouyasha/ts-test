/**
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请

你返回所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/3sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} nums
 * @return {*}  {number[][]}
 */
function threeSum(nums: number[]): number[][] {
  nums.sort((x, y) => x - y);
  // temp用于保存回溯中存在的数
  const temp: number[] = [];
  const ret: number[][] = [];

  const len = nums.length;

  const dfs = (start: number, target: number) => {
    let i = start;
    let pivot: number = null;
    while (i < len) {
      const curr = nums[i];

      // 跳过同一轮的相同数值 避免重复
      if (curr === pivot) {
        i++;
        continue;
      } else {
        pivot = curr;
      }

      // 即深度
      if (temp.length === 3 - 1) {
        if (curr === target) {
          ret.push([...temp, curr]);
        }
      } else {
        temp.push(curr);
        dfs(i + 1, target - curr);
        temp.pop();
      }
    }
  };

  dfs(0, 0);
  return ret;
}
threeSum([-1, 0, 1, 2, -1, -4]);

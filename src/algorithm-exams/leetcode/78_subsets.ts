/**
 *给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 *
 * @param {number[]} nums
 * @return {*}  {number[][]}
 */
function subsets(nums: number[]): number[][] {
  const ret: number[][] = [];

  const subsetsRecursion = (arr: number[], depth: number): void => {
    if (depth === nums.length) {
      ret.push(arr);
      return;
    }

    subsetsRecursion([...arr, nums[depth]], depth + 1);
    subsetsRecursion([...arr], depth + 1);
  };
  subsetsRecursion([], 0);
  return ret;
}

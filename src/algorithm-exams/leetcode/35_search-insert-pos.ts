/**
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 O(log n) 的算法。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/search-insert-position
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {*}  {number}
 */
function searchInsert(nums: number[], target: number): number {
  const versionRecursion = (start: number, end: number): number => {
    const mid = Math.floor((start + end) / 2);
    const curr = nums[mid];

    if (curr === target) {
      return mid;
    }
    // 插入值在mid前
    if (curr > target) {
      // 没有找到 但是最后一个数 根据位置判断
      if (start === end) {
        return mid;
      }

      // 要保证start<=end 否则序列有问题
      return versionRecursion(start, mid - 1 < start ? start : mid - 1);
    }
    // 插入值在mid后
    if (curr < target) {
      if (start === end) {
        return mid + 1;
      }

      return versionRecursion(mid + 1 > end ? end : mid + 1, end);
    }
  };
  return versionRecursion(0, nums.length - 1);
}

console.log(searchInsert([1, 3], 4));

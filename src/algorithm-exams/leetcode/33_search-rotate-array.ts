/**
 *整数数组 nums 按升序排列，数组中的值 互不相同 。

在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/search-in-rotated-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {*}  {number}
 */
function searchRotateArray(nums: number[], target: number): number {
  // 二分查询 只查询升序序列
  const searchRecursion = (start: number, end: number): number => {
    if (start > end) {
      return -1;
    }

    const mid = Math.floor((start + end) / 2);
    const curr = nums[mid];

    if (target === curr) {
      return mid;
    } else if (target > curr) {
      return searchRecursion(mid + 1, end);
    } else {
      return searchRecursion(start, mid - 1);
    }
  };

  const searchRecursion2 = (start: number, end: number): number => {
    if (start > end) {
      return -1;
    }

    const startValue = nums[start];
    const endValue = nums[end];
    // 如果是递增序列则使用二分排序
    if (endValue >= startValue) {
      return searchRecursion(start, end);
    }

    const mid = Math.floor((start + end) / 2);
    const curr = nums[mid];
    if (curr === target) {
      return mid;
    }

    const pos1 = searchRecursion2(start, mid - 1);
    const pos2 = searchRecursion2(mid + 1, end);
    // pos1序列没找到去pos2中查询
    return pos1 === -1 ? pos2 : pos1;
  };

  return searchRecursion2(0, nums.length - 1);
}

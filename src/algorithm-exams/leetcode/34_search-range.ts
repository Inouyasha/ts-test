/**
 *给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {*}  {number[]}
 */
function searchRange(nums: number[], target: number): number[] {
  if (nums.length === 0) {
    return [-1, -1];
  }

  // 缩小范围
  const searchRecursion = (
    start: number,
    end: number
  ): {
    start: number;
    end: number;
    target: number;
  } => {
    if (start > end) {
      // 没找到
      return {
        start,
        end,
        target: -1,
      };
    }

    const mid = Math.floor((start + end) / 2);
    const curr = nums[mid];

    if (curr === target) {
      return {
        start,
        end,
        target: mid,
      };
    } else if (curr > target) {
      return searchRecursion(start, mid - 1);
    } else {
      return searchRecursion(mid + 1, end);
    }
  };

  // 新的range中 [start,target][target,end]存在我们要输出的range
  const newRange = searchRecursion(0, nums.length - 1);
  // 不存在对应值
  if (newRange.target === -1) {
    return [-1, -1];
  }

  // 左边界
  let leftBorder: number;
  let leftRange = {
    ...newRange,
  };
  let rightBorder: number;
  let rightRange = {
    ...newRange,
  };

  while (true) {
    // 找到之前target位置的前一位作为末尾
    const tempRange = searchRecursion(leftRange.start, leftRange.target - 1);
    // 新的range中没有找到target 说明前面的range最后一位是target头部
    if (tempRange.target === -1) {
      leftBorder = leftRange.target;
      break;
    }
    leftRange = { ...tempRange };
  }

  while (true) {
    // 找到之前target位置的前一位作为末尾
    const tempRange = searchRecursion(rightRange.target + 1, rightRange.end);
    // 新的range中没有找到target 说明前面的range第一是target尾
    if (tempRange.target === -1) {
      rightBorder = rightRange.target;
      break;
    }
    rightRange = { ...tempRange };
  }

  return [leftBorder, rightBorder];
}

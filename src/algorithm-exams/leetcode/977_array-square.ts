/**
 * 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。
 * 重点是对于负数的处理
 *
 * @param {number[]} nums
 * @return {*}  {number[]}
 */
function sortedSquares(nums: number[]): number[] {
  let start = 0,
    end = nums.length - 1;
  // 数组为非递增排序
  const ret: number[] = [];

  while (start <= end) {
    const a = nums[start];
    const b = nums[end];

    // 绝对值大的放入数组
    if (Math.abs(a) > Math.abs(b)) {
      ret.push(a * a);
      start++;
    } else {
      ret.push(b * b);
      end--;
    }
  }
  return ret.reverse();
}

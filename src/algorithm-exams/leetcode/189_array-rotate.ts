/**
 * 给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
 *
 * @param {number[]} nums
 * @param {number} k
 */
function arrayRotate(nums: number[], k: number): void {
  const len = nums.length;
  const newArr: number[] = Array.from({ length: nums.length });

  nums.forEach((num, index) => {
    const newIndex = (index + k) % len;
    newArr[newIndex] = num;
  });
  newArr.forEach((num, index) => {
    nums[index] = num;
  });
}

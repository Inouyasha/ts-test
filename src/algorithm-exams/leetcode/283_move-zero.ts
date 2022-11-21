/**
 Do not return anything, modify nums in-place instead.
 /**
  * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。
  *
  * @param {number[]} nums
  */
function moveZeroes(nums: number[]): void {
  // 冒泡 但是只对0冒泡
  // 冒泡边界
  let start = 0,
    end = nums.length - 1;

  // start=end此时也不用移动了
  while (start < end) {
    // 不是0跳过
    if (nums[start] !== 0) {
      start++;
      continue;
    }

    // 是0开始向尾部走 以end为边界
    for (let j = start; j < end; j++) {
      // 交换
      [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
    }
    end--;

    // 是0但是要防止将下一位0挪到此位置 跳过条件
    if (nums[start] !== 0) {
      start++;
    }
  }
  console.log(nums);
}
moveZeroes([0, 1, 0, 3, 12]);

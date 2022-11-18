// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
function search(nums: number[], target: number): number {
  const searchRecursion = (start: number, end: number): number => {
    // 判断特殊情况
    if (start > end) {
      return -1;
    }

    const mid = Math.floor((start + end) / 2);
    const curr = nums[mid];

    if (curr === target) {
      return mid;
    }
    if (curr < target) {
      return searchRecursion(mid + 1, end);
    }
    if (curr > target) {
      return searchRecursion(start, mid - 1);
    }
  };
  return searchRecursion(0, nums.length - 1);
}
console.log(search([-1, 0, 3, 5, 9, 12], 9));

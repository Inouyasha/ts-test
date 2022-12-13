/**
 *给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 *
 * @param {number[]} nums
 * @return {*}  {number[][]}
 */
function permuteUnique(nums: number[]): number[][] {
  // nums.sort((x, y) => x - y);
  const ret: number[][] = [];
  if (nums.length === 0) {
    return ret;
  }

  const permuteRecursion = (index: number) => {
    if (index === nums.length - 1) {
      ret.push([...nums]);
    }

    for (let i = index; i !== nums.length; i++) {
      // 跳过重复的序列 只和第一次出现的数值进行交换
      if (i !== index && nums.indexOf(nums[i], index) !== i) {
        continue;
      }

      // 交换
      [nums[index], nums[i]] = [nums[i], nums[index]];
      // 向下走
      permuteRecursion(index + 1);
      // 换回来
      [nums[index], nums[i]] = [nums[i], nums[index]];
    }
  };
  permuteRecursion(0);
  return ret;
}

/**
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 *
 * @param {number[]} nums
 * @return {*}  {number[][]}
 */
// 递归解法
// function permute(nums: number[]): number[][] {
//   const ret: number[][] = [];

//   /**
//    * target为前缀 base为未处理的后缀
//    *
//    * @param {number[]} target
//    * @param {number[]} base
//    * @return {*}
//    */
//   const permuteRecursion = (target: number[], base: number[]) => {
//     if (base.length === 0) {
//       ret.push(target);
//       return;
//     }

//     for (let i = 0; i !== base.length; i++) {
//       // 交换
//       [base[0], base[i]] = [base[i], base[0]];
//       // 传入的都是新数组
//       permuteRecursion([...target, base[0]], base.slice(1));
//       // 交换结束后 换回来
//       [base[0], base[i]] = [base[i], base[0]];
//     }
//   };

//   permuteRecursion([], nums);
//   return ret;
// }
// 回溯法
function permute(nums: number[]): number[][] {
  const ret: number[][] = [];

  // 访问状态
  const isVisited = Array.from({ length: nums.length }, () => false);

  const dfs = (path: number[]) => {
    if (path.length === nums.length) {
      ret.push([...path]);
    }

    for (let i = 0; i !== nums.length; i++) {
      if (isVisited[i]) {
        continue;
      }

      path.push(nums[i]);
      isVisited[i] = true;
      dfs(path);
      path.pop();
      isVisited[i] = false;
    }
  };
  dfs([]);
  return ret;
}

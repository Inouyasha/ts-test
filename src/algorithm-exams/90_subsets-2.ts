/**
 * 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/subsets-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} nums
 * @return {*}  {number[][]}
 */
function subsetsWithDup(nums: number[]): number[][] {
  const ret: number[][] = [];

  const hash: Record<string, number> = {};
  for (const num of nums) {
    if (num in hash) {
      hash[num]++;
    } else {
      hash[num] = 1;
    }
  }
  const numKeys: string[] = Object.keys(hash);

  const subsetRecursion = (arr: number[], depth: number) => {
    if (depth === numKeys.length) {
      ret.push(arr);
    }

    // 当前字符 数量
    const currNum = +numKeys[depth];
    const count = hash[currNum];

    let temp: number[] = [];
    for (let i = 0; i <= count; i++) {
      subsetRecursion([...arr, ...temp], depth + 1);
      temp.push(currNum);
    }
  };
  subsetRecursion([], 0);
  return ret;
}

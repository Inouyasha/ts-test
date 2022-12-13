/**
 *给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

对于给定的输入，保证和为 target 的不同组合数少于 150 个。

 

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/combination-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} candidates
 * @param {number} target
 * @return {*}  {number[][]}
 */
function combinationSum(candidates: number[], target: number): number[][] {
  // 由大到小排序
  candidates.sort((x, y) => y - x);

  const ret: number[][] = [];
  const combinationRecursion = (
    path: number[],
    index: number,
    target: number
  ): void => {
    // 找到结果
    if (target === 0) {
      ret.push([...path]);
      return;
    }
    // 找到尽头
    if (index === candidates.length) {
      return;
    }

    // 先向下找

    const tempPath: number[] = [];
    const curr = candidates[index];
    let tempTarget = target;

    while (tempTarget >= 0) {
      combinationRecursion([...path, ...tempPath], index + 1, tempTarget);
      tempTarget -= curr;
      tempPath.push(curr);
    }
  };
  combinationRecursion([], 0, target);
  return ret;
}
combinationSum([2, 3, 7], 7);

/**
 *给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用 一次 。

注意：解集不能包含重复的组合。 

 

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/combination-sum-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} candidates
 * @param {number} target
 * @return {*}  {number[][]}
 */
function combinationSum2(candidates: number[], target: number): number[][] {
  const record: Record<string, number> = {};
  for (const candidate of candidates) {
    if (candidate in record) {
      record[candidate]++;
    } else {
      record[candidate] = 1;
    }
  }

  const noDuplicateCandidates = Object.keys(record);
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
    if (index === noDuplicateCandidates.length) {
      return;
    }

    // 先向下找
    const tempPath: number[] = [];
    const curr = +noDuplicateCandidates[index];
    let tempTarget = target;

    while (tempTarget >= 0 && tempPath.length <= record[curr]) {
      combinationRecursion([...path, ...tempPath], index + 1, tempTarget);
      tempTarget -= curr;
      tempPath.push(curr);
    }
  };
  combinationRecursion([], 0, target);
  return ret;
}
combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);

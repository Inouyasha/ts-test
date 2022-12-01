/**
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。字符集不重复。

你可以按 任何顺序 返回答案。
 *
 * @param {number} n
 * @param {number} k
 * @return {*}  {number[][]}
 */
function combine(n: number, k: number): number[][] {
  // 生成1-n的数组
  let baseNums = Array.from({ length: n }).map((_, index) => {
    return index + 1;
  });
  // 总位数不超过n
  if (n < k) {
    throw new Error("wrong arguments");
  }

  // C(n,k)=C(n-1,k)+C(n-1,k-1)
  const combinationRecursion = (base: number[], k: number): number[][] => {
    // C(n,1) 返回所有的单个字符
    if (k === 1) {
      return base.map((n) => [n]);
    }
    // C(k,k) 返回所有分布
    if (base.length === k) {
      return [[...base]];
    }

    // 递归C(n-1,k)
    // 组合C(n-1,k-1) 选择了第一项
    const ret1 = combinationRecursion(base.slice(1), k - 1).map((item) => {
      return [base[0], ...item];
    });
    // 组合C(n-1,k) 没选择第一项
    const ret2 = combinationRecursion(base.slice(1), k);
    return [...ret1, ...ret2];
  };
  return combinationRecursion(baseNums, k);
}

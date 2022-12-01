/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 *
 * @param {number} n
 * @return {*}  {number}
 */
function climbStairs(n: number): number {
  // 初始值 0,1
  let pre = 1,
    next = 1;
  let round = 1;
  while (round < n) {
    // fn+1=fn+fn-1
    [pre, next] = [next, pre + next];
    round++;
  }
  return next;
}

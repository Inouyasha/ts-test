/**
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/unique-paths
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number} m
 * @param {number} n
 * @return {*}  {number}
 */
function uniquePaths(m: number, n: number): number {
  // 初始化所有的路径数 其实一行就够了（类似背包） 但是懒得改了
  const dp: number[][] = Array.from({ length: m }, () => {
    return Array.from({ length: n }, () => -1);
  });

  // 计算dp
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      // 右下角开始 只有一条
      if (i === m - 1 && j === n - 1) {
        dp[i][j] = 1;
        continue;
      }

      // 右侧路径和下方路径
      const right = j === n - 1 ? 0 : dp[i][j + 1];
      const bottom = i === m - 1 ? 0 : dp[i + 1][j];

      dp[i][j] = right + bottom;
    }
  }
  return dp[0][0];
}

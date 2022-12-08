/**
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/number-of-islands
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {string[][]} grid
 * @return {*}  {number}
 */
function numIslands(grid: string[][]): number {
  const isVisited = Array.from({ length: grid.length }, () => {
    return Array.from({ length: grid[0].length }, () => false);
  });

  // 标记所有关联的island
  const findIsland = (pos: [number, number]) => {
    // 边界
    if (
      pos[0] < 0 ||
      pos[1] < 0 ||
      pos[0] >= grid.length ||
      pos[1] >= grid[0].length
    ) {
      return;
    }
    // 访问过
    if (isVisited[pos[0]][pos[1]]) {
      return;
    }
    // 标记
    isVisited[pos[0]][pos[1]] = true;
    if (grid[pos[0]][pos[1]] === "1") {
      // 上下左右扩散
      [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ].forEach(([dx, dy]) => {
        findIsland([pos[0] + dx, pos[1] + dy]);
      });
    } else {
      return;
    }
  };

  let count = 0;
  for (let i = 0; i !== grid.length; i++) {
    for (let j = 0; j !== grid[0].length; j++) {
      if (!isVisited[i][j] && grid[i][j] === "1") {
        count++;
        findIsland([i, j]);
      }
    }
  }
  return count;
}
console.log(
  numIslands([
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
  ])
);

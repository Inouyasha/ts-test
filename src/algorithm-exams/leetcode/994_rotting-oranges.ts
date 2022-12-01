/**
 * 在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：

值 0 代表空单元格；
值 1 代表新鲜橘子；
值 2 代表腐烂的橘子。
每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。

返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/rotting-oranges
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[][]} grid
 * @return {*}  {number}
 */
// BFS
function orangesRotting(grid: number[][]): number {
  let queue: [number, number][] = [];
  let time = 0;
  // 将第一轮烂橘子入队列
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 2) {
        [
          [-1, 0],
          [1, 0],
          [0, 1],
          [0, -1],
        ].forEach(([dx, dy]) => {
          const nx = dx + i,
            ny = dy + j;

          // 越界
          if (nx < 0 || ny < 0 || nx >= grid.length || ny >= grid[0].length) {
            return;
          }

          // 只传输新橘子
          if (grid[nx][ny] !== 1) {
            return;
          }

          queue.push([nx, ny]);
        });
      }
    });
  });

  // 逐级传递
  while (queue.length > 0) {
    time++;
    const newQueue: [number, number][] = [];

    queue.forEach(([i, j]) => {
      // 当前橘子腐坏
      grid[i][j] = 2;
    });

    // 扩散
    queue.forEach(([i, j]) => {
      [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ].forEach(([dx, dy]) => {
        const nx = dx + i,
          ny = dy + j;

        // 越界
        if (nx < 0 || ny < 0 || nx >= grid.length || ny >= grid[0].length) {
          return;
        }

        // 只传输新橘子
        if (grid[nx][ny] !== 1) {
          return;
        }

        newQueue.push([nx, ny]);
      });
    });

    queue = newQueue;
  }

  // 考察橘子有没有全部感染 存在正常橘子没感染 返回-1
  if (grid.some((row) => row.some((cell) => cell === 1))) {
    return -1;
  } else {
    return time;
  }
}
console.log(
  orangesRotting([
    [2, 0, 2],
  ])
);

/**
 * 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
 *
 * @param {string[][]} board
 */
function solve(board: string[][]): void {
  if (board.length === 0) {
    return;
  }

  const dfs = (x: number, y: number) => {
    // 超出边界
    if (x < 0 || y < 0 || x >= board.length || y >= board[0].length) {
      return;
    }
    // 感染对象不对 或者已经被感染
    if (board[x][y] !== "O") {
      return;
    }

    // 感染
    board[x][y] = "Y";
    // 扩散
    for (const [dx, dy] of [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ]) {
      const nx = x + dx,
        ny = y + dy;
      dfs(nx, ny);
    }
  };

  // 探索边界的Y能够延伸的位置
  for (let i = 0; i !== board.length; i++) {
    for (let j = 0; j !== board[0].length; j++) {
      if (
        (i === 0 ||
          j === 0 ||
          i === board.length - 1 ||
          j === board[0].length - 1) &&
        board[i][j] === "O"
      ) {
        dfs(i, j);
      }
    }
  }

  // 按条件修改
  for (let i = 0; i !== board.length; i++) {
    for (let j = 0; j !== board[0].length; j++) {
      if (board[i][j] === "Y") {
        board[i][j] = "O";
      } else if (board[i][j] === "O") {
        board[i][j] = "X";
      }
    }
  }
}

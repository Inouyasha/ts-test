/**
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/word-search
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {string[][]} board
 * @param {string} word
 * @return {*}  {boolean}
 */
function exist(board: string[][], word: string): boolean {
  if (word.length === 0) {
    return true;
  }

  const isVisited = Array.from({ length: board.length }, () => {
    return Array.from({ length: board[0].length }, () => false);
  });

  /**
   * 判断是否包含单词
   *
   * @param {[number,number]} coord
   * @param {number} index
   */
  const search = (coord: [number, number], index: number): boolean => {
    const c = board[coord[0]][coord[1]];

    if (c !== word[index]) {
      return false;
    }
    // 检查到最后一个字符 而且通过了检查
    if (index === word.length - 1) {
      return true;
    }

    isVisited[coord[0]][coord[1]] = true;
    // 判断下一个字符
    const flag = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ].some(([dx, dy]) => {
      const nx = coord[0] + dx,
        ny = coord[1] + dy;

      if (
        nx < 0 ||
        ny < 0 ||
        nx >= board.length ||
        ny >= board[0].length ||
        isVisited[nx][ny]
      ) {
        return false;
      }

      return search([nx, ny], index + 1);
    });
    isVisited[coord[0]][coord[1]] = false;
    return flag;
  };

  for (let i = 0; i !== board.length; i++) {
    for (let j = 0; j !== board[0].length; j++) {
      const char = board[i][j];
      if (char !== word[0]) {
        continue;
      }
      if (search([i, j], 0)) {
        return true;
      }
    }
  }
  return false;
}

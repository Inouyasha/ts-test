// 一个给定的矩形 要求用1x2的矩形铺满 但是不能让四个矩形有公共点
// 使用回溯遍历
function tatamiCount(width: number, height: number) {
  // 创建一个width+2 * height+2的空间 用0填满
  const space: number[][] = Array.from(
    {
      length: height + 2,
    },
    () => Array.from({ length: width + 2 }, () => 0)
  );
  space.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (
        rowIndex === 0 ||
        colIndex === 0 ||
        rowIndex === height + 1 ||
        colIndex === width + 1
      ) {
        space[rowIndex][colIndex] = -1;
      }
    });
  });

  // 输出结果
  const printResult = () => {
    console.table(space);
  };

  // 递归运算 回溯所有情况
  /**
   * id标识当前tatami块状态号
   *
   * @param {number} rowIndex
   * @param {number} colIndex
   * @param {number} id
   */
  const tatamiDistribution = (
    rowIndex: number,
    colIndex: number,
    id: number
  ) => {
    // 所有块遍历结束
    if (rowIndex > height) {
      printResult();
      return;
    }

    // 当前行结束 到下一行开始
    if (colIndex > width) {
      tatamiDistribution(rowIndex + 1, 1, id);
      return;
    }

    // 当前节点已经有值 跳到本行下一个节点
    if (space[rowIndex][colIndex] > 0) {
      tatamiDistribution(rowIndex, colIndex + 1, id);
      return;
    } 

    // 判断是否可以插入
    // 满足两种斜插
    if (
      space[rowIndex - 1][colIndex - 1] === space[rowIndex - 1][colIndex] ||
      space[rowIndex - 1][colIndex - 1] === space[rowIndex][colIndex - 1]
    ) {
      // 判断横插
      if (space[rowIndex][colIndex + 1] === 0) {
        // 横插
        space[rowIndex][colIndex] = space[rowIndex][colIndex + 1] = id;
        tatamiDistribution(rowIndex, colIndex + 2, id + 1);
        // 回溯
        space[rowIndex][colIndex] = space[rowIndex][colIndex + 1] = 0;
      }
      // 判断竖插
      if (space[rowIndex + 1][colIndex] === 0) {
        // 横插
        space[rowIndex][colIndex] = space[rowIndex + 1][colIndex] = id;
        tatamiDistribution(rowIndex, colIndex + 1, id + 1);
        // 回溯
        space[rowIndex][colIndex] = space[rowIndex + 1][colIndex] = 0;
      }
    }
  };
  tatamiDistribution(1, 1, 1);
}

tatamiCount(7, 4);

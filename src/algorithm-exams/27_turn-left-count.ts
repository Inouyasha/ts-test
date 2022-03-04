import { Coordinate } from "./26_cube_park";

export type DirNumType = -1 | 0 | 1;
export type DirType = [DirNumType, DirNumType];

/**
 * 输入前一个方向 输出下一个可能的方向
 *
 * @param {DirType} prevDir
 */
function getNextDir(prevDir: DirType): DirType[] {
  // 方向的映射 比如向右走后 下一步只能继续向右或者向上
  const dirMap = {
    "1,0": [
      [1, 0],
      [0, -1],
    ],
    "-1,0": [
      [-1, 0],
      [0, 1],
    ],
    "0,1": [
      [0, 1],
      [1, 0],
    ],
    "0,-1": [
      [0, -1],
      [-1, 0],
    ],
  };
  return dirMap[prevDir.join(",")];
}

// m x n格子 左下到右上的不同方案数 只能左转
function leftTurnCount(m: number, n: number) {
  // 建立m x n的二维数组 记录所有节点的已有方向
  const nodeStatus = Array.from({ length: m + 1 }).map((arr) => {
    return Array.from({ length: n + 1 }).map((item) => [] as DirType[]);
  });

  // 起点和终点
  const source: Coordinate = [0, m];
  const target: Coordinate = [n, 0];
  // 路线计数
  let count = 0;

  // 当前坐标点 当前方向 DFS
  const traverseRecursion = (
    coord: Coordinate,
    directions: DirType[],
    dirArr: [number, number][]
  ) => {
    const [ox, oy] = coord;

    directions.forEach((dir) => {
      const [dx, dy] = dir;
      const nx = ox + dx;
      const ny = oy + dy;

      // 判断是否继续 新点超出范围
      if (nx < 0 || ny < 0 || nx >= n + 1 || ny >= m + 1) {
        return;
      }

      // 到达终点
      if (nx === target[0] && ny === target[1]) {
        count++;
        // console.log([...dirArr, [ox, oy], [target[0], target[1]]]);
        return;
      }

      // 新的点存在相同的方向被访问过 表明按照此方向走下去会路线重复
      // 关于数组到图形的坐标映射应该特别注意
      // 原始点不能有相同路径 新点不能有相反路径
      if (
        nodeStatus[oy][ox].some(
          (dirItem) => dirItem[0] === dx && dirItem[1] === dy
        ) ||
        nodeStatus[ny][nx].some(
          (dirItem) => dirItem[0] === -dx && dirItem[1] === -dy
        )
      ) {
        return;
      }

      // 向下递归
      nodeStatus[oy][ox].push([...dir]);
      const nextDir = getNextDir(dir);
      traverseRecursion([nx, ny], nextDir, [...dirArr, [ox, oy]]);

      // 还原现场 删除最后一项
      nodeStatus[oy][ox].pop();
    });
  };
  traverseRecursion(
    source,
    [
      [1, 0],
      [0, 1],
    ],
    []
  );
  return count;
}
console.log(leftTurnCount(6, 4));

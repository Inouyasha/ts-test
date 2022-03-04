import { Coordinate } from "./26_cube_park";
import { DirType } from "./27_turn-left-count";

/**
 * 寻找正方形中的路径 左上到右下 再回到左上 正方形边长为len
 *
 * @param {number} len
 */
function squarePath(len: number) {
  // 记录所有点的出度方向
  const pointArr = Array.from({ length: len + 1 }).map((item) => {
    return Array.from({ length: len + 1 }).map((subItem) => {
      return [] as DirType[];
    });
  });

  // 左上，右下
  const source = [0, 0];
  const target = [len, len];

  let count = 0;
  // 所有方向
  const dirs: DirType[] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const path: Coordinate[] = [[0, 0]];

  // 深度优先遍历
  const dfs = (point: Coordinate) => {
    const [ox, oy] = point;
    // 判断是否到达终点
    if (
      point[0] === source[0] &&
      point[1] === source[1] &&
      // 起点出度大于0 标识不是第一次来到起点
      pointArr[oy][ox].length > 0 &&
      // 终点出度大于0 标识经过了终点
      pointArr[target[1]][target[0]].length > 0
    ) {
      count++;
      // console.log(path);
      return;
    }

    dirs.forEach(([dx, dy]) => {
      const nx = ox + dx;
      const ny = oy + dy;

      // 超出边界条件
      if (nx < 0 || ny < 0 || nx > len || ny > len) {
        return;
      }

      // 边重复
      if (
        pointArr[oy][ox].some(
          (dirItem) => dirItem[0] === dx && dirItem[1] === dy
        ) ||
        pointArr[ny][nx].some(
          (dirItem) => dirItem[0] === -dx && dirItem[1] === -dy
        )
      ) {
        return;
      }

      // 记录原始点的出度方向
      path.push([nx, ny]);
      pointArr[oy][ox].push([dx, dy]);
      dfs([nx, ny]);
      // 还原原始点的出度方向
      pointArr[oy][ox].pop();
      path.pop();
    });
  };
  dfs([0, 0]);
  return count;
}
console.log(squarePath(6));

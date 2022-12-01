/**
 * 给定一个由 0 和 1 组成的矩阵 mat ，请输出一个大小相同的矩阵，其中每一个格子是 mat 中对应位置元素到最近的 0 的距离。

两个相邻元素间的距离为 1 。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/01-matrix
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[][]} mat
 * @return {*}  {number[][]}
 */
// 暴力求解
// function updateMatrix(mat: number[][]): number[][] {
//   // 用来标识距离的矩阵 每个位置初始值均为Infinity
//   const dis = Array.from({ length: mat.length }, () => {
//     return Array.from({ length: mat[0].length }, () => Infinity);
//   });

//   const update = (rIndex: number, cIndex: number) => {
//     mat.forEach((row, i) => {
//       const rDistance = Math.abs(i - rIndex);
//       row.forEach((cell, j) => {
//         const cDistance = Math.abs(j - cIndex);
//         const value = rDistance + cDistance;

//         if (value < dis[i][j]) {
//           dis[i][j] = value;
//         }
//       });
//     });
//   };

//   // 逐个位置遍历
//   mat.forEach((row, rIndex) => {
//     row.forEach((cell, cIndex) => {
//       // 只是用0点更新dis数据
//       if (cell === 1) {
//         return;
//       }

//       update(rIndex, cIndex);
//     });
//   });

//   return dis;
// }

// BFS
function updateMatrix(mat: number[][]): number[][] {
  // 用来标识距离的矩阵 每个位置初始值均为Infinity
  const dis = Array.from({ length: mat.length }, () => {
    return Array.from({ length: mat[0].length }, () => Infinity);
  });

  let queue: [number, number][] = [];
  // 找出所有0点入队列
  mat.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) {
        queue.push([i, j]);
      }
    });
  });

  let distance = 0;
  while (queue.length > 0) {
    const newQueue: [number, number][] = [];

    queue.forEach(([i, j]) => {
      dis[i][j] = distance;
    });

    queue.forEach(([i, j]) => {
      [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ].forEach(([dx, dy]) => {
        // 新坐标
        const nx = i + dx,
          ny = j + dy;

        // 越界
        if (nx < 0 || ny < 0 || nx >= mat.length || ny >= mat[0].length) {
          return;
        }

        // 已经有值
        if (dis[nx][ny] !== Infinity) {
          return;
        }

        // 新队列写入值
        newQueue.push([nx, ny]);
      });
    });
    queue = newQueue;
    distance++;
  }
  return dis;
}
console.log(
  updateMatrix([
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ])
);

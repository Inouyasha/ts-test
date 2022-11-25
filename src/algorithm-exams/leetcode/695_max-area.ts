// function maxAreaOfIsland(grid: number[][]): number {
//   // 数组判断节点访问状态
//   const isVisited = Array.from({ length: grid.length }, () => {
//     return Array.from({ length: grid[0].length }, () => false);
//   });
//   // 记录最大面具
//   let maxArea = 0;
//   const dirs = [
//     [0, -1],
//     [0, 1],
//     [-1, 0],
//     [1, 0],
//   ];

//   const renderRecursion = (
//     point: [number, number],
//     area: { value: number }
//   ) => {
//     // 判断点是否越界
//     if (
//       point[0] < 0 ||
//       point[1] < 0 ||
//       point[0] >= grid.length ||
//       point[1] >= grid[0].length
//     ) {
//       return false;
//     }

//     // 节点被访问过
//     if (isVisited[point[0]][point[1]]) {
//       return false;
//     }

//     // 当前位置面积为0 则认为总面积为0 否则为之前面积+1
//     let areaTotal!: { value: number };
//     const temp = grid[point[0]][point[1]];
//     if (temp === 0) {
//       areaTotal = { value: 0 };
//     } else {
//       area.value += temp;
//       areaTotal = area;
//       maxArea = Math.max(area.value, maxArea);
//     }

//     isVisited[point[0]][point[1]] = true;

//     // 优先进行有数据节点的遍历 否则数据会被割裂
//     const nextPoints: [number, number][] = dirs
//       .map(([dx, dy]) => {
//         return [point[0] + dx, point[1] + dy] as [number, number];
//       })
//       .filter((np) => {
//         // 判断点是否越界
//         if (
//           np[0] < 0 ||
//           np[1] < 0 ||
//           np[0] >= grid.length ||
//           np[1] >= grid[0].length
//         ) {
//           return false;
//         }
//         // 节点被访问过
//         if (isVisited[np[0]][np[1]]) {
//           return false;
//         }
//         if (area.value === 0) {
//           return true;
//         }

//         // 只查看面积不为0的点
//         return grid[np[0]][np[1]] !== 0;
//       });

//     nextPoints.forEach((np) => {
//       renderRecursion(np, areaTotal.value === 0 ? { value: 0 } : areaTotal);
//     });
//   };

//   // 存在没有访问完的节点
//   grid.forEach((row, rowIndex) => {
//     row.forEach((p, colIndex) => {
//       renderRecursion([rowIndex, colIndex], { value: 0 });
//     });
//   });

//   return maxArea;
// }
function maxAreaOfIsland(grid: number[][]): number {
  // 数组判断节点访问状态
  const isVisited = Array.from({ length: grid.length }, () => {
    return Array.from({ length: grid[0].length }, () => false);
  });
  // 记录最大面具
  let maxArea = 0;
  const dirs = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  const getArea = (point: [number, number]) => {
    // 判断点是否越界
    if (
      point[0] < 0 ||
      point[1] < 0 ||
      point[0] >= grid.length ||
      point[1] >= grid[0].length ||
      grid[point[0]][point[1]] === 0 ||
      isVisited[point[0]][point[1]]
    ) {
      return 0;
    }

    let sum = grid[point[0]][point[1]];
    isVisited[point[0]][point[1]] = true;
    dirs.forEach(([dx, dy]) => {
      sum += getArea([point[0] + dx, point[1] + dy]);
    });
    return sum;
  };

  // 存在没有访问完的节点
  grid.forEach((row, rowIndex) => {
    row.forEach((p, colIndex) => {
      if (p === 0) {
        return;
      }
      const area = getArea([rowIndex, colIndex]);
      maxArea = Math.max(area, maxArea);
    });
  });

  return maxArea;
}
console.log(
  maxAreaOfIsland([
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ])
);

/**
 *有一幅以 m x n 的二维整数数组表示的图画 image ，其中 image[i][j] 表示该图画的像素值大小。

你也被给予三个整数 sr ,  sc 和 newColor 。你应该从像素 image[sr][sc] 开始对图像进行 上色填充 。

为了完成 上色工作 ，从初始像素开始，记录初始坐标的 上下左右四个方向上 像素值与初始坐标相同的相连像素点，接着再记录这四个方向上符合条件的像素点与他们对应 四个方向上 像素值与初始坐标相同的相连像素点，……，重复该过程。将所有有记录的像素点的颜色值改为 newColor 。

最后返回 经过上色渲染后的图像 。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/flood-fill
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {*}  {number[][]}
 */
function floodFill(
  image: number[][],
  sr: number,
  sc: number,
  color: number
): number[][] {
  // 数组判断节点访问状态
  const isVisited = Array.from({ length: image.length }, () => {
    return Array.from({ length: image[0].length }, () => false);
  });
  // 被渲染的点
  const target = image[sr][sc];
  // 向下走
  const dirs = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  const renderRecursion = (point: [number, number]) => {
    // 判断点是否越界
    if (
      point[0] < 0 ||
      point[1] < 0 ||
      point[0] >= image.length ||
      point[1] >= image[0].length
    ) {
      return;
    }

    // 节点被访问过 或 当前节点和目标不相同
    if (isVisited[point[0]][point[1]] || image[point[0]][point[1]] !== target) {
      return;
    }

    // 改变当前点
    image[point[0]][point[1]] = color;
    isVisited[point[0]][point[1]] = true;
    dirs.forEach(([dx, dy]) => {
      renderRecursion([point[0] + dx, point[1] + dy]);
    });
  };
  renderRecursion([sr, sc]);

  return image;
}
console.log(
  floodFill(
    [
      [0, 0, 0],
      [0, 0, 0],
    ],
    0,
    0,
    0
  )
);

// 33. 将棋中的飞车角行 在棋盘上能够走的数字
// 棋盘的长高
const width = 9,
  height = 9;

const getDirValue = (
  x: number,
  y: number,
  dir: { [index: number]: number },
  val?: number
) => {
  const index = y * width + x;

  const isSetVal = typeof val !== "undefined";
  if (isSetVal) {
    dir[index] = val;
    return val;
  }

  // 读取
  return index in dir ? dir[index] : -1;
};

/**
 * 当前棋子位置 挪移状态
 *
 * @param {number} x
 * @param {number} y
 * @param {number} dx
 * @param {number} dy
 * @param {{ [index: number]: number }} dir
 */
const stepsCount = (
  x: number,
  y: number,
  dx: number,
  dy: number,
  dir: { [index: number]: number }
) => {
  // 是否在正常取值范围内 不在则返回
  if (x < 0 || y < 0 || x >= width || y >= height) {
    return;
  }

  const val = getDirValue(x, y, dir);
  // 该点是棋子
  if (val === 0) {
    return;
  }
  // 占用数值为1
  getDirValue(x, y, dir, 1);
  // 到下一个位置
  stepsCount(x + dx, y + dy, dx, dy, dir);
};

let sum = 0;

const countSteps = (x0: number, y0: number, x1: number, y1: number) => {
  // 对应值为计数值
  const dir: { [index: number]: number } = {};
  getDirValue(x0, y0, dir, 0);
  getDirValue(x1, y1, dir, 0);

  // 飞车统计
  [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ].forEach(([dx, dy]) => {
    stepsCount(x0 + dx, y0 + dy, dx, dy, dir);
  });
  // 角马统计
  [
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ].forEach(([dx, dy]) => {
    stepsCount(x1 + dx, y1 + dy, dx, dy, dir);
  });

  // 计算数值
  const count = Object.values(dir).reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  return count;
};
// console.log(countSteps(2, 2, 6, 4));

// 遍历 x0,y0 标识飞车 x1,y1标识角马
for (let x0 = 0; x0 !== width; x0++) {
  for (let y0 = 0; y0 !== height; y0++) {
    for (let x1 = 0; x1 !== width; x1++) {
      for (let y1 = 0; y1 !== height; y1++) {
        // 不能出现在相同点
        if (x0 === x1 && y0 === y1) {
          continue;
        }
        const count = countSteps(x0, y0, x1, y1);
        sum += count;
      }
    }
  }
}
console.log(sum);

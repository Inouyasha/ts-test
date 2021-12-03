// 10. 轮盘的最大值

import { sum } from "ramda";

// 欧洲轮盘
const EUR_ARR = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];
// 美式轮盘
const AMR_ARR = [
  0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1, 0, 27,
  10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 35, 14, 2,
];

// 获取连续的n个数的和
function getNSum(startIndex: number, count: number, arr: readonly number[]) {
  let sum = 0;
  const arrLen = arr.length;
  for (let i = 0; i < count; i++) {
    // 找到当前的数
    const temp = arr[(startIndex + i) % arrLen];
    sum += temp;
  }
  return sum;
}
// 获取count个数的最大值
function getMax(count: number, arr: readonly number[]) {
  let max = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    const sum = getNSum(i, count, arr);
    if (sum > max) {
      max = sum;
    }
  }
  return max;
}

function solution() {
  const solutionArr: { eur: number; amr: number }[] = [];
  for (let n = 2; n <= 36; n++) {
    const eurMax = getMax(n, EUR_ARR);
    const amrMax = getMax(n, AMR_ARR);
    solutionArr.push({
      eur: eurMax,
      amr: amrMax,
    });
  }
  return solutionArr;
}
console.log(solution());

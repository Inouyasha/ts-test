// 定义有公约数的两个数为朋友关系 同时为1层联系 复杂的联系如10->9需要两层 分别为10->6->9
// 求最小的N 满足1~N选择7个合数时，存在最多6层的方法可以让两个数产生联系
// 形如：a^2->a*b->b*c->c*d->d*e->e*f->f^2 求所有组合中有最小值的排列

import { max } from "ramda";

/**
 * 获取n个素数
 *
 * @param {number} n
 */
function getPrimes(n: number) {
  if (n === 0) {
    return [];
  }
  const primes = [2];
  let i = 3;
  while (primes.length < n) {
    // 判断当前数是否为素数 不被已有的素数整除
    if (primes.every((num) => i % num !== 0)) {
      primes.push(i);
    }
    i++;
  }
  return primes;
}
/**
 * 获取最大层数为n的数字序列
 *
 * @param {number} n
 */
function getValueArr(n: number) {
  // 获取最小的n个素数做全排列
  const primes = getPrimes(n);
  let min = Infinity;
  let maxArr: number[];

  // 计算当前序列的最大取值
  const calculateMax = (numArr: number[]) => {
    let max = -Infinity;
    const retArr = numArr.map((num, index, arr) => {
      let value: number;
      if (index === 0 || index === arr.length - 1) {
        value = num * num;
      } else {
        value = num * arr[index - 1];
      }
      if (value > max) max = value;
      return value;
    });
    return {
      max,
      retArr,
    };
  };

  const permutationRecursion = (preArr: number[], restArr: number[]) => {
    if (restArr.length === 0) {
      const { max, retArr } = calculateMax(preArr);
      if (max < min) {
        min = max;
        maxArr = [...retArr];
      }
    } else {
      restArr.forEach((num, index) => {
        const newArr = [...restArr];
        // 交换位置
        [newArr[0], newArr[index]] = [newArr[index], newArr[0]];
        permutationRecursion([...preArr, newArr[0]], newArr.slice(1));
      });
    }
  };
  permutationRecursion([], [...primes]);
  return maxArr;
}

console.log(getValueArr(8));

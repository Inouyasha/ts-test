// 30个人排成一排 要求女生不能相邻 求一共有多少种可能
/**
 * 求对应的排列个数
 *
 * @param {number} n 标识人数
 * @param {(0 | 1)} gender 0标识女性 1标识男性
 */
function getPermutationCount(n: number, gender: 0 | 1) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  // 女的右边只能站女的  男的右边可以站男的或女的
  return gender === 0
    ? getPermutationCount(n - 1, 1)
    : getPermutationCount(n - 1, 0) + getPermutationCount(n - 1, 1);
}

// console.log(getPermutationCount(30, 0) + getPermutationCount(30, 1));

// 保存状态的动态规划
function getCount(n: number) {
  const maleCountArr: number[] = [0, 1];
  const femaleCountArr: number[] = [0, 1];

  if (n <= 1) {
    return maleCountArr[n] + femaleCountArr[n];
  }

  let i = 2;
  while (i <= n) {
    maleCountArr[i] = femaleCountArr[i - 1] + maleCountArr[i - 1];
    femaleCountArr[i] = maleCountArr[i - 1];
    i++;
  }
  return maleCountArr[n] + femaleCountArr[n];
}
// console.log(getCount(30));

// 其实这里只需要两个变量空间即可 再次优化
function getCountOptimize(n: number) {
  let maleCount = 1,
    femaleCount = 1;

  let i = 2;
  while (i <= n) {
    [maleCount, femaleCount] = [maleCount + femaleCount, maleCount];
    i++;
  }
  return maleCount + femaleCount;
}
console.log(getCountOptimize(30));

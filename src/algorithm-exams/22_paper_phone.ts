// 纸杯电话 求两两点相连且不重复的结对个数
function getCombinationCount(n: number) {
  // 奇数个没办法结对
  if (n % 2 === 1) {
    return 0;
  }

  const countArr = [1, 1];
  let i = 2;
  while (i <= n) {
    i += 2;

    let currCount = 0;
    // j为0点连接的位置
    for (let j = 1; j < i; j += 2) {
      // 总连接数等于两边的可能连接数的积
      currCount += countArr[(j - 1) / 2] * countArr[(i - 1 - j) / 2];
    }
    countArr.push(currCount);
  }
  return countArr[n / 2];
}
console.log(getCombinationCount(16));

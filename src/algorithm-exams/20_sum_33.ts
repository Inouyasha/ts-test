// 求魔方阵中给定和最多的组合方式 已知33有310种 不限加和的数字
const NUM_ARR = [1, 14, 14, 4, 11, 7, 6, 9, 8, 10, 10, 5, 13, 2, 3, 15];

function getMaxCombination() {
  const sortArr = NUM_ARR.sort((a, b) => a - b);

  // 空集 是0 只有一种方式（这里是因为全是正数）
  let resultDic: { [key: number]: number } = { 0: 1 };
  sortArr.forEach((num) => {
    // 第一种 不加num 此时dic无变化
    // 第二种 增加num
    // 防止要用的数据已经被改变
    const newDic = { ...resultDic };
    Object.keys(resultDic).forEach((keyStr) => {
      const keyNum = +keyStr + num;

      if (keyNum in resultDic) {
        newDic[keyNum] += resultDic[keyStr];
      } else {
        newDic[keyNum] = resultDic[keyStr];
      }
    });
    resultDic = newDic;
  });

  let max = -Infinity;
  let retNum: number;
  Object.entries(resultDic).forEach(([key, value]) => {
    if (value > max) {
      max = value;
      retNum = +key;
    }
  });
  return [retNum, max];
}
console.log(getMaxCombination());

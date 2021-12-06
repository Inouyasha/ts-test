// 1-N求一个存在相邻数和均为平方数的切法的最小的N
function canCutCake(n: number) {
  // 生成可能的平方数 用于查询
  const squareArr: number[] = [];
  for (let i = 0; i <= Math.ceil(Math.sqrt(2 * n)); i++) {
    squareArr.push(i * i);
  }

  const isVisitedArr = Array.from({ length: n + 1 }).map((i, index) =>
    index === 0 ? true : false
  );

  let flag = false;
  // 递归包含两项分别为深度和上一个数字
  const judgeRecursion = (lastEle: number) => {
    // 只要找到一个即可
    if (flag) {
      return;
    }
    const restNumber: number[] = [];
    // 获取所有没有访问的数字
    isVisitedArr.forEach((isVisited, index) => {
      isVisited ? void 0 : restNumber.push(index);
    });

    // 最后一个数
    if (restNumber.length === 1) {
      const lastNum = restNumber[0];
      // 选项可以头尾相连都是平方数
      if (
        squareArr.includes(lastNum + 1) &&
        squareArr.includes(lastEle + lastNum)
      ) {
        flag = true;
        return;
      } else {
        // 返回
        isVisitedArr[lastEle] = false;
      }
    } else {
      // 所有的剩余数字深度遍历
      restNumber.forEach((num) => {
        if (squareArr.includes(num + lastEle)) {
          isVisitedArr[num] = true;
          judgeRecursion(num);
        }
      });
      //   返回上一层
      isVisitedArr[lastEle] = false;
    }
  };
  // 深度优先遍历 从1开始
  judgeRecursion(1);
  return flag;
}
// 获取满足条件的最小数字
function getMinimumNum() {
  let i = 2;
  while (!canCutCake(i)) {
    i++;
  }
  return i;
}
console.log(getMinimumNum());

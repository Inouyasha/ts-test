// 合成电阻的黄金分割比

/**
 * 给定count个电阻为1的电阻可以通过串联或并联方式达到最接近result的结果数值
 *
 * @param {number} count
 * @param {number} result
 */
function getResistanceNumber(count: number, result: number) {
  // 数组第k项 标识k个电阻的所有可能性
  const resultArr: number[][] = [[], [1]];

  // 左边和右边的复合
  const getResultByArr = (left: number, right: number) => {
    if (left === 0 || right === 0) {
      return [];
    }

    const resultLeft = resultArr[left];
    const resultRight = resultArr[right];

    const resultSet: Set<number> = new Set();
    resultLeft.forEach((l) => {
      resultRight.forEach((r) => {
        // 添加串联和并联的情况
        resultSet.add(l + r);
        resultSet.add(1 / (1 / l + 1 / r));
      });
    });
    return [...resultSet];
  };

  // 获取数组中最接近target的数字
  const getNearestNum = (arr: number[], target: number) => {
    let diff = Infinity;
    let ret: number;

    arr.forEach((n) => {
      const currDiff = Math.abs(n - target);
      if (currDiff < diff) {
        diff = currDiff;
        ret = n;
      }
    });
    return ret;
  };

  for (let i = 2; i <= count; i++) {
    resultArr[i] = [];
    for (let j = 1; j <= Math.ceil(i / 2) + 1; j++) {
      resultArr[i].push(...getResultByArr(j, i - j));
    }
    // 去重
    resultArr[i] = [...new Set([...resultArr[i]])];
  }

  const ret = getNearestNum(resultArr[count], result);
  return ret;
}

// 黄金分割比
console.log(getResistanceNumber(10, (Math.sqrt(5) + 1) / 2));

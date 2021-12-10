/**
 * 一个左右各n孔的鞋带 求系鞋带的交叉点个数的最大值
 *
 * @param {number} n
 */
function getShoelaceMaxCount(n: number) {
  // 判断孔洞访问状态 其中默认左边为0-n-1 右边为n-2n-1
  const shoelaceVisitArr = Array.from({ length: 2 * n }).map((item) => false);

  // 输入插入孔洞顺序 输出交叉数
  const getCrossCount = (orderArr: number[]) => {
    let crossCount = 0;
    for (let i = 0; i < 2 * n - 1; i++) {
      // 获取相邻边用来判断 左边小右边大
      let [currLeft, currRight] =
        orderArr[i] > orderArr[i + 1]
          ? [orderArr[i + 1], orderArr[i]]
          : [orderArr[i], orderArr[i + 1]];

      for (let j = 0; j < i; j++) {
        //   获取相邻边用来判断
        let [left, right] =
          orderArr[j] > orderArr[j + 1]
            ? [orderArr[j + 1], orderArr[j]]
            : [orderArr[j], orderArr[j + 1]];

        // 交叉判断
        if (
          (currLeft < left && currRight > right) ||
          (currLeft > left && currRight < right)
        ) {
          crossCount++;
        }
      }
    }
    return crossCount;
  };
  // 输出的最大值
  let max = -Infinity;

  // 遍历
  const traverseShoelace = (orderArr: number[], nextDir: "left" | "right") => {
    // 全部洞都遍历了
    if (orderArr.length === 2 * n) {
      // 计算交叉数
      const count = getCrossCount(orderArr);
      if (max < count) {
        max = count;
      }
    }
    // 最后一项是n
    if (orderArr.length == 2 * n - 1) {
      shoelaceVisitArr[n] = true;
      traverseShoelace([...orderArr, n], "left");
      shoelaceVisitArr[n] = false;
    }

    const restNode: number[] = [];
    shoelaceVisitArr.forEach((status, index) => {
      // 不处理访问过的节点 跳过n号节点（出现在尾部）
      if (status || index === n) {
        return;
      }

      // 下个节点在左边 返回所有左边节点 否则返回所有右边节点
      if (
        (nextDir === "left" && index < n) ||
        (nextDir === "right" && index >= n)
      ) {
        restNode.push(index);
      }
    });
    restNode.forEach((nodeIndex) => {
      shoelaceVisitArr[nodeIndex] = true;

      traverseShoelace(
        [...orderArr, nodeIndex],
        nextDir === "left" ? "right" : "left"
      );

      shoelaceVisitArr[nodeIndex] = false;
    });
  };

  // 访问顺序记录 首部应该为0 尾部应该为n
  shoelaceVisitArr[0] = true;
  traverseShoelace([0], "right");

  return max;
}
console.log(getShoelaceMaxCount(6));

// 异或三角形 求2014个0出现在哪一层
function getLayer(n: number) {
  // 第一层数据
  let preLayerArr = [1];
  // 第一层
  let currLayer = 1;
  let zeroCount = 0;

  while (zeroCount !== n) {
    currLayer++;
    const currLayerArr: number[] = [];
    for (let i = 0; i !== currLayer; i++) {
      if (zeroCount === n) {
        return currLayer;
      }

      // 首尾都是1
      let currValue: number;
      if (i === 0 || i === currLayer - 1) {
        currValue = 1;
      } else {
        currValue = preLayerArr[i - 1] ^ preLayerArr[i];
      }

      if (currValue === 0) zeroCount++;
      currLayerArr.push(currValue);
    }
    preLayerArr = currLayerArr;
  }
  return currLayer;
}

console.log(getLayer(2014));

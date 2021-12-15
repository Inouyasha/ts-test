// 2孔插板和3孔插板 实现需求的插孔数可用的方法
/**
 * 电源入口唯一 2孔3孔插板所能实现的方法数
 *
 * @param {number} n 需求插孔数量
 */
function getSocketCount(n: number) {
  const socketCountArr = [0, 0, 1, 2];

  const getCount = (num: number) => {
    let count = 0;
    // 初始为2孔 被占1孔
    count += socketCountArr[num - 1];

    // 初始2孔 被占2孔
    getSequenceSet(num, 2).forEach(([i, j]) => {
      count += socketCountArr[i] * socketCountArr[j];
    });

    // 3是特殊的 因为它3孔 被占0孔 只有它是这样的
    // 初始3孔 被占1孔
    count += socketCountArr[num - 2];

    // 初始3孔 被占2孔
    getSequenceSet(num - 1, 2).forEach(([i, j]) => {
      count += socketCountArr[i] * socketCountArr[j];
    });

    // 初始3孔 被占3孔
    getSequenceSet(num, 3).forEach(([i, j, k]) => {
      count += socketCountArr[i] * socketCountArr[j] * socketCountArr[k];
    });

    return count;
  };

  // 数据内存化
  for (let i = 4; i <= n; i++) {
    socketCountArr.push(getCount(i));
    // console.log(socketCountArr);
  }
  return socketCountArr[n];
}

// 给定总和 和要产生的序列包含项数 产生不重复序列
// 序列中的所有项都大于等于min 并且也是所有的大于等于min的项
function getSequenceSet(sum: number, len: number, min: number = 1) {
  // 此情况不可能有对应序列
  if (sum < len * min) {
    return [] as number[][];
  }

  if (len === 1) {
    return [[sum]];
  }

  // seq所有项都比min大
  const seqList: number[][] = [];
  for (let i = min; i <= sum; i++) {
    const subSeqList = getSequenceSet(sum - i, len - 1, i);
    // 组合输出
    seqList.push(...subSeqList.map((s) => [i, ...s]));
  }
  console.log(seqList);
  return seqList;
}

// const N = 20;
var memo = [];
memo[1] = 1;
function set_tap(remain) {
  if (memo[remain]) {
    return memo[remain];
  }
  var cnt = 0;
  /* 2个插口 */
  for (var i = 1; i <= remain / 2; i++) {
    if (remain - i == i) cnt += (set_tap(i) * (set_tap(i) + 1)) / 2;
    else cnt += set_tap(remain - i) * set_tap(i);
  }
  /* 3个插口 */
  for (var i = 1; i <= remain / 3; i++) {
    for (var j = i; j <= (remain - i) / 2; j++) {
      if (remain - (i + j) == i && i == j) {
        cnt += (set_tap(i) * (set_tap(i) + 1) * (set_tap(i) + 2)) / 6;
      } else if (remain - (i + j) == i) {
        cnt += (set_tap(i) * (set_tap(i) + 1) * set_tap(j)) / 2;
      } else if (i == j) {
        cnt += (set_tap(remain - (i + j)) * set_tap(i) * (set_tap(i) + 1)) / 2;
      } else if (remain - (i + j) == j)
        cnt += (set_tap(j) * (set_tap(j) + 1) * set_tap(i)) / 2;
      else cnt += set_tap(remain - (i + j)) * set_tap(j) * set_tap(i);
    }
  }
  memo[remain] = cnt;
  return cnt;
}

// 感觉书里的代码有问题 有情况没有遍历到
console.log(getSocketCount(6));
console.log(set_tap(6));

// n的倍数由0和7构成 如果最小的这样的倍数是回文数 则返回这个数
function find07MinNumber(n: number) {
  let factor = 1;
  while (true) {
    // 找到该乘积
    const num = factor * n;
    if (is07Number(num)) {
      return num;
    } else {
      factor++;
    }
  }
}
console.log(find07MinNumber(9));

// 判断数字是否有且只有0 7 组成
function is07Number(n: number) {
  const nCharArr = n.toString().split("");
  const charSet = new Set(nCharArr);

  // 判断数字是否只有0或7
  if (!(charSet.has("0") && charSet.has("7"))) {
    return false;
  }
  // 判断字符集是否只有两个数
  return [...charSet].length === 2;
}

// 判断是否回文
function isPara(n: number) {
  const nCharArr = n.toString().split("");
  let flag = true;
  // 判断回文
  for (let i = 0; i < nCharArr.length / 2; i++) {
    if (nCharArr[i] !== nCharArr[nCharArr.length - 1 - i]) {
      flag = false;
    }
  }
  return flag;
}

// 函数体
function solution35(range: [number, number]) {
  const answers: [number, number][] = [];
  for (let i = range[0]; i !== range[1]; i++) {
    const minNum = find07MinNumber(i);
    if (isPara(minNum)) {
      answers.push([i, minNum]);
    }
  }
  console.log(answers);
}
solution35([1, 51]);

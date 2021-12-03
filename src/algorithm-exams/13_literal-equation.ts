interface AlphaMap {
  [key: string]: number;
}

// 判断给定的字母数字映射是否正常
function isMapValid(equation: string, alphaMap: AlphaMap) {
  // 替换公式字母为对应数字
  const newEquation = equation.replace(/[A-Za-z]+/g, (numStr: string) => {
    return (+numStr
      .split("")
      .map((char) => alphaMap[char])
      .join("")).toString();
  });

  // 算取左值右值 判断是否相等
  const [left, right] = newEquation.split("=");
  const leftVal = eval(left);
  const rightVal = eval(right);
  return leftVal === rightVal;
}

// 给定一个字母算式 输出一个字母数字映射使算式成立
function getAlphaNumberMap(equation: string) {
  const alphaDic: AlphaMap = {};
  const solution: AlphaMap[] = [];

  // 初始化数字字母映射
  equation.split("").forEach((char) => {
    if (/[A-Za-z]/.test(char)) {
      if (char in alphaDic) {
        return;
      } else {
        alphaDic[char] = -1;
      }
    }
  });

  // 遍历顺序
  const charArr = Object.keys(alphaDic);
  if (charArr.length === 0) return solution;

  // 算式的第一位的字母 用于判断不为0的条件
  const firstChars = equation
    .match(/([A-Za-z])[A-Za-z]+/g)
    .map((str) => str[0]);

  // 用于控制字母不相同条件
  const numSet = new Set();
  let i = 0;

  while (i >= 0) {
    const currChar = charArr[i];
    if (i == charArr.length - 1) {
      alphaDic[currChar]++;
      while (
        alphaDic[currChar] < 10 &&
        ((alphaDic[currChar] === 0 && firstChars.includes(currChar)) ||
          numSet.has(alphaDic[currChar]))
      ) {
        // 如果首字母为0 或者 字母已出现变为下一个
        alphaDic[currChar]++;
      }

      if (alphaDic[currChar] > 9) {
        if (i === 0) {
          break;
        }
        numSet.delete(alphaDic[charArr[i - 1]]);
        // 重置现场
        alphaDic[currChar] = -1;
        // 回溯
        i--;
        continue;
      }

      if (isMapValid(equation, alphaDic)) {
        solution.push({
          ...alphaDic,
        });
      }
    } else {
      // 普通情况 判断下一个数字
      alphaDic[currChar]++;
      while (
        alphaDic[currChar] < 10 &&
        ((alphaDic[currChar] === 0 && firstChars.includes(currChar)) ||
          numSet.has(alphaDic[currChar]))
      ) {
        // 如果首字母为0 或者 字母已出现变为下一个
        alphaDic[currChar]++;
      }

      if (alphaDic[currChar] > 9) {
        // 重置现场
        if (i === 0) {
          break;
        }
        numSet.delete(alphaDic[charArr[i - 1]]);

        alphaDic[currChar] = -1;
        // 回溯
        i--;
      } else {
        numSet.add(alphaDic[currChar]);
        // 到下一层
        i = i + 1;
      }
    }
  }

  // 特殊情况 没有满足条件的数据
  return solution;
}

const equation = "READ + WRITE + TALK = SKILL";
console.log(getAlphaNumberMap(equation));

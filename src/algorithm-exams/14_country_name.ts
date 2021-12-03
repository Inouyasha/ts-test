// 输出最长的接龙
const COUNTRY_NAMES = [
  "Brazil",
  "Croatia",
  "Mexico",
  "Cameroon",
  "Spain",
  "Netherlands",
  "Chile",
  "Colombia",
  "Greece",
  "Cote d'Ivoire",
  "Japan",
  "Uruguay",
  "Costa Rica",
  "England",
  "Italy",
  "Switzerland",
  "Ecuador",
  "France",
  "Honduras",
  "Bosnia and Herzegovina",
  "Iran",
  "Nigeria",
  "Germany",
  "Portugal",
  "Ghana",
  "USA",
  "Belgium",
  "Algeria",
  "Russia",
  "Korea Republic",
  "Argentina",
  "Australia",
];

// 获取最长的名称链接
function getLongestNames() {
  const isCountryVisited = {};
  // 待输出的状态
  let maxLen = -Infinity;
  let longestNameList: string[] = [];
  // 初始化访问状态
  COUNTRY_NAMES.forEach((c) => {
    isCountryVisited[c] = false;
  });
  const firstCharDic: { [key: string]: string[] } = {};
  // 首字母用来hash的dic
  COUNTRY_NAMES.forEach((c) => {
    const firstChar = c[0].toLowerCase();
    if (firstChar in firstCharDic) {
      firstCharDic[firstChar].push(c);
    } else {
      firstCharDic[firstChar] = [c];
    }
  });

  // 递归回溯 深度优先遍历
  const getNameListRecursion = (nameList: string[], lastChar: string) => {
    const nextNames = firstCharDic[lastChar];
    // 判断是否不能继续接龙
    if (
      lastChar in firstCharDic ||
      nextNames.every((name) => isCountryVisited[name])
    ) {
      // 所有都访问过
      if (maxLen < nameList.length) {
        // 最大长度超过已有的最大长度 此时重新赋值最大长度和最大序列
        maxLen = nameList.length;
        longestNameList = [...nameList];
      }
      return;
    }

    // 遍历所有名字
    nextNames
      .filter((name) => !isCountryVisited[name])
      .forEach((name) => {
        isCountryVisited[name] = true;
        // 向下一个名字递归
        getNameListRecursion([...nameList, name], name.slice(-1));
        // 还原现场
        isCountryVisited[name] = false;
      });
  };

  //  访问所有可能的开始
  COUNTRY_NAMES.forEach((name) => {
    isCountryVisited[name] = true;
    getNameListRecursion([name], name.slice(-1));
    isCountryVisited[name] = false;
  });

  return { maxLen, longestNameList };
}

console.log(getLongestNames());

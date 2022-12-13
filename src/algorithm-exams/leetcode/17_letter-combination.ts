/**
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/letter-combinations-of-a-phone-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {string} digits
 * @return {*}  {string[]}
 */
function letterCombinations(digits: string): string[] {
  const record: Record<string, string> = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const ret: string[] = [];
  if (digits.length === 0) {
    return ret;
  }
  const letterCombinationsRecursion = (path: string, index: number) => {
    if (index === digits.length) {
      ret.push(path);
      return;
    }

    const currStr = record[digits[index]];
    for (const c of currStr.split("")) {
      letterCombinationsRecursion(path + c, index + 1);
    }
  };
  letterCombinationsRecursion("", 0);
  return ret;
}

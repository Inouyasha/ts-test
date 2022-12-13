/**
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

 *
 * @param {number} n
 * @return {*}  {string[]}
 */
function generateParenthesis(n: number): string[] {
  const ret: string[] = [];

  /**
   *
   *
   * @param {string} s 迭代的字符串
   * @param {number} left 左括号数
   * @param {number} right 右括号数
   */
  const generateParenthesisRecursion = (
    s: string,
    left: number,
    right: number
  ) => {
    if (left === n && right === n) {
      ret.push(s);
      return;
    }

    // 左括号数还可以增加
    if (left < n) {
      generateParenthesisRecursion(s + "(", left + 1, right);
    }
    // 右括号少于左括号
    if (left > right) {
      generateParenthesisRecursion(s + ")", left, right + 1);
    }
  };
  generateParenthesisRecursion("", 0, 0);
  return ret;
}

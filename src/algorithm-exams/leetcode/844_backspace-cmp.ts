/**
 * 给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，如果两者相等，返回 true 。# 代表退格字符。

注意：如果对空文本输入退格字符，文本继续为空。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/backspace-string-compare
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {string} s
 * @param {string} t
 * @return {*}  {boolean}
 */
function backspaceCompare(s: string, t: string): boolean {
  let p = s.length - 1,
    q = t.length - 1;
  let pSkip = 0,
    qSkip = 0;

  while (p >= 0 || q >= 0) {
    const pVal = p >= 0 ? s[p] : null,
      qVal = q >= 0 ? t[q] : null;

    if (pVal === "#") {
      pSkip++;
      p--;
      continue;
    } else if (pSkip > 0) {
      // 跳过
      pSkip--;
      p--;
      continue;
    }

    if (qVal === "#") {
      qSkip++;
      q--;
      continue;
    } else if (qSkip > 0) {
      // 跳过
      qSkip--;
      q--;
      continue;
    }

    if (pVal === qVal) {
      p--;
      q--;
      continue;
    } else {
      return false;
    }
  }

  // 跳出 说明都走到边界外
  return true;
}
console.log(backspaceCompare("bxj##tw", "bxo#j##tw"));

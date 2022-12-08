/**
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。


注意：

对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
如果 s 中存在这样的子串，我们保证它是唯一的答案。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/minimum-window-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {string} s
 * @param {string} t
 * @return {*}  {string}
 */
function minWindow(s: string, t: string): string {
  let need: Record<string, number> = {};
  let window: Record<string, number> = {};
  let valid = 0;
  let needValid = 0;

  for (const c of t) {
    if (c in need) {
      need[c]++;
    } else {
      need[c] = 1;
      window[c] = 0;
      needValid++;
    }
  }

  let l = 0,
    r = 0,
    retStr = "";
  while (r < s.length) {
    const c = s[r];
    r++;

    if (c in need) {
      window[c]++;
      if (window[c] === need[c]) {
        valid++;
      }
    }

    while (needValid === valid) {
      const len = r - l;
      // 更新合理的字符串
      if (retStr === "" || len < retStr.length) {
        retStr = s.substring(l, r);
      }

      // 左窗口右移
      const d = s[l];
      l++;
      if (d in need) {
        if (window[d] === need[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }
  return retStr;
}

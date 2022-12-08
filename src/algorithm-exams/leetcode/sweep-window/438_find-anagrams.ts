/**
 *给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/find-all-anagrams-in-a-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {string} s
 * @param {string} p
 * @return {*}  {number[]}
 */
function findAnagrams(s: string, p: string): number[] {
  // 记录p串中每个字符需要的数量
  let pNeed: Record<string, number> = {};
  let window: Record<string, number> = {};
  // 用于判断有几位正确
  let valid = 0;
  let validNeed = 0;
  const retPos: number[] = [];

  // 设置pNeed
  for (let c of p) {
    if (c in pNeed) {
      pNeed[c]++;
    } else {
      // 初始化
      window[c] = 0;
      pNeed[c] = 1;
      validNeed++;
    }
  }

  let l = 0,
    r = 0;
  while (r < s.length) {
    const c = s[r];
    r++;

    // 更新window状态
    if (c in pNeed) {
      window[c]++;
      if (window[c] === pNeed[c]) {
        valid++;
      }
    }

    // 考虑什么时候窗口收缩 当窗口长度和p一样长
    while (r - l >= p.length) {
      // 先判断是否满足条件
      if (valid === validNeed) {
        retPos.push(l);
      }

      // 窗口向左移动
      const d = s[l];
      l++;
      if (d in pNeed) {
        if (window[d] === pNeed[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }

  return retPos;
}

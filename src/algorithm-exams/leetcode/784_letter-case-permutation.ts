/**
 * 给定一个字符串 s ，通过将字符串 s 中的每个字母转变大小写，我们可以获得一个新的字符串。

返回 所有可能得到的字符串集合 。以 任意顺序 返回输出。
 *
 * @param {string} s
 * @return {*}  {string[]}
 */
// 回溯
function letterCasePermutation(s: string): string[] {
  const ret: string[] = [];
  // 先保证小写
  const sLower = s.toLowerCase();

  const dfs = (depth: number, str: string) => {
    if (depth === s.length) {
      ret.push(str);
      return;
    }
    const albumRe = /[a-z]/;
    const char = sLower[depth];
    if (albumRe.test(char)) {
      dfs(depth + 1, str + char);
      dfs(depth + 1, str + char.toUpperCase());
    } else {
      dfs(depth + 1, str + char);
    }
  };
  dfs(0, "");
  return ret;
}

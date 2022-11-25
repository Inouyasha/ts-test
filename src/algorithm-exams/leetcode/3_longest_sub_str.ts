/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 * @param {string} s
 * @return {*}  {number}
 */
function lengthOfLongestSubstring(s: string): number {
  // 反映到当前位置时以该位置为结尾的最长串
  let currStr = "";
  // 返回值
  let maxLen = 0;

  s.split("").forEach((c) => {
    if (currStr.includes(c)) {
      // 有重复字符 找到重复字符位置
      const duplicateIndex = currStr.indexOf(c);
      currStr = currStr.slice(duplicateIndex, currStr.length) + c;
    } else {
      // 没有重复字符
      currStr = currStr + c;
    }
    // 更新最大长度
    maxLen = Math.max(currStr.length, maxLen);
  });
  return maxLen;
}
console.log(lengthOfLongestSubstring("abcabcbb"));

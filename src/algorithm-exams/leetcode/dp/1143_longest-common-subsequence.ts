/**
 * 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/longest-common-subsequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

  dp[i][j] = dp[i-1][j-1]+1 if text1[i]==text2[j]
             max(dp[i-1][j],dp[i][j-1]) if text1[i]!=text2[j]
 *
 * @param {string} text1
 * @param {string} text2
 * @return {*}  {number}
 */
function longestCommonSubsequence(text1: string, text2: string): number {
  const len1 = text1.length,
    len2 = text2.length;
  // len+1 x len+2 坐标和0相关的位置数值为0
  const dp = Array.from(
    {
      length: len1 + 1,
    },
    () => {
      return Array.from({ length: len2 + 1 }, () => 0);
    }
  );

  // dp[i][j] = dp[i-1][j-1]+1 if text1[i]==text2[j]
  //            max(dp[i-1][j],dp[i][j-1]) if text1[i]!=text2[j]
  // 开始遍历
  for (let i = 0; i !== len1; i++) {
    for (let j = 0; j !== len2; j++) {
      if (text1[i] === text2[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }
  return dp[len1][len2];
}
console.log(longestCommonSubsequence("intention", "execution"));

/**
 * 给你一个字符串 s，找到 s 中最长的回文子串。

如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
思路：P(i,j)标识[i,j]串是否为回文 P(i,j)=P(i+1,j-1)&&s[i]===s[j] 边界条件为i==j和j=i+1
 *
 * @param {string} s
 * @return {*}  {string}
 */
function longestPalindrome(s: string): string {
  // dp为sLen*sLen矩阵
  const sLen = s.length;
  if (sLen === 0) {
    return "";
  }

  const dp: number[][] = Array.from({ length: sLen }, () => {
    return Array.from({ length: sLen }, () => {
      // -1标识没有初始化
      return -1;
    });
  });

  // 判断最大长度位置[start,end]
  let start = 0,
    end = 0;
  // 长度为1的串为回文
  for (let i = 0; i !== sLen; i++) {
    dp[i][i] = 1;

    if (i + 1 < sLen) {
      // 如果相邻字符相同 则为1 否则为0
      if (s[i] === s[i + 1]) {
        dp[i][i + 1] = 1;
        start = i;
        end = i + 1;
      } else {
        dp[i][i + 1] = 0;
      }
    }
  }

  for (let len = 3; len <= sLen; len++) {
    for (let i = 0; i + len - 1 < sLen; i++) {
      const j = i + len - 1;
      // P(i,j)=P(i+1,j-1)&&s[i]===s[j] 边界条件为i==j和j=i+1
      // 满足条件时 更新最长序列
      if (dp[i + 1][j - 1] === 1 && s[i] === s[j]) {
        dp[i][j] = 1;
        start = i;
        end = j;
      } else {
        dp[i][j] = -1;
      }
    }
  }
  return s.substring(start, end + 1);
}

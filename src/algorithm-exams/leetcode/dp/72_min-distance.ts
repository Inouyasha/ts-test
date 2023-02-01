/**
 *给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。

你可以对一个单词进行如下三种操作：

插入一个字符
删除一个字符
替换一个字符

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/edit-distance
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {string} word1
 * @param {string} word2
 * @return {*}  {number}
 */
function minDistance(word1: string, word2: string): number {
  const len1 = word1.length,
    len2 = word2.length;
  // len+1 x len+2 坐标和0相关的位置数值为0
  const dp = Array.from(
    {
      length: len1 + 1,
    },
    () => {
      return Array.from({ length: len2 + 1 }, () => 0);
    }
  );

  // 从word1删除全部字符要i次(word2添加字符)
  for (let i = 0; i !== len1 + 1; i++) {
    dp[i][0] = i;
  }
  // 从word1插入字符要j次
  for (let j = 0; j !== len2 + 1; j++) {
    dp[0][j] = j;
  }

  // 开始遍历
  for (let i = 1; i !== len1 + 1; i++) {
    for (let j = 1; j !== len2 + 1; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // 插入
          dp[i][j - 1] + 1, // 删除
          dp[i - 1][j - 1] // 不做操作
        );
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // 插入
          dp[i][j - 1] + 1, // 删除
          dp[i - 1][j - 1] + 1 // 不做操作
        );
      }
    }
  }
  return dp[len1][len2];
}
console.log(minDistance("a", ""));

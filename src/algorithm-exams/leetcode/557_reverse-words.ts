/**
 *给定一个字符串 s ，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
 *
 * @param {string} s
 * @return {*}  {string}
 */
function reverseWords(s: string): string {
  const words = s.split(" ");

  const newWords = words.map((word) => {
    return word.split("").reverse().join("");
  });
  return newWords.join(" ");
}

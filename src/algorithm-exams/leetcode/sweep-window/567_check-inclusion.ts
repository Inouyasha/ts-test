/**
 * 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。

换句话说，s1 的排列之一是 s2 的 子串 。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/permutation-in-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {string} s1
 * @param {string} s2
 * @return {*}  {boolean}
 */
// function checkInclusion(s1: string, s2: string): boolean {
//   let currStr = "";

//   const charCount: Record<string, number> = {};
//   // s1统计字符
//   s1.split("").forEach((c) => {
//     charCount[c] = c in charCount ? charCount[c] + 1 : 1;
//   });

//   // 查找字符串中出现的第一个字符 以及字符的数量
//   const strCharCount = (s: string, c: string) => {
//     let count = 0,
//       firstIndex = -1;
//     s.split("").forEach((char, index) => {
//       if (char !== c) {
//         return;
//       }

//       count++;
//       if (firstIndex === -1) {
//         firstIndex = index;
//       }
//     });
//     return {
//       count,
//       firstIndex,
//     };
//   };

//   for (let i = 0; i !== s2.length; i++) {
//     const c = s2[i];

//     // 当前字符不在字符集内直接跳出 并且set清空
//     if (!s1.includes(c)) {
//       // 重新开始
//       currStr = "";
//       continue;
//     }
//     // 当前字符在字符集内 但是前面已经有对应字符了
//     const { count, firstIndex } = strCharCount(currStr, c);

//     // 字符数量小于s1对应char数量
//     if (count < charCount[c]) {
//       currStr += c;
//     } else {
//       // 有该字符 调整字符串 将字符前包括字符删除
//       currStr = currStr.substring(firstIndex + 1, currStr.length) + c;
//     }

//     // 字符长度和要求串一致
//     if (currStr.length === s1.length) {
//       return true;
//     }
//   }

//   return false;
// }
// console.log(checkInclusion("ab", "eidbaooo"));
// console.log(checkInclusion("ab", "eidboaoo"));
// console.log(checkInclusion("abcdxabcde", "abcdeabcdx"));

// 滑动窗口
// 不关注字串的状态 转而关注当前增加的字符和减少的字符对整体的valid数量状态的影响
function checkInclusion(s1: string, s2: string): boolean {
  const need: Record<string, number> = {};
  const window: Record<string, number> = {};
  let valid = 0;
  let needValid = 0;

  // 初始化
  for (const c of s1) {
    if (c in need) {
      need[c]++;
    } else {
      need[c] = 1;
      window[c] = 0;
      needValid++;
    }
  }

  let l = 0,
    r = 0;
  while (r < s2.length) {
    const c = s2[r];
    r++;

    if (c in need) {
      window[c]++;
      if (window[c] === need[c]) {
        valid++;
      }
    }

    // 判断窗口状态
    while (r - l >= s1.length) {
      // 判断是否符合要求
      if (valid === needValid) {
        return true;
      }

      const d = s2[l];
      l++;
      if (d in need) {
        if (window[d] === need[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }

  // 没有符合条件的情况
  return false;
}

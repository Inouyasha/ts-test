/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 * @param {string} s
 * @return {*}  {number}
 */
// function lengthOfLongestSubstring(s: string): number {
//   // 反映到当前位置时以该位置为结尾的最长串
//   let currStr = "";
//   // 返回值
//   let maxLen = 0;

//   s.split("").forEach((c) => {
//     if (currStr.includes(c)) {
//       // 有重复字符 找到重复字符位置
//       const duplicateIndex = currStr.indexOf(c);
//       currStr = currStr.slice(duplicateIndex, currStr.length) + c;
//     } else {
//       // 没有重复字符
//       currStr = currStr + c;
//     }
//     // 更新最大长度
//     maxLen = Math.max(currStr.length, maxLen);
//   });
//   return maxLen;
// }
// console.log(lengthOfLongestSubstring("abcabcbb"));

// 滑动窗口
// function lengthOfLongestSubstring(s: string): number {
//   let window: Record<string, number> = {};
//   let max = 0;

//   // 判断窗口当前的串是否正常
//   let invalidCharCount = 0;

//   let l = 0,
//     r = 0;
//   while (r < s.length) {
//     const c = s[r];
//     r++;

//     if (c in window) {
//       window[c]++;

//       // 由1->2时增加 2->1时减少
//       if (window[c] === 2) {
//         invalidCharCount++;
//       }
//     } else {
//       window[c] = 1;
//     }

//     if (invalidCharCount === 0 && r - l > max) {
//       max = r - l;
//     }

//     // 收缩窗口策略 当前窗口不合理时收缩
//     while (invalidCharCount > 0) {
//       const d = s[l];
//       l++;

//       window[d]--;
//       // 只有当窗口中异常字符2->1时标记为减少
//       if (window[d] === 1) {
//         invalidCharCount--;
//       }
//     }
//   }

//   return max;
// }

// 滑动窗口2
function lengthOfLongestSubstring(s: string): number {
  let window: Record<string, number> = {};
  let max = 0;

  let l = 0,
    r = 0;
  while (r < s.length) {
    const c = s[r];
    r++;

    if (c in window) {
      window[c]++;
    } else {
      window[c] = 1;
    }

    // 收缩窗口策略 当前字符不合理时收缩 直到当前字符合理（查找以当前字符作为结尾的最长串）
    while (window[c] > 1) {
      const d = s[l];
      l++;

      window[d]--;
    }

    max = Math.max(max, r - l);
  }

  return max;
}

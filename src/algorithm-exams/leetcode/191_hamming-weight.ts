/**
 * 编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量）。
 *
 * @param {number} n
 * @return {*}  {number}
 */
function hammingWeight(n: number): number {
  let count = 0;
  let temp = n;
  while (temp !== 0) {
    if (temp % 2 === 1) {
      count++;
    }
    temp = temp >>> 1;
  }
  return count;
}

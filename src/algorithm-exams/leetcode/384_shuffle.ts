/**
 * 将数组进行随机打乱
 *
 * 解析：Fisher-Yates 洗牌算法
 *
 * 遍历i[0,n-1]
 * 每次随机选取[i,n-1]的任意数组作为i位 然后交换
 *
 * 考虑每个位置上的数字出现概率均为1/n
 * 如k在第二位概率为 n-1/n x 1/n-1 = 1/n
 *
 * @param {number[]} nums
 * @return {*}  {number[]}
 */
function shuffle(nums: number[]): number[] {
  const newNums = [...nums];
  const len = nums.length;
  for (let i = 0; i !== len; i++) {
    // index为[i,n-1]任一位置数字
    const index = Math.floor(Math.random() * (len - i - 1)) + i;
    // 交换位置
    [newNums[i], newNums[index]] = [newNums[index], newNums[i]];
  }
  return newNums;
}

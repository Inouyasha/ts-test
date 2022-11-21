/**
 * 给你一个下标从 1 开始的整数数组 numbers ，该数组已按 非递减顺序排列  ，请你从数组中找出满足相加之和等于目标数 target 的两个数。如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，则 1 <= index1 < index2 <= numbers.length 。

以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。

你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。

你所设计的解决方案必须只使用常量级的额外空间。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[]} numbers
 * @param {number} target
 * @return {*}  {number[]}
 */
function twoSum(numbers: number[], target: number): number[] {
  const hash: { [key: number]: number } = {};

  for (let i = 0; i !== numbers.length; i++) {
    const num = numbers[i];
    const other = target - num;

    if (other in hash) {
      return [hash[other] + 1, i + 1];
    }

    hash[num] = i;
  }
  return [-1, -1];
}

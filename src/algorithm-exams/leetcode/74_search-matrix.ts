/**
 *编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

每行中的整数从左到右按升序排列。
每行的第一个整数大于前一行的最后一个整数。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/search-a-2d-matrix
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[][]} matrix
 * @param {number} target
 * @return {*}  {boolean}
 */
function searchMatrix(matrix: number[][], target: number): boolean {
  const cLen = matrix[0].length;

  const searchRecursion = (start: number, end: number) => {
    if (start > end) {
      return false;
    }

    const mid = Math.floor((start + end) / 2);
    // 查找对应的坐标位置
    const curr = matrix[Math.floor(mid / cLen)][mid % cLen];

    if (curr === target) {
      return true;
    } else if (curr > target) {
      return searchRecursion(start, mid - 1);
    } else {
      return searchRecursion(mid + 1, end);
    }
  };

  return searchRecursion(0, matrix.length * cLen - 1);
}

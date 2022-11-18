/**
 * 你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。

假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。

  来源：力扣（LeetCode）
  链接：https://leetcode.cn/problems/first-bad-version
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number} n 当前错误版本
 */
declare const isBadVersion: (version: number) => boolean;
function firstBadVersion(n: number) {
  const versionRecursion = (start: number, end: number): number => {
    // 判断不存在的情况 没有找到
    if (start > end) {
      return -1;
    }

    const mid = Math.floor((start + end) / 2);
    const flag = isBadVersion(mid);

    // 当前版本有问题
    if (flag) {
      // 在前面版本查找 如果找不到就是从这里开始的问题
      const preVersion = versionRecursion(start, mid - 1);
      return preVersion === -1 ? mid : preVersion;
    } else {
      // 之后的版本问题
      return versionRecursion(mid + 1, end);
    }
  };
  versionRecursion(1, n);
}

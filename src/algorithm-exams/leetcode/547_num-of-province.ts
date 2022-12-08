/**
 * 有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。

省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。

返回矩阵中 省份 的数量。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/number-of-provinces
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[][]} isConnected
 * @return {*}  {number}
 */
function findCircleNum(isConnected: number[][]): number {
  const nodeCount = isConnected.length;
  const isNodeVisited = Array.from({ length: nodeCount }, () => false);

  const visitCity = (index: number) => {
    for (let i = 0; i !== nodeCount; i++) {
      // 判断节点是否被访问 或 节点是否有连接
      if (isNodeVisited[i] || !isConnected[index][i]) {
        continue;
      }

      // 访问可用节点
      isNodeVisited[i] = true;
      // 访问该节点
      visitCity(i);
    }
  };

  let count = 0;
  for (let i = 0; i !== nodeCount; i++) {
    if (isNodeVisited[i]) {
      continue;
    }

    // 增加省份数量
    count++;
    visitCity(i);
  }
  return count;
}
console.log(
  findCircleNum([
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
    [1, 0, 1, 1],
  ])
);

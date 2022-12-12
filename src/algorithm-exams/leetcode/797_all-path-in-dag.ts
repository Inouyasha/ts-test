/**
 *给你一个有 n 个节点的 有向无环图（DAG），请你找出所有从节点 0 到节点 n-1 的路径并输出（不要求按特定顺序）

 graph[i] 是一个从节点 i 可以访问的所有节点的列表（即从节点 i 到节点 graph[i][j]存在一条有向边）

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/all-paths-from-source-to-target
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {number[][]} graph
 * @return {*}  {number[][]}
 */
function allPathsSourceTarget(graph: number[][]): number[][] {
  const target = graph.length - 1;
  const paths: number[][] = [];

  const dfs = (path: number[]) => {
    // 最后一个节点
    const lastNode = path[path.length - 1];
    if (lastNode === target) {
      paths.push([...path]);
      return;
    }

    for (const nextNode of graph[lastNode]) {
      dfs([...path, nextNode]);
    }
  };
  dfs([0]);
  return paths;
}

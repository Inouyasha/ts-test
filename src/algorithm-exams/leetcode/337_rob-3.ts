import { TreeNode, TreeNodeOrNull } from "./core/interface";

/**
 *小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。

除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。

给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/house-robber-iii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {(TreeNode | null)} root
 * @return {*}  {number}
 */
function rob3(root: TreeNode | null): number {
  const valueMap: Map<TreeNode, number> = new Map();

  // 返回包含两部分 第一为包含该节点 第二为不包含
  const getValue = (r: TreeNodeOrNull): number => {
    if (r === null) {
      return 0;
    }

    // 读取缓存 避免重复访问
    if (valueMap.has(r)) {
      return valueMap.get(r);
    }

    // 如果包含当前节点 则加和当前节点和四个孙子节点
    const containValue =
      r.val +
      getValue(r.left?.left ?? null) +
      getValue(r.left?.right ?? null) +
      getValue(r.right?.right ?? null) +
      getValue(r.right?.left ?? null);
    const notContainValue = getValue(r.left) + getValue(r.right);
    const maxValue = Math.max(containValue, notContainValue);
    valueMap.set(r, maxValue);
    return maxValue;
  };
  return getValue(root);
}

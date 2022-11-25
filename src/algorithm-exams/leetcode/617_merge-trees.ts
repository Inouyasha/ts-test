import { TreeNode, TreeNodeOrNull } from "./core/interface";

/**
 * 给你两棵二叉树： root1 和 root2 。

想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 null 的节点将直接作为新二叉树的节点。

返回合并后的二叉树。

注意: 合并过程必须从两个树的根节点开始。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/merge-two-binary-trees
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {(TreeNodeOrNull)} root1
 * @param {(TreeNodeOrNull)} root2
 * @return {*}  {(TreeNodeOrNull)}
 */
function mergeTrees(
  root1: TreeNodeOrNull,
  root2: TreeNodeOrNull
): TreeNodeOrNull {
  const constructTree = (r1: TreeNodeOrNull, r2: TreeNodeOrNull) => {
    // 有节点为空直接返回
    if (r1 === null) {
      return r2;
    }
    if (r2 === null) {
      return r1;
    }
    const newRoot = new TreeNode(r1.val + r2.val);
    newRoot.left = constructTree(r1.left, r2.left);
    newRoot.right = constructTree(r1.right, r2.right);

    return newRoot;
  };
  return constructTree(root1, root2);
}

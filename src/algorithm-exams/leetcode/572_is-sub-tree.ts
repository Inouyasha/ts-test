import { TreeNode } from "./core/interface";
/**
 *给你两棵二叉树 root 和 subRoot 。检验 root 中是否包含和 subRoot 具有相同结构和节点值的子树。如果存在，返回 true ；否则，返回 false 。

二叉树 tree 的一棵子树包括 tree 的某个节点和这个节点的所有后代节点。tree 也可以看做它自身的一棵子树。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/subtree-of-another-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * @param {(TreeNode | null)} root
 * @param {(TreeNode | null)} subRoot
 * @param {boolean} [isStrict=false]
 * @return {*}  {boolean}
 */
function isSubtree(
  root: TreeNode | null,
  subRoot: TreeNode | null,
  isStrict: boolean = false
): boolean {
  if (root === null || subRoot === null) {
    return root === subRoot;
  }

  // 根节点相同
  if (root.val === (subRoot?.val ?? null)) {
    const flag =
      isSubtree(root.left, subRoot.left, true) &&
      isSubtree(root.right, subRoot.right, true);
    if (flag) {
      return true;
    }
  }

  if (isStrict) {
    return false;
  }

  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
// 中序遍历加字符串匹配

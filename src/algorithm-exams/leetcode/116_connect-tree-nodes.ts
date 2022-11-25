class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  next: TreeNode | null;
  constructor(
    val?: number,
    left?: TreeNode,
    right?: TreeNode,
    next?: TreeNode
  ) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
}
type TreeNodeOrNull = TreeNode | null;

function connect(root: TreeNode | null): TreeNodeOrNull {
  if (root === null) {
    return null;
  }

  let currLayerNodes: TreeNode[] = [root];
  let nextLayerNodes: TreeNode[] = [];
  // 层序遍历
  while (currLayerNodes.length !== 0) {
    currLayerNodes.forEach((node, index) => {
      // 最后一项为null 即默认值 不处理即可
      if (index !== currLayerNodes.length - 1) {
        // 定义下一项
        node.next = currLayerNodes[index + 1];
      }

      // 一下层节点
      if (node.left) {
        nextLayerNodes.push(node.left);
      }
      if (node.right) {
        nextLayerNodes.push(node.right);
      }
    });
    // 重置下一层状态
    currLayerNodes = nextLayerNodes;
    nextLayerNodes = [];
  }
  return root;
}

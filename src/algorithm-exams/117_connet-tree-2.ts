/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     left: Node | null
 *     right: Node | null
 *     next: Node | null
 *     constructor(val?: number, left?: Node, right?: Node, next?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
class NodeTemp {
  val: number;
  left: NodeTemp | null;
  right: NodeTemp | null;
  next: NodeTemp | null;
  constructor(
    val?: number,
    left?: NodeTemp,
    right?: NodeTemp,
    next?: NodeTemp
  ) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
}

function connect2(root: NodeTemp | null): NodeTemp | null {
  if (root === null) {
    return null;
  }

  root.next = null;
  const dummy = new NodeTemp(0);
  let p: NodeTemp = root;

  while (p !== null) {
    let pre = dummy;

    // 依赖假设所有当前行都是链表 现在要使得下一行也是链表
    while (p !== null) {
      if (p.left) {
        pre.next = p.left;
        pre = p.left;
      }
      if (p.right) {
        pre.next = p.right;
        pre = p.right;
      }
      if (!p.next) {
        pre.next = null;
      }
      p = p.next;
    }

    // 重新设置p 直到dummy.next==null说明遍历结束
    p = dummy.next;
  }
  return root;
}

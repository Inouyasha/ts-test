export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }

  static generateList(nums: number[]): ListNode | null {
    if (nums.length === 0) {
      return null;
    }

    const head = new ListNode(nums[0]);
    let p = head;
    for (let i = 1; i !== nums.length; i++) {
      const node = new ListNode(nums[i]);
      p.next = node;
      p = node;
    }
    return head;
  }
  static print(head: ListNode | null) {
    if (head === null) {
      return "[]";
    }

    let outputStr = "[";
    let p = head;
    while (p !== null) {
      outputStr += p.val.toString();
      if (p.next !== null) {
        outputStr += ",";
      }
      p = p.next;
    }
    outputStr += "]";
    console.log(outputStr);
  }
}

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
export type TreeNodeOrNull = TreeNode | null;

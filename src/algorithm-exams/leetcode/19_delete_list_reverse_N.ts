/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

import { ListNode } from "./core/interface";

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // p前面的节点 用于删除节点
  let pPrev: ListNode | null = null;
  let p = head;

  // 获取节点后的第n个节点
  const getAfterN = (node: ListNode | null, round: number) => {
    let q = node;
    let r = round;

    while (r > 0) {
      // 不足N个节点
      if (q === null) {
        throw new Error("Not long nodes");
      }
      q = q.next;
      r--;
    }
    return q;
  };

  let q = getAfterN(p, n);
  // 当q为链表尾部时 p为第N个节点
  while (q !== null) {
    pPrev = p;
    p = p.next;
    q = q.next;
  }

  // 删除节点
  if (pPrev === null) {
    // 删除头节点
    return p.next;
  } else {
    // 删除中间节点
    pPrev.next = p.next;
    return head;
  }
}

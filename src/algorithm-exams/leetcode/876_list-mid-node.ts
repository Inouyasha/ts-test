/**
 * 给定一个头结点为 head 的非空单链表，返回链表的中间结点。

  如果有两个中间结点，则返回第二个中间结点。
 * 
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

function middleNode(head: ListNode | null): ListNode | null {
  if (head === null) {
    return head;
  }

  // 两个遍历方式 一个两个一跳 一个一个一跳
  // p n+1 q 2n+1
  let p = head,
    q = head;
  while (p !== null && q !== null) {
    // 一共2n+1个节点
    if (q.next === null) {
      // 返回第n个节点
      return p;
    }
    // 一共2n+2个节点
    if (q.next.next === null) {
      // 返回第n+2个节点
      return p.next;
    }

    // 没有到尽头 继续走
    q = q.next.next;
    p = p.next;
  }
}

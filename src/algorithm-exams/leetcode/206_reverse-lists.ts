import { ListNode } from "./core/interface";

/**
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 *
 * @param {(ListNode | null)} head
 * @return {*}  {(ListNode | null)}
 */
// 非递归
// function reverseList(head: ListNode | null): ListNode | null {
//   if (head === null) {
//     return head;
//   }

//   let newHead = null;
//   let p = head;
//   while (p.next !== null) {
//     const pNext = p.next;
//     p.next = newHead;
//     newHead = p;
//     p = pNext;
//   }
//   p.next = newHead;
//   return p;
// }
// 双指针 本质上无差别 但是比较好理解
function reverseList(head: ListNode | null): ListNode | null {
  if (head === null) {
    return head;
  }

  let p = null,
    q = head;
  while (q !== null) {
    const qNext = q.next;
    q.next = p;
    p = q;
    q = qNext;
  }
  
  return p;
}

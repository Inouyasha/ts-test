import { ListNode } from "./core/interface";

/**
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 *
 * @param {(ListNode | null)} list1
 * @param {(ListNode | null)} list2
 * @return {*}  {(ListNode | null)}
 */
// 递归
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  let p1 = list1,
    p2 = list2;

  if (p1 === null) {
    return p2;
  }
  if (p2 === null) {
    return p1;
  }

  if (p1.val < p2.val) {
    p1.next = mergeTwoLists(p1.next, p2);
    return p1;
  } else {
    p2.next = mergeTwoLists(p1, p2.next);
    return p2;
  }
}

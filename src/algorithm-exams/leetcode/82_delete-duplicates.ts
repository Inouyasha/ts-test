import { ListNode } from "./core/interface";

/**
 * 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。
 *
 * @param {(ListNode | null)} head
 * @return {*}  {(ListNode | null)}
 */
function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (head === null) {
    return null;
  }

  let newHead: ListNode | null = null;

  // p用来遍历 q和r用于记录新的链表中的前一个节点和后一个节点
  let p: ListNode | null = head,
    pre: ListNode | null = null,
    q: ListNode | null = null;

  let curr: number,
    count = 0;

  while (p !== null) {
    // 重置信息记录
    if (p.val !== curr) {
      // 如果之前的节点count=1更新链表
      if (count === 1) {
        // 如果是第一个节点
        if (newHead === null) {
          newHead = pre;
          q = pre;
        } else {
          // 如果不是第一个节点 先更新节点连接信息 再更新节点
          q.next = pre;
          q = pre;
        }
      }

      curr = p.val;
      count = 1;
    } else {
      count++;
    }

    // 记录前一个节点
    pre = p;
    p = p.next;
  }

  // 处理最后一个节点状态
  if (count === 1) {
    // 如果是第一个节点
    if (newHead === null) {
      newHead = pre;
      q = pre;
    } else {
      // 如果不是第一个节点 先更新节点连接信息 再更新节点
      q.next = pre;
    }
  } else {
    if (newHead === null) {
      return null;
    } else {
      // 结束节点
      q.next = null;
    }
  }

  return newHead;
}

ListNode.print(deleteDuplicates(ListNode.generateList([1, 1, 1, 2, 2])));

# 反转链表II —— 反转指定位置的元素

## 题目描述

反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

**说明：**

1 ≤ m ≤ n ≤ 链表长度。

**示例：**

```
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
```

## 解题思路

### 个人AC

```Java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode reverseBetween(ListNode head, int m, int n) {
        // 空链表
        if (null == head) return null;
        
        // cur用于追踪链表遍历的过程，prev和next在反转时使用
        ListNode prev = null, cur = head, next = null;
        // 移动指针到位置m
        while (m > 1) {
            prev = cur;
            cur = cur.next;
            m--;
            n--;
        }
        // partPrev保存局部反转链表在原链表中的前继结点， partTail保存局部反转链表在反转后的尾结点
        ListNode partPrev = prev, partTail = cur;
        while (n > 0) {
            next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
            n--;
        }
        // prev经过上述过程最终指向反转链表的头结点
        if (null == partPrev) { // m == 1，即反转从头结点开始时，返回反转后的头结点作为最终的头结点
            head = prev;
        } else { // 否则，连接未反转链表前半段的尾结点partPrev和反转链表的头结点prev
            partPrev.next = prev;
        }
        // 连接未反转链表后半段的头结点cur和反转链表的尾结点partTail
        partTail.next = cur;
        return head;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解
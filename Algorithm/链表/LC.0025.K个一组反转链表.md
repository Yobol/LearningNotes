# K个一组反转链表

## 题目描述

给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。

k 是一个正整数，它的值小于或等于链表的长度。

如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

**示例：**

```
给定这个链表：1->2->3->4->5

当 k = 2 时，应当返回: 2->1->4->3->5

当 k = 3 时，应当返回: 3->2->1->4->5
```

**说明：**

- 你的算法只能使用常数的额外空间。
- 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

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
    public ListNode reverseKGroup(ListNode head, int k) {
        if (null == head || k <= 1) return head;
        
        // 声明一个伪结点dummy，避免对头结点进行特别讨论
        ListNode dummy = new ListNode(-1);
        // lastGroupTail用来记录已反转部分的尾结点，初始化为dummy
        // nextGroupHead用来记录未反转部分的头结点，初始化为head
        ListNode lastGroupTail = dummy, nextGroupHead = head;
        lastGroupTail.next = nextGroupHead;
        int cnt = 0;
        ListNode cur = head;
        while (cur != null) {
            cnt++;
            // 对待反转部分进行反转，k个元素一组
            if (cnt % k == 0) {
                // 待反转部分的尾结点cur在反转之后会成为局部反转链表的头结点
                // 我们需要将其反转前的next保存下来
                nextGroupHead = cur.next;
                ListNode curGroupTail = reverse(lastGroupTail.next, cur);
                lastGroupTail.next = cur; // 连接已反转部分和该反转部分
                curGroupTail.next = nextGroupHead; // 连接该反转部分和未反转部分
                lastGroupTail = curGroupTail; // Group后移，保证最终可以通过dummy.next获得目标结果
                // 保证顺序遍历
                cur = nextGroupHead;
            } else {
                cur = cur.next;
            }
        }
        return dummy.next;
    }
    
    private ListNode reverse(ListNode head, ListNode tail) {
        ListNode nextGroupHead = tail.next;
        ListNode prev = null, cur = head, next = null;
        while (cur != nextGroupHead) {
            next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
        }
        return head;
    }
}
```

时间复杂度： $O(2 * n)$，遍历k个元素后需要进行反转

### 最优解

同上。
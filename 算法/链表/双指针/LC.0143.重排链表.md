# [重排链表](https://leetcode-cn.com/problems/reorder-list/)

## 题目描述

## 解题思路

### 个人AC

1. 快慢指针找到链表中点（奇数个定位链表中点，偶数个定位到前半段的尾结点）；
2. 反转后半段；
3. 拼接。

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public void reorderList(ListNode head) {
        if (null == head || null == head.next) return;
        
        // 找到链表中点
        ListNode mid = getMid(head);
        ListNode second = mid.next;
        // 断开前后两段的连接
        mid.next = null;
        // 反转链表后半段
        ListNode reversedSecond = reverseList(second);
        // 合并前半段和反转后的后半段
        ListNode p1 = head, p2 = reversedSecond;
        while (p2 != null) {
            ListNode nextP1 = p1.next, nextP2 = p2.next;
            p1.next = p2;
            p2.next = nextP1;
            p1 = nextP1;
            p2 = nextP2;
        }
    }
    
    // 链表元素偶数个，返回前半段的最后一个结点
    private ListNode getMid(ListNode head) {
        ListNode slow = head, fast = head.next; // 如果fast = head，则当链表元素偶数个时，返回后半段的第一个结点
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
    
    private ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head, next = null;
        while (curr != null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            
            curr = next;
        }
        return prev;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。
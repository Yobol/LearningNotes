# [分隔链表](https://leetcode-cn.com/problems/partition-list/)

## 题目描述

给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。

你应当保留两个分区中每个节点的初始相对位置。

**示例：**

```
输入: head = 1->4->3->2->5->2, x = 3
输出: 1->2->2->4->3->5
```

## 解题思路

### 个人AC

不带哑结点（判断逻辑会多出很多，参考下面最优解使用哑结点大幅减少判断逻辑）：

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
    public ListNode partition(ListNode head, int x) {
        ListNode curr = head;
        ListNode lessHead = null, lessPointer = null, largerHead = null, largerPointer = null;
        while (curr != null) {
            if (curr.val < x) {
                if (null == lessHead) {
                    lessHead = curr;
                    lessPointer = lessHead;
                } else {
                    lessPointer.next = curr;
                    lessPointer = curr;
                }
            } else {
                if (null == largerHead) {
                    largerHead = curr;
                    largerPointer = largerHead;
                } else {
                    largerPointer.next = curr;
                    largerPointer = curr;
                }
            }
            curr = curr.next;
        }
        if (null == lessHead) {
            lessHead = largerHead;
        } else {
            lessPointer.next = largerHead;
        }
        // 避免死循环
        if (largerPointer != null) largerPointer.next = null;
        return lessHead;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

使用哑结点：

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
    public ListNode partition(ListNode head, int x) {
        ListNode beforeDummy = new ListNode(-1);
        ListNode before = beforeDummy;
        ListNode afterDummy = new ListNode(-1);
        ListNode after = afterDummy;
        while (head != null) {
            if (head.val < x) {
                before.next = head;
                before = head;
            } else {
                after.next = head;
                after = head;
            }
            head = head.next;
        }
        
        // 避免死循环
        if (after != null) after.next = null;
        before.next = afterDummy.next;
        return beforeDummy.next;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。
# 循环链表

## 题目描述

给定一个链表，判断链表中是否有环。

为了表示给定链表中的环，我们使用整数`pos`来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

**示例 1：**

```
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

![img](assets/circularlinkedlist.png)

**示例 2：**

```
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
```

![img](assets/circularlinkedlist_test2.png)

**示例 3：**

```
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
```

![img](assets/circularlinkedlist_test3.png)

**进阶：**

你能用$O(1)$内存解决此问题吗？

## 解题思路

### 个人AC

使用双指针`slow`和`fast`，开始时这两个指针都指向`head`，且`slow`每次向后移动一个位置，`fast`每次向后移动两个位置，则如果链表有环，则这两个指针必定相遇。

```Java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (null == head) return false;
        
        ListNode slow = head, fast = head.next;
        while (slow != null && fast != null && fast.next != null) {
            if (slow == fast) return true;
            slow = slow.next;
            fast = fast.next.next;
        }
        return false;
    }
}
```

### 最优解

同上。
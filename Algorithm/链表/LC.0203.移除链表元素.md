# [移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

## 题目描述

删除链表中等于给定值`val`的所有节点。

**示例 ：**

```
输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5
```

## 解题思路

### 个人AC

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
    public ListNode removeElements(ListNode head, int val) {
        ListNode dummy = new ListNode(-1);
        ListNode p = dummy;
        while (head != null) {
            ListNode next = head.next;
            if (head.val != val) {
                p.next = head;
                // 断开与下个元素的连接，防止最后一个元素的val等于给定val
                head.next = null;
                p = head;
            }
            head = next;
        }
        return dummy.next;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。
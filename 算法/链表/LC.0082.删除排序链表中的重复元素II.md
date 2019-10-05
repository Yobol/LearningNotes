# [删除排序链表中的重复元素II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

## 题目描述

给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中 *没有重复出现* 的数字。

**示例 1：**

```
输入: 1->2->3->3->4->4->5
输出: 1->2->5
```

**示例 2：**

```
输入: 1->1->1->2->3
输出: 2->3
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
    public ListNode deleteDuplicates(ListNode head) {
        // 声明一个伪结点以便于处理头结点，tail用来追踪返回值的尾结点
        ListNode dummy = new ListNode(-1), tail = dummy;
        ListNode prev = null, cur = head, next = null;
        while (cur != null) {
            next = cur.next;
            // 让当前结点与前面一个结点（如果存在）或后面一个结点（如果存在）进行比较，如果相等则跳过
            // 否则表示结点不重复，加到结果链表上
            if ((prev != null && prev.val == cur.val) || (next != null && next.val == cur.val)) {
                prev = cur;
            } else {
                prev = cur;
                tail.next = cur;
                tail = cur;
            }
            cur = cur.next;
        }
        tail.next = cur;
        return dummy.next;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。


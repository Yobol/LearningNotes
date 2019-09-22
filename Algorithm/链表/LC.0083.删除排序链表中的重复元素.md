# 删除链表中的节点

## 题目描述

给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

**示例 1：**

```
输入: 1->1->2
输出: 1->2
```

**示例 2：**

```
输入: 1->1->2->3->3
输出: 1->2->3
```

## 解题思路

### 个人AC

因为输入的链表已经是排好序的，所以只需要比较当前遍历到的元素和其后的元素：

- 如果两元素相等，则跳过下一个元素；
- 否则遍历下一个元素。

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
    public ListNode deleteDuplicates(ListNode head) {
        ListNode cur = head;
        while (cur != null && cur.next != null) {
            if (cur.val == cur.next.val) {
                cur.next = cur.next.next;
            } else {
                cur = cur.next;
            }
        }
        return head;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。
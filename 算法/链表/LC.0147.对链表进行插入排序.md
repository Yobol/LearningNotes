# 对链表进行插入排序

## 题目描述

对链表进行插入排序。

![img](assets/Insertion-sort-example-300px.gif)

插入排序的动画演示如上。从第一个元素开始，该链表可以被认为已经部分排序（用黑色表示）。
每次迭代时，从输入数据中移除一个元素（用红色表示），并原地将其插入到已排好序的链表中。

**插入排序算法：**

1. 插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。
2. 每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。
3. 重复直到所有输入数据插入完为止。

**示例 1：**

```
输入: 4->2->1->3
输出: 1->2->3->4
```

**示例 2：**

```
输入: -1->5->3->4->0
输出: -1->0->3->4->5
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
    public ListNode insertionSortList(ListNode head) {
        if (null == head || null == head.next) return head;
        // cur指向当前遍历到的节点，dummy伪结点指向已经排好序的链表，unsorted指向未排序的子链表
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode cur = head.next;
        head.next = null;
        ListNode unsorted = null;
        
        while (cur != null) {
            unsorted = cur.next;
            
            // 遍历已排好序的子链表，将当前元素插入
            ListNode prev = dummy, sortedCursor = dummy.next;
            while (sortedCursor != null && cur.val >= sortedCursor.val) {
                prev = sortedCursor;
                sortedCursor = sortedCursor.next;
            }
            prev.next = cur;
            cur.next = sortedCursor;
            
            cur = unsorted;
        }
        return dummy.next;
    }
}
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(1)$。

### 最优解

太优雅了。。。

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
    public ListNode insertionSortList(ListNode head) {
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        // head其实指向 已排序链表 的尾结点！！！
        // head.next 其实指向了 未排序链表 的首结点！！！
        while (head != null && head.next != null) {
            // 如果未排序链表首元素大于已排序链表的尾元素，则只需向后移动指针
            if (head.val <= head.next.val) {
                head = head.next;
                continue;
            }
            
            // 遍历已排好序的子链表，将当前元素插入
            ListNode prevSorted = dummy, curr = head.next;
            // 找到插入结点在已排序链表中的位置
            while (prevSorted.next.val <= curr.val) prevSorted = prevSorted.next;
            head.next = curr.next;
            curr.next = prevSorted.next;
            prevSorted.next = curr;
        }
        return dummy.next;
    }
}
```

**时间复杂度：** 最好$O(n)$, 最坏$O(n^2)$；

**空间复杂度：** $O(1)$。
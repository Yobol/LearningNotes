# [删除链表的倒数第N个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

## 题目描述

给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

**示例：**

给定一个链表: 1->2->3->4->5, 和 n = 2。

当删除了倒数第二个节点后，链表变为 1->2->3->5。

**说明：**

给定的 n 保证是有效的。

**进阶：**

你能尝试使用一趟扫描实现吗？

## 解题思路

### 个人AC

声明两个指针`fast`和`slow`：先让`fast`向后移动`N`个结点，然后再让`slow`与`fast`一起向后移动，直到`fast`移到链表末尾；此时，`slow`指向的元素就是要删除结点的前一个结点。

**Java实现：**

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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode slow = head, fast = head;
        // 首先让快指针向后移动到n个结点
        while (n-- > 0) {
            fast = fast.next;
        }
        // 当要倒数第n个结点，即首结点时
        if (fast == null) return head.next;
        
        // 然后再让快慢指针一起向后移动，直到快指针移到链表末尾（fast.next == null）
        // 此时慢指针指向要删除结点的前一个结点
        while (fast.next != null) {
            slow = slow.next;
            fast = fast.next;
        }
        slow.next = slow.next.next;
        return head;
    }
}
```

**Go实现：**

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func removeNthFromEnd(head *ListNode, n int) *ListNode {
    var fast *ListNode = head
    for ; n > 0; {
        n--
        fast = fast.Next
    }
    if (fast == nil) {
        return head.Next
    }
    var slow *ListNode = head
    for ; fast.Next != nil; {
        fast = fast.Next
        slow = slow.Next
    }
    slow.Next = slow.Next.Next
    return head
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。
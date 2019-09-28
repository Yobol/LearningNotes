# 两两交换链表中的节点

## 题目描述

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

**示例：**

```
给定 1->2->3->4, 你应该返回 2->1->4->3.
```

## 解题思路

### 个人AC

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func swapPairs(head *ListNode) *ListNode {
    var dummy *ListNode = new(ListNode)
    dummy.Next = head
    var prev *ListNode = dummy
    for ; prev.Next != nil && prev.Next.Next != nil {
        var p1, p2 *ListNode = prev.Next, prev.Next.Next
        var next *ListNode = p2.Next
        p2.Next = p1
        p1.Next = next
        prev.Next = p2
        
        prev = p1
    }
    return dummy.Next
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。
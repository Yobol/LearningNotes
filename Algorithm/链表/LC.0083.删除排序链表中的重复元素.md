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

```Go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func deleteDuplicates(head *ListNode) *ListNode {
    var curr *ListNode = head
    for ; curr != nil && curr.Next != nil; {
        if curr.Val == curr.Next.Val {
            curr.Next = curr.Next.Next
            // 进入下一个循环，比较curr与curr.Next的值
        } else {
            curr = curr.Next
        }
    }
    return head
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。
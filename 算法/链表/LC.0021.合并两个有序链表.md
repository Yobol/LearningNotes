# [合并两个有序链表](https://leetcode-cn.com/problems/sort-list/)

## 题目描述

将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

**示例：**

```
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

## 解题思路

### 个人AC

设置一个`dummy node`，用来返回合并后的新链表；同时声明一个`prev node`，用来追踪新链表的尾结点，以便可以更新新结点。

我们重复以下过程，直到 l1 或者 l2 指向了 null ：如果 l1 当前位置的值小于等于 l2 ，我们就把 l1 的值接在 prev 节点的后面同时将 l1 指针往后移一个。否则，我们对 l2 做同样的操作。不管我们将哪一个元素接在了后面，我们都把 prev 向后移一个元素。

在循环终止的时候， l1 和 l2 至多有一个是非空的。由于输入的两个链表都是有序的，所以不管哪个链表是非空的，它包含的所有元素都比前面已经合并链表中的所有元素都要大。这意味着我们只需要简单地将非空链表接在合并链表的后面，并返回合并链表。

```Go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
    var dummy *ListNode = new(ListNode)
    var prev *ListNode = dummy
    for ; l1 != nil && l2 != nil; {
        if l1.Val < l2.Val {
            prev.Next = l1
            l1 = l1.Next
        } else {
            prev.Next = l2
            l2 = l2.Next
        }
        prev = prev.Next
    }
    if l1 == nil {
        prev.Next = l2
    } else {
        prev.Next = l1
    }
    return dummy.Next
}
```

时间复杂度： $O(m + n)$；

空间复杂度： $O(1)$。

## 最优解

同上。
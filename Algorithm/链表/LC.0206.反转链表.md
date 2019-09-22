# 反转链表

## 题目描述

反转一个单链表。

**示例：**

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

## 解题思路

### 个人AC

#### 迭代

假设存在链表`1 → 2 → 3 → Ø`，我们想要把它改成`Ø ← 1 ← 2 ← 3`。

在遍历列表时：

- 需要断开当前结点和下一个结点的连接，需要首先保存下一个结点：`next = cur.next`；
- 然后，将当前节点的 next 指针改为指向前一个元素：`cur.next` = `prev`；
- 在反转之后，更新`prev`为当前结点：`prev = cur`；
- 最后更新`cur`原链表中的下一个结点`next`；

不要忘记在最后返回新的头引用，由`prev`指针指向新的头引用！

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
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, cur = head, next = null;
        while (cur != null) {
            next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
        }
        return prev;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

#### 递归

![1569121306744](assets/1569121306744.png)

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
    public ListNode reverseList(ListNode head) {
        if (null == head || null == head.next) return head;
        // 反转剩余链表，返回反转后的头结点
        ListNode lastOfRest = reverseList(head.next);
        // 反转当前结点和下一个结点
        head.next.next = head;
        head.next = null; // 不然会产生死循环
        // 返回的始终是原链表中的最后一个元素
        return lastOfRest;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(n)$。

### 最优解

同上。
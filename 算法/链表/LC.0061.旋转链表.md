# [旋转链表](https://leetcode-cn.com/problems/rotate-list/)

## 题目描述

给定一个链表，旋转链表，将链表每个节点向右移动 *k* 个位置，其中 *k* 是非负数。

**示例 1：**

```
输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL
解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL
```

**示例 2：**

```
输入: 0->1->2->NULL, k = 4
输出: 2->0->1->NULL
解释:
向右旋转 1 步: 2->0->1->NULL
向右旋转 2 步: 1->2->0->NULL
向右旋转 3 步: 0->1->2->NULL
向右旋转 4 步: 2->0->1->NULL
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
    public ListNode rotateRight(ListNode head, int k) {
        if (null == head || k == 0) return head;
        // 先计算链表长度，并找到链表尾结点
        int n;
        ListNode tail = head;
        for (n = 1; tail.next != null; n++) {
            tail = tail.next;
        }
        k %= n; // 长度为n的链表向右移k个位置等价于向右移k%n个位置
        if (k == 0) return head; // k为链表长度的整数倍时，则意味着链表移动后将和原链表一样，则do nothing
        // 找到后半段的前一个元素：，即找到倒数第k+1个，即正数第n-k个位置 {n - k <== n - (k + 1) + 1}
        k = n - k;
        ListNode first = new ListNode(-1);
        first.next = head;
        cur = first;
        while (k-- > 0) {
            cur = cur.next;
        }
        // cur 此时就指向前半段的最后一个元素，即前半段的前一个元素
        // 断开前半段与后半段的连接，然后让后半段的最后一个元素（即原链表的尾元素）指向前半段的首元素
        // k < n ==> cur != null
        ListNode second = new ListNode(-1);
        second.next = cur.next;
        cur.next = null;
        tail.next = first.next;
        
        return second.next;
    }
}
```

时间复杂度： $O(n)$；

空间复杂度： $O(1)$。

### 最优解

同上。




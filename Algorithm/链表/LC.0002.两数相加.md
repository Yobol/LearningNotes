# [两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

## 题目描述

给出两个 **非空** 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 **逆序** 的方式存储的，并且它们的每个节点只能存储 **一位** 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

**示例：**

```
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```

## 解题思路

### 个人AC

1. 首先需要判空操作保证程序健壮性（好像不加也行）；
2. 然后从头（最低位）开始遍历，并依次考虑以下三种情况：
   1. 两个链表重叠的部分；
   2. 其中一个链表剩余的部分；
   3. 进位。

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
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        if (null == l1) return l2;
        if (null == l2) return l1;
        
        ListNode dummy = new ListNode(-1);
        ListNode prev = dummy;
        ListNode cur = null;
        boolean flag = false; // 进位标识符
        while (l1 != null && l2 != null) {
            int value = l1.val + l2.val + (flag ? 1 : 0);
            cur = new ListNode(value % 10);
            flag = value >= 10;
            prev.next = cur;
            prev = cur;
            
            l1 = l1.next;
            l2 = l2.next;
        }
        while (l1 != null) {
            int value = l1.val + (flag ? 1 : 0);
            cur = new ListNode(value % 10);
            flag = value >= 10;
            prev.next = cur;
            prev = cur;
            
            l1 = l1.next;
        }
        while (l2 != null) {
            int value = l2.val + (flag ? 1 : 0);
            cur = new ListNode(value % 10);
            flag = value >= 10;
            prev.next = cur;
            prev = cur;
            
            l2 = l2.next;
        }
        if (flag) {
            cur = new ListNode(1);
            prev.next = cur;
        }
        return dummy.next;
    }
}
```

虽然AC了，思路也很清晰，但是代码冗余程度高、变量名可读性不高，可以做如下调整。

### 最优解

1. 去除判空操作；
2. 将进位标识符`flag`变为`int`类型并更名为`carry`；
3. 将遍历的三种情况合并到一个`while`循环中。

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
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // 哑结点，用于返回新的链表
        ListNode dummy = new ListNode(-1);
        ListNode cur = dummy;
        int carry = 0; // 进位标识符，1表示进位，0表示不需要进位
        while (l1 != null || l2 != null) {
            int v1 = (l1 != null) ? l1.val : 0;
            int v2 = (l2 != null) ? l2.val : 0;
            int sum = v1 + v2 + carry;
            carry = value / 10;
            cur.next = new ListNode(sum % 10);
            cur = cur.next;
            
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        if (carry > 0) 
            cur.next = new ListNode(1);
        return dummy.next;
    }
}
```








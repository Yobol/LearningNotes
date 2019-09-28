# [两数相加II](https://leetcode-cn.com/problems/add-two-numbers-ii/)

## 题目描述

给定两个非空链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储单个数字。将这两数相加会返回一个新的链表。

你可以假设除了数字 0 之外，这两个数字都不会以零开头。

**进阶：**

如果输入链表不能修改该如何处理？换句话说，你**不能对列表中的节点进行翻转**。

**示例：**

```
输入: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
输出: 7 -> 8 -> 0 -> 7
```

## 解题思路

### 个人AC

先将给定的两个链表转化成两个栈，然后从个位开始计算求和，最后使用头插法构造要返回的链表。

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
        Stack<Integer> s1 = buildStack(l1);
        Stack<Integer> s2 = buildStack(l2);
        
        ListNode dummy = new ListNode(-1);
        int carry = 0;
        while (!s1.isEmpty() || !s2.isEmpty() || carry != 0) {
            int v1 = s1.isEmpty() ? 0 : s1.pop();
            int v2 = s2.isEmpty() ? 0 : s2.pop();
            int sum = v1 + v2 + carry;
            ListNode node = new ListNode(sum % 10);
            carry = sum / 10;
            node.next = dummy.next; // 头插法
            dummy.next = node;
        }
        return dummy.next;
    }
    
    private Stack<Integer> buildStack(ListNode l) {
        Stack<Integer> stack = new Stack<>();
        while (l != null) {
            stack.push(l.val);
            l = l.next;
        }
        return stack;
    }
}
```

**时间复杂度：** $O(m + n + max(m, n))$；

**空间复杂度：** $O(m + n)$。

### 最优解

抛开题目要求，从执行效率上来看，使用**反转链表法**转化为[两数相加](https://leetcode-cn.com/problems/add-two-numbers/)问题，效率最好。

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
        ListNode p = reseverList(l1);
        ListNode q = reseverList(l2);
        ListNode dummmy = new ListNode(-1);
        ListNode cur = dummmy;
        int carry = 0;
        while(p != null || q != null) {
            int x = p == null ? 0 : p.val;
            int y = q == null ? 0 : q.val;
            int sum = x + y + carry;
            cur.next = new ListNode(sum % 10);
            cur = cur.next;
            carry = sum / 10;
            
            if(q != null) q = q.next;
            if(p != null) p = p.next;
        }
        if (carry > 0) {
            cur.next = new ListNode(tmp);
        }
        return reverseList(dummmy.next);
        
    }
    
    private ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head, next = null;
        while(curr != null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            
            curr = next;
        }
        return prev;
    }
    
}
```

时间复杂度： $O(m + n + 2 * max(m, n))$；

空间复杂度： $O(m + n)$。


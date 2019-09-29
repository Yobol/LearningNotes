# [回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)

## 题目描述

请判断一个链表是否为回文链表。

**示例 1：**

```
输入: 1->2
输出: false
```

**示例 2：**

```
输入: 1->2->2->1
输出: true
```

**进阶：**

你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？

## 解题思路

### 个人AC

1. 首先使用快慢指针找到链表中点；
2. 然后反转链表后半部分；
3. 比较链表的前后两部分。

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
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;
        // 首先声明两个指针，慢指针每次后移一位，快指针每次后移两位，找出链表的中点
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        // 奇数长，fast指向最后一个结点，slow指向中间结点；
        // 偶数长，fast指向null，slow指向后半段的第一个结点
        // 反转后半段
        ListNode second = reverseList(slow); // 当反转完成后，slow.next变为null
        // 比较
        while (head != null && second != null) {
            if (head.val != second.val) {
                return false;
            }
            head = head.next;
            second = second.next;
        }
        
        return true;
    }
    
    // 该反转链表方法的好处就是反转完成后，原head.next为null
    private ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head, next = null;
        while (curr != null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            
            curr = next;
        }
        return prev;
    }
}
```

时间复杂度： $O(n / 2 * 3)$；

空间复杂度： $O(1)$。

### 最优解

同上。
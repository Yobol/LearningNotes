# [分隔链表II](https://leetcode-cn.com/problems/split-linked-list-in-parts/)

## 题目描述

给定一个头结点为`root`的链表, 编写一个函数以将链表分隔为`k`个连续的部分。

每部分的长度应该尽可能的相等: 任意两部分的长度差距不能超过`1`，也就是说可能有些部分为`null`。

这`k`个部分应该按照在链表中出现的顺序进行输出，并且排在前面的部分的长度应该大于或等于后面的长度。

返回一个符合上述规则的链表的列表。

举例： `1->2->3->4, k = 5 // 5`结果`[[1], [2], [3], [4], null]`

**示例 1：**

```
输入: 
root = [1, 2, 3], k = 5
输出: [[1],[2],[3],[],[]]
解释:
输入输出各部分都应该是链表，而不是数组。
例如, 输入的结点 root 的 val= 1, root.next.val = 2, root.next.next.val = 3, 且 root.next.next.next = null。
第一个输出 output[0] 是 output[0].val = 1, output[0].next = null。
最后一个元素 output[4] 为 null, 它代表了最后一个部分为空链表。
```

**示例 2：**

```
输入: 
root = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k = 3
输出: [[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]]
解释:
输入被分成了几个连续的部分，并且每部分的长度相差不超过1.前面部分的长度大于等于后面部分的长度。
```

## 解题思路

### 个人AC

1. 首先遍历链表，计算出链表长度`N`；
2. 计算每组至少包含的元素数量`minLen`和多余的链表元素数量`extra`，在保证每小组都包含`minLen`个元素的前提下，将多余的元素从头到尾每组分一个，直到分完（保证分组间大小最多差1）；
3. 当遍历完一个分组后，都需要与其后的元素断开连接，然后再从其后链表的首元素开始遍历。

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
    public ListNode[] splitListToParts(ListNode root, int k) {
        // 计算链表长度
        int N = 0;
        ListNode cur = root;
        while (cur != null) {
            N++;
            cur = cur.next;
        }
        ListNode[] res = new ListNode[k];
        int minLen = N / k; // 每组至少包含的元素个数（为了均匀分布）
        int extra = N % k; // 在保证每组都满足低保的前提下，将多出来的元素从头到尾每组一个，直到分完
        cur = root;
        for (int i = 0; cur != null && i < k; i++) { // 分为k组
            res[i] = cur;
            int curLen = minLen + (extra-- > 0 ? 1 : 0); // 低保之外再分配
            for (int j = 0; j < curLen - 1; j++) {
                cur = cur.next;
            }
            ListNode next = cur.next;
            cur.next = null;
            cur = next;
        }
        return res;
    }
}
```

**时间复杂度：** $O(2 * n)$；

**空间复杂度：** $O(k)$。

### 最优解

同上。
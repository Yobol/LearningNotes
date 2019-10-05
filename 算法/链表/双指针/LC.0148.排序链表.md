# 排序链表

## 题目描述

在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。

**示例 1：**

```
输入: 4->2->1->3
输出: 1->2->3->4
```

**示例 2：**

```
输入: -1->5->3->4->0
输出: -1->0->3->4->5
```

## 解题思路

### 个人AC

归并排序：

1. 先找到链表中点；
2. 然后对前后两端递归调用排序方法；
3. 然后合并排序后的两段。

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
    public ListNode sortList(ListNode head) {
        // 递归终止条件
        if (null == head || null == head.next) return head;
        
        ListNode mid = getMid(head);
        ListNode second = mid.next; // 记录下后半段的头结点
        mid.next = null; // 将链表从中间截断
        return mergeList(sortList(head), sortList(second));
    }
    
    // 找到链表中点：奇数个slow指向链表中点，偶数个slow指向前半段末尾节点
    private ListNode getMid(ListNode head) {
        ListNode slow = head, fast = head.next; // 当 fast初始化为head时，循环结束时，slow将指向后半段首结点
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
    
    // 合并两个有序链表
    private ListNode mergeList(ListNode first, ListNode second) {
        ListNode dummy = new ListNode(-1);
        ListNode prev = dummy;
        while (first != null && second != null) {
            if (first.val < second.val) {
                prev.next = first;
                first = first.next;
            } else {
                prev.next = second;
                second = second.next;
            }
            prev = prev.next;
        }
        if (first != null) prev.next = first;
        if (second != null) prev.next = second;
        return dummy.next;
    }
}
```

**时间复杂度：** $O(nlogn)$；

**空间复杂度：** $O(logn)$。

### 最优解

**参考：** [Sort List （归并排序链表）](https://leetcode-cn.com/problems/sort-list/solution/sort-list-gui-bing-pai-xu-lian-biao-by-jyd/)。

#### 解答一：归并排序（递归法）

- 题目要求时间空间复杂度分别为O(nlogn)和O(1)，根据时间复杂度我们自然想到二分法，从而联想到归并排序；
- 对数组做归并排序的空间复杂度为 O(n)，分别由新开辟数组O(n)和递归函数调用O(logn)组成，而根据链表特性：
  - 数组额外空间：链表可以通过修改引用来更改节点顺序，无需像数组一样开辟额外空间；
  - 递归额外空间：递归调用函数将带来O(logn)的空间复杂度，因此若希望达到O(1)空间复杂度，则不能使用递归。
- 通过递归实现链表归并排序，有以下两个环节：
  - **分割 cut 环节：** 找到当前链表`中点`，并从`中点`将链表断开（以便在下次递归 `cut` 时，链表片段拥有正确边界）；
    - 我们使用`fast`,`slow`快慢双指针法，奇数个节点找到中点，偶数个节点找到中心左边的节点。
    - 找到中点`slow`后，执行`slow.next = None`将链表切断。
    - 递归分割时，输入当前链表左端点`head`和中心节点`slow`的下一个节点`tmp`(因为链表是从`slow`切断的)。
    - cut 递归终止条件： 当`head.next == None`时，说明只有一个节点了，直接返回此节点。
  - **合并 merge 环节：** 将两个排序链表合并，转化为一个排序链表。
    - 双指针法合并，建立辅助ListNode `h` 作为头部。
    - 设置两指针 `left`, `right` 分别指向两链表头部，比较两指针处节点值大小，由小到大加入合并链表头部，指针交替前进，直至添加完两个链表。
    - 返回辅助ListNode `h` 作为头部的下个节点 `h.next`。
    - 时间复杂度 `O(l + r)`，`l, r` 分别代表两个链表长度。
  - 当题目输入的 `head == None` 时，直接返回None。

![Picture2.png](assets/8c47e58b6247676f3ef14e617a4686bc258cc573e36fcf67c1b0712fa7ed1699-Picture2.png)

```python
pythonjava
class Solution:
    def sortList(self, head: ListNode) -> ListNode:
        if not head or not head.next: return head # termination.
        # cut the LinkedList at the mid index.
        slow, fast = head, head.next
        while fast and fast.next:
            fast, slow = fast.next.next, slow.next
        mid, slow.next = slow.next, None # save and cut.
        # recursive for cutting.
        left, right = self.sortList(head), self.sortList(mid)
        # merge `left` and `right` linked list and return it.
        h = res = ListNode(0)
        while left and right:
            if left.val < right.val: h.next, left = left, left.next
            else: h.next, right = right, right.next
            h = h.next
        h.next = left if left else right
        return res.next
```

#### 解答二：归并排序（从底至顶直接合并）

- 对于非递归的归并排序，需要使用迭代的方式替换`cut`环节：
  - 我们知道，`cut`环节本质上是通过二分法得到链表最小节点单元，再通过多轮合并得到排序结果。
  - 每一轮合并`merge`操作针对的单元都有固定长度`intv`，例如：
    - 第一轮合并时`intv = 1`，即将整个链表切分为多个长度为1的单元，并按顺序两两排序合并，合并完成的已排序单元长度为2。
    - 第二轮合并时`intv = 2`，即将整个链表切分为多个长度为2的单元，并按顺序两两排序合并，合并完成已排序单元长度为4。
    - 以此类推，直到单元长度`intv >= 链表长度`，代表已经排序完成。
  - 根据以上推论，我们可以仅根据`intv`计算每个单元边界，并完成链表的每轮排序合并，例如:
    - 当`intv = 1`时，将链表第`1`和第`2`节点排序合并，第`3`和第`4`节点排序合并，……
    - 当`intv = 2`时，将链表第`1-2`和第`3-4`节点排序合并，第`5-6`和第`7-8`节点排序合并，……
    - 当`intv = 4`时，将链表第`1-4`和第`5-8`节点排序合并，第`9-12`和第`13-16`节点排序合并，……
  - 此方法时间复杂度O(nlogn)，空间复杂度O(1)。

![Picture1.png](assets/c1d5347aa56648afdec22372ee0ed13cf4c25347bd2bb9727b09327ce04360c2-Picture1.png)

```python
class Solution:
    def sortList(self, head: ListNode) -> ListNode:
        h, length, intv = head, 0, 1
        while h: h, length = h.next, length + 1
        res = ListNode(0)
        res.next = head
        # merge the list in different intv.
        while intv < length:
            pre, h = res, res.next
            while h:
                # get the two merge head `h1`, `h2`
                h1, i = h, intv
                while i and h: h, i = h.next, i - 1
                if i: break # no need to merge because the `h2` is None.
                h2, i = h, intv
                while i and h: h, i = h.next, i - 1
                c1, c2 = intv, intv - i # the `c2`: length of `h2` can be small than the `intv`.
                # merge the `h1` and `h2`.
                while c1 and c2:
                    if h1.val < h2.val: pre.next, h1, c1 = h1, h1.next, c1 - 1
                    else: pre.next, h2, c2 = h2, h2.next, c2 - 1
                    pre = pre.next
                pre.next = h1 if c1 else h2
                while c1 > 0 or c2 > 0: pre, c1, c2 = pre.next, c1 - 1, c2 - 1
                pre.next = h 
            intv *= 2
        return res.next
```


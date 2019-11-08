# [合并K个排序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

## 题目描述

合并`k`个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。

**示例：**

```
输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6
```

## 解题思路

### 个人AC

**借助优先队列：** 创建一个容量为`k`的最小堆优先队列，将链表的所有头结点都放进去。然后出队最小的，放到已排序链表后，然后将其后结点再放入队列中，重复上述步骤，直到优先队列为空。

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
    public ListNode mergeKLists(ListNode[] lists) {
        ListNode dummy = new ListNode(-1);
        ListNode tail = dummy; // 排序链表尾指针：指向排序链表的最后一个元素
        PriorityQueue<ListNode> heap = new PriorityQueue<>(new Comparator<ListNode>() {
            @Override
            public int compare(ListNode o1, ListNode o2) {
                return o1.val - o2.val;
            }
        });
        
        for (ListNode list : lists) {
            if (list == null) continue;
            heap.add(list); // 将非空结点放入堆中
        }
        
        while (!heap.isEmpty()) {
            // 取出堆顶元素： 对于最小堆元素而言，堆顶元素就是最小值
            ListNode cur = heap.poll();
            // 将下一个元素放到排序链表后，并移动尾指针
            tail.next = cur;
            tail = tail.next;
            // 如果当前元素的下一个元素非空则放入最小堆中
            if (cur.next != null) {
                heap.add(cur.next);
            }
        }
        return dummy.next;
    }
}
```

**时间复杂度：** $O(n log k)$，其中`n`为元素总数，`k`为链表数；

**空间复杂度：** $O(k)$。

### 最优解

**分治法**：

- 将`k`个链表两两配对，并将同一对中的链表合并；
- 第一轮合并后，`k`个链表合并成了$k/2$个链表，然后是$k/4$，$k/8$个链表等等；
- `logk`轮后，最终我们会得到一个有序链表。

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
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        
        return mergeKLists(lists, 0, lists.length - 1);
    }
    
    private ListNode mergeKLists(ListNode[] lists, int left, int right) {
        // 链表数为1时，直接返回
        if (left == right) return lists[left];
        
        int mid = (left + right) / 2;
        return merge2Lists(mergeKLists(lists, left, mid), mergeKLists(lists, mid + 1, right));
    }
    
    private ListNode merge2Lists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(-1);
        ListNode tail = dummy;
        while (l1 != null && l2 != null) {
            if (l1.val < l2.val) {
                tail.next = l1;
                l1 = l1.next;
            } else {
                tail.next = l2;
                l2 = l2.next;
            }
            tail = tail.next;
        }
        if (l1 == null) tail.next = l2;
        if (l2 == null) tail.next = l1;
        return dummy.next;
    } 
}
```

**时间复杂度：** $O(n log k)$，其中`n`为元素总数，`k`为链表数；

**空间复杂度：** $O(1)$。
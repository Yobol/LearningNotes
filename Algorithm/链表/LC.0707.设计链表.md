# [设计链表](https://leetcode-cn.com/problems/design-linked-list/)

## 题目描述

设计链表的实现。您可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：`val`和`next`。`val`是当前节点的值，`next`是指向下一个节点的指针/引用。如果要使用双向链表，则还需要一个属性`prev`以指示链表中的上一个节点。假设链表中的所有节点都是`0-index`的。

在链表类中实现这些功能：

- get(index)：获取链表中第`index`个节点的值。如果索引无效，则返回-1。

- addAtHead(val)：在链表的第一个元素之前添加一个值为`val`的节点。插入后，新节点将成为链表的第一个节点。

- addAtTail(val)：将值为`val`的节点追加到链表的最后一个元素。

- addAtIndex(index,val)：在链表中的第`index`个节点之前添加值为`val`的节点。如果`index`等于链表的长度，则该节

  点将附加到链表的末尾。如果`index`大于链表长度，则不会插入节点。如果`index`小于0，则在头部插入节点。

- deleteAtIndex(index)：如果索引`index`有效，则删除链表中的第`index`个节点。

**示例：**

```java
MyLinkedList linkedList = new MyLinkedList();
linkedList.addAtHead(1);
linkedList.addAtTail(3);
linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
linkedList.get(1);            //返回2
linkedList.deleteAtIndex(1);  //现在链表是1-> 3
linkedList.get(1);            //返回3
```

**提示：**

- 所有val值都在 [1, 1000] 之内。
- 操作次数将在  [1, 1000] 之内。
- 请不要使用内置的 LinkedList 库。

## 解题思路

### 个人AC

```java
class MyLinkedList {
    private int size;
    private ListNode head;
    
    class ListNode {
        int val;
        ListNode next;
        
        ListNode(int val) {
            this(val, null);
        }
        
        ListNode(int val, ListNode next) {
            this.val = val;
            this.next = next;
        }
    }

    /** Initialize your data structure here. */
    public MyLinkedList() {
        size = 0;
        head = new ListNode(-1); // 头指针
    }
    
    /** Get the value of the index-th node in the linked list. If the index is invalid, return -1. */
    public int get(int index) {
        if (index >= this.size || index < 0) {
            return -1;
        }
        return getNodeAtIndex(index).val;
    }
    
    /** Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. */
    public void addAtHead(int val) {
        addAtIndex(0, val);
    }
    
    /** Append a node of value val to the last element of the linked list. */
    public void addAtTail(int val) {
        addAtIndex(this.size, val);
    }
    
    /** Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. */
    public void addAtIndex(int index, int val) {
        if (index > this.size) return;
        
        ListNode node = getNodeBeforeIndex(index);
        ListNode next = node.next;
        node.next = new ListNode(val);
        node.next.next = next;
        this.size++;
    }
    
    /** Delete the index-th node in the linked list, if the index is valid. */
    public void deleteAtIndex(int index) {
        if (index >= this.size || index < 0) return;
        
        ListNode node;
        if (index == this.size - 1) { // 删除最后一个元素
            node = getNodeBeforeIndex(index);
            node.next = null;
        } else {
            node = getNodeAtIndex(index);
            node.val = node.next.val;
            node.next = node.next.next;
        }
        this.size--;
    }
    
    // 前提是index有效
    private ListNode getNodeAtIndex(int index) {
        ListNode curr = this.head.next;
        int i = 0;
        while (i++ != index) {
            curr = curr.next;
        }
        return curr;
    }
    
    // 获取index前一个结点，前提是index有效
    private ListNode getNodeBeforeIndex(int index) {
        index--;
        if (index < 0) {
            return this.head;
        }
        return getNodeAtIndex(index);
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * MyLinkedList obj = new MyLinkedList();
 * int param_1 = obj.get(index);
 * obj.addAtHead(val);
 * obj.addAtTail(val);
 * obj.addAtIndex(index,val);
 * obj.deleteAtIndex(index);
 */
```

### 最优解

同上。
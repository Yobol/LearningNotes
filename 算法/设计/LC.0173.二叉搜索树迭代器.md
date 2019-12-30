# [二叉搜索树迭代器](https://leetcode-cn.com/problems/binary-search-tree-iterator/)

## 题目描述

实现一个二叉搜索树迭代器。你将使用二叉搜索树的根节点初始化迭代器。

调用 `next()` 将返回二叉搜索树中的下一个最小的数。

**示例：**

![img](assets/bst-tree.png)

```
BSTIterator iterator = new BSTIterator(root);
iterator.next();    // 返回 3
iterator.next();    // 返回 7
iterator.hasNext(); // 返回 true
iterator.next();    // 返回 9
iterator.hasNext(); // 返回 true
iterator.next();    // 返回 15
iterator.hasNext(); // 返回 true
iterator.next();    // 返回 20
iterator.hasNext(); // 返回 false
```

**提示：**

- `next()`和`hasNext()`操作的时间复杂度是$O(1)$，并使用$O(h)$内存，其中`h`是树的高度。
- 你可以假设`next()`调用总是有效的，也就是说，当调用`next()`时，BST 中至少存在一个下一个最小的数。

## 解题思路

### 个人AC

迭代实现中序遍历。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class BSTIterator {

    // 所有放入栈中的元素其左孩子都在其上，或者已经被访问过并弹出栈外
    private Stack<TreeNode> stack;
    private TreeNode smallest; // the top of stack

    public BSTIterator(TreeNode root) {
        this.stack = new Stack<>();
        this.smallest = root;
    }
    
    /** @return the next smallest number */
    public int next() {
        int n;
        while (this.smallest != null) {
            this.stack.push(this.smallest);
            this.smallest = this.smallest.left;
        }
        this.smallest = this.stack.pop();
        n = this.smallest.val;
        this.smallest = this.smallest.right;
        return n;
    }
    
    /** @return whether we have a next smallest number */
    public boolean hasNext() {
        return this.smallest != null || !this.stack.isEmpty();
    }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * BSTIterator obj = new BSTIterator(root);
 * int param_1 = obj.next();
 * boolean param_2 = obj.hasNext();
 */
```

**时间复杂度：** `next()` 操作的时间复杂度是 $O(n)$， `hasNext()` 操作的时间复杂度是 $O(1)$。

也可以用队列保存二叉搜索树的中序遍历结果。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class BSTIterator {
    private Queue<Integer> queue;

    public BSTIterator(TreeNode root) {
        this.queue = new LinkedList<>();

        Stack<TreeNode> stack = new Stack<>();
        TreeNode node = root;
        while (node != null || !stack.isEmpty()) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop();
            this.queue.offer(node.val);
            node = node.right;
        }
    }
    
    /** @return the next smallest number */
    public int next() {
        return this.queue.poll();
    }
    
    /** @return whether we have a next smallest number */
    public boolean hasNext() {
        return !this.queue.isEmpty();
    }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * BSTIterator obj = new BSTIterator(root);
 * int param_1 = obj.next();
 * boolean param_2 = obj.hasNext();
 */
```

**时间复杂度：** `next()` 和 `hasNext()` 操作的时间复杂度是 $O(1)$。

### 最优解

同上。
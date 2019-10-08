# [相同的树](https://leetcode-cn.com/problems/same-tree/)

## 题目描述

给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

**示例 1：**

```
输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true
```

示例 2：

```
输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false
```

示例 3：

```
输入:       1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

输出: false
```

## 解题思路

### 个人AC

递归实现：

1. 递归结束条件：结点都为`null`时返回`true`，结点有一个为`null`时返回`false`；
2. 递归链：判断结点是否相等，并递归对子节点做同样的操作。

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
class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}
```

**时间复杂度：** $O(n)$，每个结点遍历一次；

**空间复杂度：** $O(logn)$，递归栈的深度，取决于树的形状。

### 最优解

递归实现，本质是递归实现的二叉树的先序遍历，如上；

迭代实现，本质是迭代实现的二叉树的层次遍历，如下：

- 从根开始，每次迭代将当前结点从双向队列中弹出。然后，进行方法一中的判断：
  - p 和 q 不是 None,
  - p.val 等于 q.val,
- 若以上均满足，则压入子结点。

```java
class Solution {
  public boolean check(TreeNode p, TreeNode q) {
    // p and q are null
    if (p == null && q == null) return true;
    // one of p and q is null
    if (q == null || p == null) return false;
    if (p.val != q.val) return false;
    return true;
  }

  public boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (!check(p, q)) return false;

    // init deques
    ArrayDeque<TreeNode> deqP = new ArrayDeque<>();
    ArrayDeque<TreeNode> deqQ = new ArrayDeque<>();
    deqP.addLast(p);
    deqQ.addLast(q);

    while (!deqP.isEmpty()) {
      p = deqP.removeFirst();
      q = deqQ.removeFirst();

      if (!check(p, q)) return false;
      if (p != null) {
        // in Java nulls are not allowed in Deque
        if (!check(p.left, q.left)) return false;
        if (p.left != null) {
          deqP.addLast(p.left);
          deqQ.addLast(q.left);
        }
        if (!check(p.right, q.right)) return false;
        if (p.right != null) {
          deqP.addLast(p.right);
          deqQ.addLast(q.right);
        }
      }
    }
    return true;
  }
}
```

**时间复杂度：** $O(n)$，每个结点遍历一次；

**空间复杂度：** $O(logn)$，双向队列的长度，取决于树的形状。
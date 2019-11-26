# [对称二叉树]()

## 题目描述

给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树 `[1,2,2,3,4,4,3]` 是对称的。

```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

但是下面这个 `[1,2,2,null,3,null,3]` 则不是镜像对称的:

```
    1
   / \
  2   2
   \   \
   3    3
```

## 解题思路

### 个人AC

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
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return isSymmetric(root.left, root.right);
    }

    private boolean isSymmetric(TreeNode n1, TreeNode n2) {
        if (n1 == null && n2 == null) return true;
        if (n1 == null || n2 == null) return false;

        if (n1.val != n2.val) return false;
        return isSymmetric(n1.left, n2.right) && isSymmetric(n1.right, n2.left);
    }
}
```

**时间复杂度：** $O(n)$，每个结点遍历一次；

**空间复杂度：** $O(logn)$，递归栈的深度，取决于树的形状。

### 最优解

同上。
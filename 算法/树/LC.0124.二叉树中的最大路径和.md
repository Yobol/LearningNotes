# [二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

## 题目描述

给定一个非空二叉树，返回其最大路径和。

本题中，路径被定义为一条从树中任意节点出发，达到任意节点的序列。该路径至少包含一个节点，且不一定经过根节点。

**示例 1：**

```
输入: [1,2,3]

       1
      / \
     2   3

输出: 6
```

**示例 2：**

```
输入: [-10,9,20,null,null,15,7]

   -10
   / \
  9  20
    /  \
   15   7

输出: 42
```

## 解题思路

### 个人AC

### 最优解

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

    public int maxPathSum(TreeNode root) {
        int[] max = new int[1];
        max[0] = Integer.MIN_VALUE;
        maxPathSum(root, max);
        return max[0];
    }

    // 计算某个节点的路径和
    private int maxPathSum(TreeNode root, int[] max) {
        if (root == null) return 0;
        int left = maxPathSum(root.left, max), right = maxPathSum(root.right, max);
        max[0] = Math.max(max[0], root.val + left + right); // root + left + right
        // 如果左右节点子树小于0的话，则不考虑
        return Math.max(0, Math.max(left, right) + root.val); // (root + left) or (root + right)
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(n)$。
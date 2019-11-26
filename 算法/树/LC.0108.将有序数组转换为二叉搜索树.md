# [将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

## 题目描述

将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

**示例：**

```
给定有序数组: [-10,-3,0,5,9],

一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5
```

## 解题思路

### 个人AC

选取数组中间元素作为根节点，将左右子数组构造为左右子树，重复上述过程，直到子数组元素个数为1。

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
    public TreeNode sortedArrayToBST(int[] nums) {
        return nums.length == 0 ? null : sortedArrayToBST(nums, 0, nums.length - 1);
    }

    private TreeNode sortedArrayToBST(int[] nums, int left, int right) {
        TreeNode root = null;
        if (left <= right) {
            int mid = left + (right - left) / 2;
            root = new TreeNode(nums[mid]);
            root.left = sortedArrayToBST(nums, left, mid - 1);
            root.right = sortedArrayToBST(nums, mid + 1, right);
        }
        return root;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(n)$。

### 最优解

同上。
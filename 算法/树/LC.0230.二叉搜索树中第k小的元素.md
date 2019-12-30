# [二叉搜索树中第k小的元素]()

## 题目描述

给定一个二叉搜索树，编写一个函数 kthSmallest 来查找其中第 k 个最小的元素。

**说明：**

你可以假设 k 总是有效的，1 ≤ k ≤ 二叉搜索树元素个数。

**示例 1：**

```
输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 1
```

**示例 2：**

```
输入: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
输出: 3
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
    public int kthSmallest(TreeNode root, int k) {
        int leftSize = size(root.left);
        if (leftSize + 1 == k) {
            return root.val;
        } else if (leftSize + 1 > k) {
            return kthSmallest(root.left, k);
        } else if (leftSize + 1 < k) {
            return kthSmallest(root.right, k - leftSize - 1);
        }
        return -1; // forever impossibly arrive here
    }

    private int size(TreeNode root) {
        if (root == null) return 0;
        int leftSize = size(root.left);
        int rightSize = size(root.right);
        return leftSize + rightSize + 1;
    }
}
```

**时间复杂度：** $O(logn * logn)$，找到指定的元素最坏情况下需要O(logn)，获得指定元素左子树的size最坏情况下需要O(logn)；

**空间复杂度：** $O(logn)$，给定二叉树的深度。

### 最优解

因为给定的是二叉搜索树，而BST的中序遍历结果是一个递增序列，因此可以在中序遍历过程中找到第k小的元素。

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
    int cnt = 0;
    int val = 0;
    public int kthSmallest(TreeNode root, int k) {
        inOrder(root, k);
        return val;
    }

    private void inOrder(TreeNode root, int k) {
        if (root == null) return;
        inOrder(root.left, k);
        if (++cnt == k) {
            val = root.val;
            return;
        }
        inOrder(root.right, k);
    }
}
```

**时间复杂度：** $O(k)$；

**空间复杂度：** $O(logn)$，给定二叉树的深度。


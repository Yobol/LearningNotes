# [二叉树展开为链表](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/)

## 题目描述



## 解题思路

### 个人AC

1. 将左子树放在右子树的位置，并将左子树置空；
2. 将原右子树放在原左子树的最右结点的右结点上；
3. 考虑新的右子树的根节点，重复上述过程，直到新的右子树为null。

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
    public void flatten(TreeNode root) {
        helper(root);
    }

    private TreeNode helper(TreeNode root) {
        if (root == null) return null;

        TreeNode rightestOfLeft = helper(root.left);
        TreeNode right = root.right;
        if (rightestOfLeft != null) {
            root.right = root.left;
            rightestOfLeft.right = right;
            root.left = null;
        }
        flatten(root.right);
        // return the rightest child of the root
        while (root != null && root.right != null) {
            root = root.right;
        }
        return root;
    }
}
```

**时间复杂度：** $O(nlogn)$；

**空间复杂度：** $O(logn)$。

### 最优解

参考： [LeetCode CN 题解](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by--26/)

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
    private TreeNode pre;

    public void flatten(TreeNode root) {
        if (root == null) return ;
        flatten(root.right);
        flatten(root.left);
        root.right = pre;
        root.left = null;
        pre = root;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(logn)$。
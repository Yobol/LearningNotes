# [二叉树的锯齿形层次遍历](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)

## 题目描述

给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

例如：

给定二叉树 [3,9,20,null,null,15,7],

```
    3
   / \
  9  20
    /  \
   15   7
```

返回锯齿形层次遍历如下：

```
[
  [3],
  [20,9],
  [15,7]
]
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
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> outer = new ArrayList<>();
        if (root == null) return outer;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        boolean reverse = false;

        while (!queue.isEmpty()) {
            LinkedList<Integer> inner = new LinkedList<>();

            int n = queue.size();
            for (int i = 0; i < n; i++) {
                TreeNode node = queue.poll();
                if (reverse) {
                    inner.addFirst(node.val);
                } else {
                    inner.addLast(node.val);
                }

                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }

            reverse = !reverse;
            outer.add(inner);
        }
        return outer;
    }
}
```

**时间复杂度：** $O(n)$， `n`为树的节点数量；

**空间复杂度：** $O(n)$。

### 最优解

同上。
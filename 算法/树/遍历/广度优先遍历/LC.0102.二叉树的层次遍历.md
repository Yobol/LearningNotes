# [二叉树的层次遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

## 题目描述

给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。

例如：

给定二叉树: `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回其层次遍历结果：

```
[
  [3],
  [9,20],
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
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> output = new LinkedList<>();

        Queue<TreeNode> queue = new LinkedList<>();
        List<Integer> line = new LinkedList<>();
        // tail指向当前行的最右节点，nextTail指向下一行的最右节点
        TreeNode tail = null, nextTail = null;
        if (root != null) {
            queue.offer(root);
            tail = root;
        }
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            line.add(node.val);
            
            if (node.left != null) {
                queue.offer(node.left);
                nextTail = node.left;
            }
            if (node.right != null) {
                queue.offer(node.right);
                nextTail = node.right;
            }
            
            if (node == tail) {
                output.add(line);
                line = new LinkedList<>();
                tail = nextTail;
            }
        }
        
        return output;
    }
}
```

**时间复杂度：** $O(n)$， `n`为树的节点数量；

**空间复杂度：** $O(n)$。

### 最优解

同上。
# [二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

## 题目描述

给定一个二叉树，返回它的 *前序* 遍历。

 **示例：**

```
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 

输出: [1,2,3]
```

## 解题思路

### 个人AC

#### 迭代法

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
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> output = new LinkedList<>();
        if (root == null) return output;

        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode top = stack.pop();
            output.add(top.val);
            if (top.right != null) stack.push(top.right);
            if (top.left != null) stack.push(top.left);
        }
        return output;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(n)$。

#### 递归法

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
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> output = new LinkedList<>();
        preOrder(root, output);
        return output;
    }

    private void preOrder(TreeNode root, List<Integer> output) {
        if (root == null) return;

        output.add(root.val);
        preOrder(root.left, output);
        preOrder(root.right, output);
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(n)$。

### 最优解

同上。
# [二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

## 题目描述

给定一个二叉树，返回它的*中序* 遍历。

```
输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [1,3,2]
```

**进阶:** 递归算法很简单，你可以通过迭代算法完成吗？

## 解题思路

### 个人AC

#### 递归解法

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
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> list = new LinkedList<>();
        helper(list, root);
        return list;
    }
    
    public void helper(List<Integer> list, TreeNode root) {
        if (root == null) {
            return;
        }
        helper(list, root.left);
        list.add(root.val);
        helper(list, root.right);
    }
}
```

时间复杂度： $O(n)$，每个结点都会遍历一遍；

空间复杂度： $O(log(n))$，树的深度，或者递归栈的深度。

#### 迭代解法（需借助栈）

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
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> list = new LinkedList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode cur = root;
        while (cur != null || !stack.isEmpty()) {
            while (cur != null) {
                stack.push(cur);
                cur = cur.left;
            }
            cur = stack.pop();
            list.add(cur.val);
            cur = cur.right;
        }
        return list;
    }
}
```

**时间复杂度：** $O(n)$，每个结点都会遍历一遍；

**空间复杂度：** $O(log(n))$，栈的深度。

### 最优解

同上。
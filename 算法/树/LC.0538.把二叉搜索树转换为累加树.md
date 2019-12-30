# [把二叉搜索树转换为累加树](https://leetcode-cn.com/problems/convert-bst-to-greater-tree/)

## 题目描述

给定一个二叉搜索树（Binary Search Tree），把它转换成为累加树（Greater Tree)，使得每个节点的值是原来的节点值加上所有大于它的节点值之和。

**例如：**

```
输入: 二叉搜索树:
              5
            /   \
           2     13

输出: 转换为累加树:
             18
            /   \
          20     13
```

## 解题思路

### 个人AC

因为二叉搜索树满足每个结点都比它左子树的所有结点大，比它右子树的所有结点小。

欲将二叉搜索树转换为累加树，可以用递归：

- 从根节点开始，找到其最右结点（没有比该结点更大的结点存在）；
- 转换后，每个结点的值 = 原值 + 右孩子值 +  
  - 如果结点是其父结点的左孩子：父结点值；
  - 如果结点是其父结点的右孩子：以其父结点为左孩子的结点的值； 
- 即按照右 -> 根 -> 左的遍历方式遍历给定的BST。

```java
class Solution {
    private int sum = 0;
    public TreeNode convertBST(TreeNode root) {
        if (root == null) return null;
        convertBST(root.right); // 会最先访问根节点的最右结点
        sum += root.val;
        root.val = sum;
        convertBST(root.left);
        return root;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(n)$。

### 最优解

同上。
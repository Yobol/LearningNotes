# [验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)

## 题目描述

给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

- 节点的左子树只包含小于当前节点的数。
- 节点的右子树只包含大于当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。

**示例 1：**

```
输入:
    2
   / \
  1   3
输出: true
```

示例 2：

```
输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
解释: 输入为: [5,1,4,null,null,3,6]。
     根节点的值为 5 ，但是其右子节点值为 4 。
```

## 解题思路

### 个人AC

#### 递归

##### Java

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
    public boolean isValidBST(TreeNode root) {
        return isValidBST(root, null, null);
    }

    private boolean isValidBST(TreeNode root, Integer lower, Integer upper) {
        if (root == null) return true;

        int val = root.val;
        if (lower != null && lower >= val) return false;
        if (upper != null && val >= upper) return false;

        if (!isValidBST(root.left, lower, val)) return false;
        if (!isValidBST(root.right, val, upper)) return false;

        return true;
    }
}
```

##### Golang

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func isValidBST(root *TreeNode) bool {
    return doHelper(root, math.MinInt64, math.MaxInt64)
}

func doHelper(root *TreeNode, lower int, upper int) bool {
    if root == nil {
        return true
    }
    if lower >= root.Val {
        return false
    }
    if upper <= root.Val {
        return false
    }
    return doHelper(root.Left, lower, root.Val) && doHelper(root.Right, root.Val, upper)
}
```

#### 中序遍历

二叉搜索树中序遍历的结果一定是升序的，所以可以在中序遍历二叉树的时候时实时判断当前结点的值是否大于前一个结点的值。

##### Golang

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func isValidBST(root *TreeNode) bool {
    stack := []*TreeNode{}
    preVal := math.MinInt64 // 用math.MinInt64代表负无穷
    for cur := root; cur != nil || len(stack) > 0; {
        for cur != nil {
            stack = append(stack, cur)
            cur = cur.Left
        }
        cur = stack[len(stack) - 1]
        stack = stack[:len(stack) - 1]
        if cur.Val <= preVal { // 如果当前结点的值小于等于前一个结点的值
            return false
        }
        preVal = cur.Val
        cur = cur.Right
    }
    return true
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(n)$。

### 最优解

同上。
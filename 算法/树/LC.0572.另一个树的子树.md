# [另一个树的子树](https://leetcode-cn.com/problems/subtree-of-another-tree/)

## 题目描述

给定两个非空二叉树 `s` 和 `t`，检验 `s` 中是否包含和 `t` 具有相同结构和节点值的子树。`s` 的一个子树包括 `s` 的一个节点和这个节点的所有子孙。`s` 也可以看做它自身的一棵子树。

**示例 1：**

给定的树 `s`：

```
     3
    / \
   4   5
  / \
 1   2
```

给定的树 `t`：

```
   4 
  / \
 1   2
```

返回 **true**，因为 `t` 与 `s` 的一个子树拥有相同的结构和节点值。

**示例 2：**

给定的树 `s`：

```
     3
    / \
   4   5
  / \
 1   2
    /
   0
```

给定的树 `t`：

```
   4
  / \
 1   2
```

返回 **false**。

## 解题思路

### 个人AC

#### DFS 暴力匹配

##### Golang

枚举 `s`中的每一个结点，判断以这个结点为根节点的树是否和 `t`相等。

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func isSubtree(s *TreeNode, t *TreeNode) bool {
    if s == nil {
        return false
    }
    return isSame(s, t) || isSubtree(s.Left, t) || isSubtree(s.Right, t)
}

func isSame(s *TreeNode, t *TreeNode) bool {
    if s == nil && t == nil {
        return true
    }
    if s == nil || t == nil {
        return false
    }
    return s.Val == t.Val && isSame(s.Left, t.Left) && isSame(s.Right, t.Right)
}
```

**时间复杂度：** $O(N * M)$；

**空间复杂度：** $O(max(logN, logM))$。

### 最优解

#### [DFS 序列上做串匹配](https://leetcode-cn.com/problems/subtree-of-another-tree/solution/ling-yi-ge-shu-de-zi-shu-by-leetcode-solution/)
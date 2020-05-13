# [二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

## 题目描述

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

例如，给定如下二叉树: root = [3,5,1,6,2,0,8,null,null,7,4]。

![img](assets/binarytree.png)

**示例 1：**

```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
```

**示例 2：**

```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
```

**说明:**

- 所有节点的值都是唯一的。
- p、q 为不同节点且均存在于给定的二叉树中。

## 解题思路

### 个人AC

在左右子树中分别查找是否包含p和q：

- 如果“左子树包含p，右子树包含q”或者“左子树包含q，右子树包含p”，那么根节点就是最近公共祖先；
- 如果左子树包含p、q，那么最近公共子树在左子树中；
- 如果右子树包含p、q，那么最近公共子树在右子树中。

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
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        return left == null ? right : (right == null ? left : root);
    }
}
```

##### Golang

```go
/**
 * Definition for TreeNode.
 * type TreeNode struct {
 *     Val int
 *     Left *ListNode
 *     Right *ListNode
 * }
 */
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    // 逻辑运算符的性能不如 分支语句
    // if root == nil || root.Val == p.Val || root.Val == q.Val {
    //     return root
	// }
    if root == nil {
        return nil
    }
    if root.Val == p.Val {
        return root
    }
    if root.Val == q.Val {
        return root
    }

    // 在左右子树中分别查找是否包含p和q：
    // - 如果“左子树包含p，右子树包含q”或者“左子树包含q，右子树包含p”，那么根节点就是最近公共祖先
    // - 如果左子树包含p、q，那么最近公共子树在左子树中
    // - 如果右子树包含p、q，那么最近公共子树在右子树中
    left := lowestCommonAncestor(root.Left, p, q)
    right := lowestCommonAncestor(root.Right, p, q)
    if left != nil && right != nil {
        return root
    } else if left == nil {
        return right
    } else {
        return left
    }
}
```

**时间复杂度：** $O(N)$，其中 `N` 表示二叉树的结点数，所有结点被且仅被访问一次；

**空间复杂度：** $O(N)$，其中 `N` 表示二叉树的结点数，最坏情况下，树退化成一个链表（即树高为 `N`），此时递归栈的深度为 `N`。

#### DFS

##### Golang

1. 从根节点遍历整棵二叉树，用哈希表记录所有结点的父结点指针；
2. 从 `p` 结点开始，根据父结点哈希表依次向上标记已经访问过的结点，直到访问到根节点为止；
3. 再从 `q` 结点开始不断向根节点移动，在移动过程中，遇到的第一个被访问过的结点就是 `p` 和 `q` 的最近公共父结点。

```go
/**
 * Definition for TreeNode.
 * type TreeNode struct {
 *     Val int
 *     Left *ListNode
 *     Right *ListNode
 * }
 */
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    parent := map[int]*TreeNode{}
    visited := map[int]bool{}

    var dfs func(*TreeNode)
    dfs = func(r *TreeNode) {
        if r == nil {
            return
        }
        if r.Left != nil {
            parent[r.Left.Val] = r
            dfs(r.Left)
        }
        if r.Right != nil {
            parent[r.Right.Val] = r
            dfs(r.Right)
        }
    }
    dfs(root)

    for p != nil {
        visited[p.Val] = true
        p = parent[p.Val]
    }
    for q != nil {
        if visited[q.Val] {
            return q
        }
        q = parent[q.Val]
    }

    return nil
}
```



### 最优解

同上。
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

#### Java

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

#### Golang

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func levelOrder(root *TreeNode) [][]int {
    outer := make([][]int, 0)

    queue := make([]*TreeNode, 0)
    var tail, nextTail *TreeNode
    if root != nil {
        queue = append(queue, root)
        tail = root
    }
    line := make([]int, 0)
    for len(queue) > 0 {
        cur := queue[0]
        queue = queue[1:]
        line = append(line, cur.Val)

        if cur.Left != nil {
            queue = append(queue, cur.Left)
            nextTail = cur.Left
        }
        if cur.Right != nil {
            queue = append(queue, cur.Right)
            nextTail = cur.Right
        }

        if cur == tail {
            outer = append(outer, line)
            line = make([]int, 0)
            tail = nextTail
        }
    }
    return outer
}
```

**时间复杂度：** $O(n)$， `n`为树的节点数量；

**空间复杂度：** $O(n)$。

### 最优解

同上。
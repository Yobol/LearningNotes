# [路径总和III](https://leetcode-cn.com/problems/path-sum-iii/)

## 题目描述

给定一个二叉树，它的每个结点都存放着一个整数值。

找出路径和等于给定数值的路径总数。

路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。

**示例：**

```
root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

      10
     /  \
    5   -3
   / \    \
  3   2   11
 / \   \
3  -2   1

返回 3。和等于 8 的路径有:

1.  5 -> 3
2.  5 -> 2 -> 1
3.  -3 -> 11
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

    // 以当前结点作为起点重新计算或者作为中间结点继续计算
    public int pathSum(TreeNode root, int sum) {
        if (root == null) return 0;
        return helper(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
    }

    // 以当前结点作为起点，看是否存在和为sum的路径
    private int helper(TreeNode root, int diff) {
        if (root == null) return 0;

        diff -= root.val;
        return (diff == 0 ? 1 : 0) + helper(root.left, diff) + helper(root.right, diff);
    }
}
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(n^2)$。

### 最优解

```java
class Solution {
    public int pathSum(TreeNode root, int sum) {
        HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
        map.put(0, 1);
        return helper(map, root, sum, 0);
    }
    
    private int helper(HashMap<Integer, Integer> map, TreeNode root, int sum, int pathSum){
        int res = 0;
        if(root == null) return 0;
        
        pathSum += root.val;
        res += map.getOrDefault(pathSum - sum, 0);
        map.put(pathSum, map.getOrDefault(pathSum, 0) + 1);
        res = helper(map, root.left, sum, pathSum) + helper(map, root.right, sum, pathSum) + res;
        map.put(pathSum, map.get(pathSum) - 1);
        return res;
    }
}
```


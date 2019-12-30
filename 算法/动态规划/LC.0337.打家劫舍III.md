# [打家劫舍III]()

## 题目描述

在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。

计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。

**示例 1：**

```
输入: [3,2,3,null,3,null,1]

     3
    / \
   2   3
    \   \ 
     3   1

输出: 7 
解释: 小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.
```

**示例 2：**

```
输入: [3,4,5,1,3,null,1]

     3
    / \
   4   5
  / \   \ 
 1   3   1

输出: 9
解释: 小偷一晚能够盗取的最高金额 = 4 + 5 = 9.
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
    public int rob(TreeNode root) {
        if (root == null) return 0;

        return dfs(root)[0];
    }

    // 返回两个值：
    // 一个是偷该房屋或者不偷该房屋能够盗取的最大金额，
    // 另一个是不偷该房屋能够盗取的金额
    private int[] dfs(TreeNode root) {
        if (root == null) return new int[]{0, 0};

        // left[0]表示盗取左孩子或者不盗取左孩子能够获取的最大金额，left[1]表示不盗取左孩子（房屋）获取的金额
        int[] left = dfs(root.left);
        // right[0]表示盗取右孩子或者不盗取右孩子能够获取的最大金额，right[1]表示不盗取右孩子（房屋）获取的金额
        int[] right = dfs(root.right);

        return new int[]{Math.max(root.val + left[1] + right[1], left[0] + right[0]), left[0] + right[0]};
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(n)$；

### 最优解

参考： [LeetCode CN 题解](https://leetcode-cn.com/problems/house-robber-iii/solution/dong-tai-gui-hua-by-powcai-13/)


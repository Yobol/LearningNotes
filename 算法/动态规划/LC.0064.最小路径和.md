# [最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/)

## 题目描述

给定一个包含非负整数的 *m* x *n* 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

**说明：**每次只能向下或者向右移动一步。

**示例：**

```java
输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。
```

## 解题思路

### 个人AC

```java
class Solution {
    public int minPathSum(int[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) return 0;

        int rows = grid.length, cols = grid[0].length;
        int[][] dp = new int[rows][cols];
        dp[0][0] = grid[0][0];
        for (int i = 1; i < rows; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];
        for (int j = 1; j < cols; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];

        for (int i = 1; i < rows; i++) {
            for (int j = 1; j < cols; j++) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
            }
        }

        return dp[rows - 1][cols - 1];
    }
}
```

**时间复杂度：** $O(m*n)$；

**空间复杂度：** $O(m*n)$。

---

**空间压缩**

```java
class Solution {
    public int minPathSum(int[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) return 0;

        int rows = grid.length, cols = grid[0].length;
        int[] dp = new int[cols];
        dp[0] = grid[0][0];
        // 初始化第一行
        for (int j = 1; j < cols; j++) dp[j] = dp[j - 1] + grid[0][j];
        
        for (int i = 1; i < rows; i++) {
            dp[0] = dp[0] + grid[i][0];
            for (int j = 1; j < cols; j++) {
                dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
            }
        }

        return dp[cols - 1];
    }
}
```

**时间复杂度：** $O(m*n)$；

**空间复杂度：** $O(n)$。

### 最优解

同上。
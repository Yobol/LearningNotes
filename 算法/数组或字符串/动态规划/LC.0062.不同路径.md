# [不同路径](https://leetcode-cn.com/problems/unique-paths/)

## 题目描述

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？

![img](assets/robot_maze.png)

例如，上图是一个7 x 3 的网格。有多少可能的路径？

**说明：***m* 和 *n* 的值均不超过 100。

示例 1：

```
输入: m = 3, n = 2
输出: 3
解释:
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向右 -> 向下
2. 向右 -> 向下 -> 向右
3. 向下 -> 向右 -> 向右
```

示例 2：

```
输入: m = 7, n = 3
输出: 28
```

## 解题思路

### 个人AC

```java
class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n]; // 到达第i行第j列可能的路径
        dp[0][0] = 1;
        // 因为只能向左走（不能向右，即回退），所以第一行都为1
        for (int j = 1; j < n; j++) {
            dp[0][j] = 1;
        }
        // 因为只能向下走（不能向上，即回退），所以第一列都为1
        for (int i = 1; i < m; i++) {
            dp[i][0] = 1;
        }

        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                // 到达第i行第j列可能的路径为从上方往下的路径 + 从左方往右的路径
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
        return dp[m - 1][n - 1];
    }
}
```

**时间复杂度：** $O(m*n)$；

**空间复杂度：** $O(m*n)$。

```java
class Solution {
    public int uniquePaths(int m, int n) {
        int[] cur = new int[n]; // 存储当前行的值
        Arrays.fill(cur, 1);
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                // cur[j-1]为左方的值
                // cur[j]为上方的值
                // cur[j] = cur[j] + cur[j - 1]为当前值
                cur[j] += cur[j - 1];
            }
        }
        return cur[n - 1];
    }
}
```

**时间复杂度：** $O(m*n)$；

**空间复杂度：** $O(n)$。

### 最优解

同上。
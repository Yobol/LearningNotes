# [最大正方形](https://leetcode-cn.com/problems/maximal-square/)

## 题目描述

在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。

**示例：**

```
输入: 

1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0

输出: 4
```



## 解题思路

### 个人AC

```java
class Solution {
    public int maximalSquare(char[][] matrix) {
        if (matrix.length == 0 || matrix[0].length == 0) return 0;

        int row = matrix.length, col = matrix[0].length;
        // dp[i][j]表示以matrix[i - 1][j - 1]为右下角的顶点所能围成正方形的最大边长
        int[][] dp = new int[row + 1][col + 1];
        int maxArea = 0;
        for (int i = 1; i <= row; i++) {
            for (int j = 1; j <= col; j++) {
                if (matrix[i - 1][j - 1] == '1') {
                    int h = Math.min(dp[i - 1][j - 1], dp[i - 1][j]);
                    h = Math.min(h, dp[i][j - 1]);
                    h += 1;
                    maxArea = Math.max(maxArea, h * h);
                    dp[i][j] = h;
                }
            }
        }
        return maxArea;
    }
}
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(n^2)$。

### 最优解

同上。
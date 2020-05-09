# [最大正方形](https://leetcode-cn.com/problems/maximal-square/)

## 题目描述

在一个由 `0` 和 `1` 组成的二维矩阵内，找到只包含 `1` 的最大正方形，并返回其面积。

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

#### 动态规划

声明一个二维数组 `dp`，`dp[i][j]`表示以`(i, j)`为右下角，且只包含 `1` 的正方形的边长最大值。

```go
func maximalSquare(matrix [][]byte) int {
    dp := make([][]int, len(matrix))
    maxSide := 0
    for i := 0; i < len(matrix); i++ {
        dp[i] = make([]int, len(matrix[i]))
        for j := 0; j < len(matrix[i]); j++ {
            dp[i][j] = int(matrix[i][j] - '0')
            if dp[i][j] == 1 {
                maxSide = 1
            }
        }
    }

    for i := 1; i < len(matrix); i++ {
        for j := 1; j < len(matrix[i]); j++ {
            if dp[i][j] == 1 {
                dp[i][j] = min(min(dp[i - 1][j], dp[i][j - 1]), dp[i - 1][j - 1]) + 1
                if dp[i][j] > maxSide {
                    maxSide = dp[i][j]
                }
            }
        }
    }

    return maxSide * maxSide
}

func min(x, y int) int {
    if x > y {
        return y
    } else {
        return x
    }
}
```

**时间复杂度：** $O(M * N)$；

**空间复杂度：** $O(M * N)$。

### 最优解


# [矩阵置零](https://leetcode-cn.com/problems/set-matrix-zeroes/)

## 题目描述

给定一个*m* x *n* 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用**原地**算法**。**

**示例 1：**

```
输入: 
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
输出: 
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
```

**示例 2：**

```
输入: 
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
输出: 
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
```

进阶:

- 一个直接的解决方案是使用$O(mn)$的额外空间，但这并不是一个好的解决方案。
- 一个简单的改进方案是使用$O(m+n)$的额外空间，但这仍然不是最好的解决方案。
- 你能想出一个常数空间的解决方案吗？

## 解题思路

### 个人AC

1. 首先判断第一行和第一列是否包含零，使用`zeroIn1Row`和`zeroIn1Col`保存；
2. 然后，将剩余行和列中的零上浮到第一行和第一列：
   - 首先遍历剩余矩阵，如果`matrix[i][j] == 0`，则将`matrix[0][j]`和`matrix[i][0]`置为0；
   - 再遍历第一行和第一列（除`matrix[0][0]`之外）：
     - 遍历第一行（除`matrix[0][0]`），当遇到`matrix[0][j] == 0`时，将第`j`列都置为0；
     - 遍历第一列（除`matrix[0][0]`），当遇到`matrix[i][0] == 0`时，将第`i`行都置为0。

```java
class Solution {
    public void setZeroes(int[][] matrix) {
        int rows = matrix.length, cols = matrix[0].length;
        if (rows == 0 || cols == 0) return;

        // 首先判断第一行和第一列是否包含零
        boolean zeroIn1Row = false, zeroIn1Col = false;
        for (int j = 0; j < cols; j++) {
            if (matrix[0][j] == 0) zeroIn1Row = true;
        }
        for (int i = 0; i < rows; i++) {
            if (matrix[i][0] == 0) zeroIn1Col = true;
        }

        // 将剩余行和列中的零上浮到首行和首列
        for (int i = 1; i < rows; i++) {
            for (int j = 1; j < cols; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }

        // 首列
        for (int i = 1; i < rows; i++) {
            if (matrix[i][0] != 0) continue;

            for (int j = 1; j < cols; j++) {
                matrix[i][j] = 0;
            }
        }

        // 首行
        for (int j = 1; j < cols; j++) {
            if (matrix[0][j] != 0) continue;

            for (int i = 1; i < rows; i++) {
                matrix[i][j] = 0;
            }
        }

        if (zeroIn1Row) {
            for (int j = 0; j < cols; j++) {
                matrix[0][j] = 0;
            }
        }

        if (zeroIn1Col) {
            for (int i = 0; i < rows; i++) {
                matrix[i][0] = 0;
            }
        }
    }
}
```

**时间复杂度：** $O(m*n)$；

**空间复杂度：** $O(1)$。

### 最优解

**简化版**

```java
class Solution {
    public void setZeroes(int[][] matrix) {
        boolean col0_flag = false;
        int row = matrix.length;
        int col = matrix[0].length;
        for (int i = 0; i < row; i++) {
            if (matrix[i][0] == 0) col0_flag = true;
            for (int j = 1; j < col; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = matrix[0][j] = 0;
                }
            }
        }
        for (int i = row - 1; i >= 0; i--) {
            for (int j = col - 1; j >= 1; j--) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
            if (col0_flag) matrix[i][0] = 0;
        }
    }
}
```

**时间复杂度：** $O(m*n)$；

**空间复杂度：** $O(1)$。
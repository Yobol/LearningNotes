# [搜索二维矩阵](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/)

## 题目描述

编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：

每行的元素从左到右升序排列。
每列的元素从上到下升序排列。

**示例：**

现有矩阵 matrix 如下：

```
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
```

给定 target = `5`，返回 `true`。

给定 target = `20`，返回 `false`。

## 解题思路

### 个人AC

```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int row = matrix.length;
        if (row == 0) return false;
        int col = matrix[0].length;
        if (col == 0) return false;

        // 取右上角或左下角为“中”点
        // 以右上角元素为例：左方元素都比它小，右方元素都比它大，类二分查找
        int i = 0, j = col - 1;
        while (i < row && 0 <= j) {
            if (matrix[i][j] == target) {
                return true;
            } else if (matrix[i][j] > target) {
                j--;
            } else {
                i++;
            }
        } 
        return false;
    }
}
```

**时间复杂度：** $O(m + n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。
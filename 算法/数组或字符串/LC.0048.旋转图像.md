# [旋转图像](https://leetcode-cn.com/problems/rotate-image/)

## 题目描述

给定一个 *n* × *n* 的二维矩阵表示一个图像。

将图像顺时针旋转 90 度。

**说明：**

你必须在**原地**旋转图像，这意味着你需要直接修改输入的二维矩阵。**请不要**使用另一个矩阵来旋转图像。

示例 1：

```
给定 matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

示例 2：

```
给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
], 

原地旋转输入矩阵，使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```

## 解题思路

## 个人AC

分层旋转，`n`阶矩阵最多可分为`(n+1)/2`层。

```java
class Solution {
    public void rotate(int[][] matrix) {
        int ltr = 0, ltc = 0; // 左上角的行坐标和列坐标
        int rbr = matrix.length - 1, rbc = matrix[0].length - 1;
        while (ltr < rbr && ltc < rbc) {
            rotateLayer(matrix, ltr++, ltc++, rbr--, rbc--);
        }
    }
    
    private void rotateLayer(int[][] matrix, int ltr, int ltc, int rbr, int rbc) {
        int times = rbc - ltc; // or rbr - ltr
        for (int i = 0; i < times; i++) {
            int tmp = matrix[ltr][ltc + i];
            matrix[ltr][ltc + i] = matrix[rbr - i][ltc];
            matrix[rbr - i][ltc] = matrix[rbr][rbc - i];
            matrix[rbr][rbc - i] = matrix[ltr + i][rbc];
            matrix[ltr + i][rbc] = tmp;
        }
    }
}
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(1)$。

## 最优解

同上。
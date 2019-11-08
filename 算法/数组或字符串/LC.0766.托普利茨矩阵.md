# [托普利茨矩阵](https://leetcode-cn.com/problems/toeplitz-matrix/)

## 题目描述

如果一个矩阵的每一方向由左上到右下的对角线上具有相同元素，那么这个矩阵是托普利茨矩阵。

给定一个`M x N`的矩阵，当且仅当它是托普利茨矩阵时返回`True`。

**示例1：**

```
输入: 
matrix = [
  [1,2,3,4],
  [5,1,2,3],
  [9,5,1,2]
]
输出: True
解释:
在上述矩阵中, 其对角线为:
"[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]"。
各条对角线上的所有元素均相同, 因此答案是True。
```

**示例2：**

```
输入:
matrix = [
  [1,2],
  [2,2]
]
输出: False
解释: 
对角线"[1, 2]"上的元素不同。
```

**说明：**

- `matrix` 是一个包含整数的二维数组。
- `matrix` 的行数和列数均在`[1, 20]`范围内。
- `matrix[i][j]`包含的整数在`[0, 99]`范围内。

进阶:

1. 如果矩阵存储在磁盘上，并且磁盘内存是有限的，因此一次最多只能将一行矩阵加载到内存中，该怎么办？
2. 如果矩阵太大以至于只能一次将部分行加载到内存中，该怎么办？

## 解题思路

### 个人AC

从第一行开始，将它的前`N-1`位与后一行的后`N-1`位比较，如果不相等则说明对角线上不是相同的元素；

或者从倒数第一行开始，将它的后`N-1`位与前一行的前`N-1`位比较，如果不相等则说明对角线上不是相同的元素。	

```java
class Solution {
    public boolean isToeplitzMatrix(int[][] matrix) {
        if (matrix == null || matrix[0] == null) return false;
        int rowLen = matrix.length;
        if (rowLen == 1) return true;
        int colLen = matrix[0].length;
        for (int row = rowLen - 1; row >= 1; row--) {
            for (int col = 1; col < colLen; col++) {
                if (matrix[row][col] != matrix[row - 1][col - 1]) {
                    return false;
                }
            }
        }
        return true;
    }
}
```

### 最优解

实质上只需要判断每个元素是否和左上角的元素相等。

同上。
# [有序矩阵中第K小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix/)

## 题目描述

给定一个 *n x n* 矩阵，其中每行和每列元素均按升序排序，找到矩阵中第k小的元素。
请注意，它是排序后的第k小元素，而不是第k个元素。

**示例：**

```
matrix = [
   [ 1,  5,  9],
   [10, 11, 13],
   [12, 13, 15]
],
k = 8,

返回 13。
```

## 解题思路

### 个人AC

无。

### 最优解

#### 二分查找

1. 声明两个变量`minInR`和`maxInR`来标识指定矩阵的最小值和最大值，且`minInR`一定是左上角元素，`maxInR`一定是右下角元素；
2. 初始化`minInR`为矩阵左上角元素`minInR = matrix[0][0]`，`maxInR`为矩阵右下角元素`maxInR = matrix[n - 1][n - 1]`，则第`k`小的元素一定在`minInR`和`maxInR`之间；
3. 不断收缩`minInR`和`maxInR`的范围，直到`minInR == maxInR`，以找出目标元素：
   - 声明变量`mid`标识`minInR`和`maxInR`的平均值；
   - 在指定矩阵中寻找**小于等于**`mid`的元素个数`count`；
   - 如果`count < k`，表明第`k`小的元素在右半部分且不包括`mid`，即`minInR = mid + 1, maxInR = maxInR`；
   - 否则`count >= k`，表明第`k`小的元素在左半部分可能包括`mid`，即`minInR = minInR, maxInR = mid`。

```java
class Solution {
    public int kthSmallest(int[][] matrix, int k) {
        int n = matrix.length;
        int minInR = matrix[0][0], maxInR = matrix[n - 1][n - 1];
        while (minInR < maxInR) {
            int mid = (maxInR + minInR) / 2;
            int count = countNotBiggerThan(matrix, mid);
            if (count < k) {
                // 第k小的元素在右半部分，且不包含mid
                minInR = mid + 1;
            } else {
                // 第k小的元素在左半部分，可能包含mid
                maxInR = mid;
            }
        }
        return maxInR;
    }

    private int countNotBiggerThan(int[][] matrix, int mid) {
        int n = matrix.length;
        int count = 0;
        int i = n - 1, j = 0; // 以列为单位，从矩阵左下角开始
        while (i >= 0 && j < n) {
            if (matrix[i][j] <= mid) {
                count += i + 1; // matrix[i][j]及其所在列上方元素也都小于等于mid
                j++;
            } else {
                i--; // 在同一列中往上走
            }
        }
        return count;
    }
}
```




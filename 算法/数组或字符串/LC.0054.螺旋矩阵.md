# [螺旋矩阵](https://leetcode-cn.com/problems/spiral-matrix/)

## 题目描述

给定一个包含 *m* x *n* 个元素的矩阵（*m* 行, *n* 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

**示例 1：**

```
输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
输出: [1,2,3,6,9,8,7,4,5]
```

**示例 2：**

```
输入:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
输出: [1,2,3,4,8,12,11,10,9,5,6,7]
```

## 解题思路

### 个人AC

```java
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> list = new ArrayList<>();
        if (matrix.length == 0 || matrix[0].length == 0) return list;

        int ltr = 0, ltc = 0;
        int rbr = matrix.length - 1, rbc = matrix[0].length - 1;
        while (ltr <= rbr && ltc <= rbc) {
            spiralOrder(list, matrix, ltr++, ltc++, rbr--, rbc--);
        }
        return list;
    }

    private void spiralOrder(List<Integer> list, int[][] matrix, 
                             int ltr, int ltc, int rbr, int rbc) {
        if (ltr == rbr) { // 只有一行
            for (int c = ltc; c <= rbc; c++) {
                list.add(matrix[ltr][c]);
            }
        } else if (ltc == rbc) { // 只有一列
            for (int r = ltr; r <= rbr; r++) {
                list.add(matrix[r][ltc]);
            }
        } else {
            int r = ltr, c = ltc;
            while (c != rbc) {
                list.add(matrix[ltr][c]);
                c++;
            }
            while (r != rbr) {
                list.add(matrix[r][rbc]);
                r++;
            }
            while (c != ltc) {
                list.add(matrix[rbr][c]);
                c--;
            }
            while (r != ltr) {
                list.add(matrix[r][ltc]);
                r--;
            }
        }
    }
}
```

**时间复杂度：** $O(n)$，每个元素仅访问一次；

**空间复杂度：** $O(1)$。

### 最优解

同上。
# [螺旋矩阵](https://leetcode-cn.com/problems/spiral-matrix-ii/)

## 题目描述

给定一个正整数 *n*，生成一个包含 1 到 *n*2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。

**示例：**

```
输入: 3
输出:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]
```

## 解题思路

### 个人AC

```java
class Solution {
    public int[][] generateMatrix(int n) {
        int[][] matrix = new int[n][n];
        int ltr = 0, ltc = 0, rbr = n - 1, rbc = n -1;
        int start = 1;
        // 分层
        while (ltr <= rbr && ltc <= rbc) {
            start = generateMatrix(start, matrix, ltr++, ltc++, rbr--, rbc--);
        }
        return matrix;
    }

    private int generateMatrix(int start, int[][] matrix, int ltr, int ltc, int rbr, int rbc) {
        int r = ltr, c = ltc;
        if (ltr == rbr) { // 只有一行
            while (c <= rbc) matrix[ltr][c++] = start++;
        } else if (ltc == rbc) { // 只有一列
            while (r <= rbr) matrix[r++][ltc] = start++;
        } else {
            // 上
            while (c < rbc) matrix[ltr][c++] = start++;
            // 右
            while (r < rbr) matrix[r++][rbc] = start++;
            // 下
            while (c > ltc) matrix[rbr][c--] = start++;
            // 左
            while (r > ltr) matrix[r--][ltc] = start++;
        }
        return start;
    }
}
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(n^2)$。

### 最优解

```java
class Solution {
    public int[][] generateMatrix(int n) {
        int l = 0, r = n - 1, t = 0, b = n - 1;
        int[][] mat = new int[n][n];
        int num = 1, tar = n * n;
        while(num <= tar){
            for(int i = l; i <= r; i++) mat[t][i] = num++; // left to right.
            t++;
            for(int i = t; i <= b; i++) mat[i][r] = num++; // top to bottom.
            r--;
            for(int i = r; i >= l; i--) mat[b][i] = num++; // right to left.
            b--;
            for(int i = b; i >= t; i--) mat[i][l] = num++; // bottom to top.
            l++;
        }
        return mat;
    }
}

作者：jyd
链接：https://leetcode-cn.com/problems/spiral-matrix-ii/solution/spiral-matrix-ii-mo-ni-fa-she-ding-bian-jie-qing-x/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(n^2)$。
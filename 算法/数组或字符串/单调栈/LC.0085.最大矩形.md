# [最大矩形](https://leetcode-cn.com/problems/maximal-rectangle/)

## 题目描述

给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。

**示例：**

```
输入:
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
输出: 6
```

## 解题思路

### 个人AC

```java
class Solution {
    public int maximalRectangle(char[][] matrix) {
        int rows = matrix.length;
        if (rows == 0) return 0;
        int cols = matrix[0].length;
        int[] heights = new int[cols + 1];
        int maxArea = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                heights[c] = matrix[r][c] == '1' ? heights[c] + 1 : 0; 
            }
            maxArea = Math.max(maxArea, largestRectangleArea(heights));
        }
        return maxArea;
    }

    public int largestRectangleArea(int[] heights) {
        int maxArea = 0;
        Stack<Integer> stack = new Stack<>();
        int p = 0;
        while (p < heights.length) {
            //栈空入栈
            if (stack.isEmpty()) {
                stack.push(p);
                p++;
            } else {
                int top = stack.peek();
                //当前高度大于栈顶，入栈
                if (heights[p] >= heights[top]) {
                    stack.push(p);
                    p++;
                } else {
                    // 保存栈顶高度
                    int height = heights[stack.pop()];
                    // 左边第一个小于栈顶柱子的下标
                    int leftLessMin = stack.isEmpty() ? -1 : stack.peek();
                    // 右边第一个小于栈顶柱子的下标
                    int RightLessMin = p; // 当前柱子
                    // 计算面积
                    int area = (RightLessMin - leftLessMin - 1) * height;
                    maxArea = Math.max(area, maxArea);
                }
            }
        }
        return maxArea;
    }
}
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(n)$。

### 最优解

同上。
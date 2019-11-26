# [柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)

## 题目描述

给定 *n* 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

![img](assets/histogram.png)

以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 `[2,1,5,6,2,3]`。

![img](assets/histogram_area.png)

图中阴影部分为所能勾勒出的最大矩形面积，其面积为 `10` 个单位。

**示例：**

```
输入: [2,1,5,6,2,3]
输出: 10
```

## 解题思路

### 个人AC

- 从头开始遍历数组，对于每个元素，向两边拓展，找到不小于它的左右边界`left`和`right`；

- 然后以该元素`height[i]`为高度，以左右边界差为宽度，计算矩形的面积。

```java
class Solution {
    public int largestRectangleArea(int[] heights) {
        int maxArea = 0;
        for (int i = 0; i < heights.length; i++) {
            int left = i, right = i;
            while (left > 0 && heights[left - 1] >= heights[i]) left--;
            while (right < heights.length - 1 && heights[right + 1] >= heights[i]) right++;
            maxArea = Math.max(maxArea, (right - left + 1) * heights[i]);
        }
        return maxArea;
    }
}
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(1)$。

### 最优解

#### 递增栈

维护一个单调递增的栈。

遍历数组`heights`，求出每个以`height[i]`为高度的最大矩形面积，针对元素`height[i]`找出可以向两边拓展的最大宽度，使用单调递增栈可以使复杂度从$O(n)$降低到$O(1)$。

参考：[LeetCode-cn 该题题解 栈](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-1-7/)

```java
class Solution {
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
                    //保存栈顶高度
                    int height = heights[stack.pop()];
                    //左边第一个小于当前柱子的下标
                    int leftLessMin = stack.isEmpty() ? -1 : stack.peek();
                    //右边第一个小于当前柱子的下标
                    int RightLessMin = p;
                    //计算面积
                    int area = (RightLessMin - leftLessMin - 1) * height;
                    maxArea = Math.max(area, maxArea);
                }
            }
        }
        while (!stack.isEmpty()) {
            //保存栈顶高度
            int height = heights[stack.pop()];
            //左边第一个小于当前柱子的下标
            int leftLessMin = stack.isEmpty() ? -1 : stack.peek();
            //右边没有小于当前高度的柱子，所以赋值为数组的长度便于计算
            int RightLessMin = heights.length;
            int area = (RightLessMin - leftLessMin - 1) * height;
            maxArea = Math.max(area, maxArea);
        }
        return maxArea;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(n)$。
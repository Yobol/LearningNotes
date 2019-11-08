# [盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)

## 题目描述

给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

**说明：**你不能倾斜容器，且 n 的值至少为 2。

![img](assets/question_11.jpg)

图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

**示例：**

```
输入: [1,8,6,2,5,4,8,3,7]
输出: 49
```

## 解题思路

### 个人AC

```java
class Solution {
    public int maxArea(int[] height) {
        if (height == null || height.length <= 1) return 0;
        int n = height.length;
        int maxArea = 0;
        // 使用双指针l和r分别约束容器的左右边界
        // 将l初始化为0， r初始化为n-1
        int l = 0, r = n - 1;
        // 不断收缩容器的左右街边，即向右移动左边界/向移动右边界，直到l == r
        while (l < r) {
            // 计算当前左右边界围成容器的面积，并且和maxArea比较
            maxArea = Math.max(maxArea, area(height, l, r));
            // 收缩高度最小的一边，以尝试获得更大的面积
            if (height[l] < height[r]) { // 如果左边界低于右边界，则向右移动左边界
                l++;
            } else { // 否则向左移动右边界
                r--;
            }
        }
        
        return maxArea;
    }
    
    private int area(int[] height, int l, int r) {
        return Math.min(height[l], height[r]) * (r - l);
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

```java
class Solution {
    public int maxArea(int[] height) {
        if (height == null || height.length <= 1) return 0;
        int n = height.length;
        int maxArea = 0;
        int l = 0, r = n - 1;
        while (l < r) {
            if (height[l] < height[r]) {
            	maxArea = Math.max(maxArea, height[l] * (r - l));
                l++;
            } else {
            	maxArea = Math.max(maxArea, height[r] * (r - l));
                r--;
            }
        }
        
        return maxArea;
    }
}
```

减少一次比较。




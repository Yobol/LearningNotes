# [接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)

## 题目描述

给定 *n* 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 感谢 **Marcos** 贡献此图。

![img](assets/rainwatertrap.png)

**示例：**

```
输入: [0,1,0,2,1,0,1,3,2,1,2,1]
输出: 6
```

## 解题思路

### 个人AC

对数组中的每个数（除了最左和最右）求它和左右两边界中较低的那一边的高度差。

```java
class Solution {
    public int trap(int[] height) {
        int n = height.length;
        if (n <= 2) return 0;
        
        int capacity = 0;
        int[] leftBound = new int[n]; // 第i列所在水坑的左边界
        int[] rightBound = new int[n]; // 第i列所在水坑的右边界
        
        for (int i = 1; i <= n - 2; i++) {
            leftBound[i] = Math.max(leftBound[i - 1], height[i - 1]);
        }
        for (int i = n - 2; i >= 1; i--) {
            rightBound[i] = Math.max(rightBound[i + 1], height[i + 1]);
        }
        for (int i = 1; i <= n - 2; i++) {
            int min = Math.min(leftBound[i], rightBound[i]);
            if (min > height[i]) {
            	capacity += min - height[i];
            }
        }
        
        return capacity;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### [最优解](https://leetcode-cn.com/problems/trapping-rain-water/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-w-8/)

**双指针**

因为`leftBound[i]`只用到一次，并且求`leftBound`数组的`for`循环和最后求`capacity`的`for`循环是一致的，因此可以将动规法中的`leftBound`数组和求其解的`for`循环去掉。

```java
class Solution {
    public int trap(int[] height) {
        int n = height.length;
        if (n <= 2) return 0;
        
        int capacity = 0;
        int leftBound = 0;
        int[] rightBound = new int[n]; // 第i列所在水坑的右边界
        
        for (int i = n - 2; i >= 1; i--) {
            rightBound[i] = Math.max(rightBound[i + 1], height[i + 1]);
        }
        for (int i = 1; i <= n - 2; i++) {
            leftBound = Math.max(leftBound, height[i - 1]);
            int min = Math.min(leftBound, rightBound[i]);
            if (min > height[i]) {
            	capacity += min - height[i];
            }
        }
        
        return capacity;
    }
}
```

因为`rightBound[i]`也只用到一次，但是求`rightBound`数组的`for`循环和最后求`capacity`的`for`循环方向是相反的，因此需要想办法可以将动规法中的`rightBound`数组和求其解的`for`循环去掉。

增加左、右边界指针`left`和`right`：

因为`leftBound = Math.max(leftBound, height[left - 1])`，所以`height[left - 1]`是可能成为`leftBound`的变量，同理`height[right + 1]`是可能成为`rightBound`的变量，只要保证`height[left - 1] < height[right + 1]`，就一定能保证`leftBound < rightBound`。

```java
class Solution {
    public int trap(int[] height) {
        int n = height.length;
        if (n <= 2) return 0;
        
        int capacity = 0;
        int leftBound = 0, rightBound = 0;
        int left = 1, right = n - 2;
        
        for (int i = 1; i <= n - 2; i++) {
            // 从左到右
            if (height[left - 1] < height[right + 1]) {
                leftBound = Math.max(leftBound, height[left - 1]);
                int min = leftBound;
                if (min > height[left]) {
                    capacity += min - height[left];
                }
                left++;
            // 从右向左
            } else {
                rightBound = Math.max(rightBound, height[right + 1]);
                int min = rightBound;
                if (min > height[right]) {
                    capacity += min - height[right];
                }
                right--;
            }
        }
        
        return capacity;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。
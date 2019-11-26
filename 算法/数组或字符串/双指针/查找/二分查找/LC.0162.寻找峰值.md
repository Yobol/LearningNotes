# [寻找峰值](https://leetcode-cn.com/problems/find-peak-element/)

## 题目描述

峰值元素是指其值大于左右相邻值的元素。

给定一个输入数组 nums，其中 nums[i] ≠ nums[i+1]，找到峰值元素并返回其索引。

数组可能包含多个峰值，在这种情况下，返回任何一个峰值所在位置即可。

你可以假设 nums[-1] = nums[n] = -∞。

**示例 1：**

```
输入: nums = [1,2,3,1]
输出: 2
解释: 3 是峰值元素，你的函数应该返回其索引 2。
```

**示例 2：**

```
输入: nums = [1,2,1,3,5,6,4]
输出: 1 或 5 
解释: 你的函数可以返回索引 1，其峰值元素为 2；
     或者返回索引 5， 其峰值元素为 6。
```

**说明：**

你的解法应该是 *O*(*logN*) 时间复杂度的。

## 解题思路

### 个人AC

只要数组中存在一个元素比相邻元素大，就一定能沿着它找到峰值。

```java
class Solution {
    public int findPeakElement(int[] nums) {
        int left = 0, right = nums.length - 1; // [left, right]
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[mid + 1]) { // nums[-1] = -∞，mid或者向左走一定能找到峰值
                right = mid;
            } else { // nums[n] = -∞，mid向右走一定能找到峰值
                left = mid + 1;
            }
        }
        return left;
    }
}
```

**时间复杂度：** $O(logn)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。
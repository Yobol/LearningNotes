# [在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

## 题目描述

给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

你的算法时间复杂度必须是 O(log n) 级别。

如果数组中不存在目标值，返回 [-1, -1]。

示例 1：

```
输入: nums = [5,7,7,8,8,10], target = 8
输出: [3,4]
```

示例 2：

```
输入: nums = [5,7,7,8,8,10], target = 6
输出: [-1,-1]
```

## 解题思路

### 个人AC

```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int[] res = new int[]{-1, -1};
        if (nums == null || nums.length == 0) {
            return res;
        }
        
        res[0] = getLeftBound(nums, target);
        res[1] = getRightBound(nums, target);
        return res;
    }
    
    private int getLeftBound(int[] nums, int target) {
        // [0, nums.length)
        int left = 0, right = nums.length;
        // 因为搜索区间[left, right)左闭右开，而nums.length是越界的
        // 所以使用left < right，因此循环结束条件为left == right
        while (left < right) {
            // 为了防止left + right整型溢出，可以使用left + (right - left) / 2
            int mid = (left + right) / 2;
            if (nums[mid] == target) {
                // 遇到target不是直接返回，而是进一步收缩范围
                // 因为要找的是元素第一次在数组中出现的位置
                // 所以需要收缩右边界，来继续向左寻找
                right = mid;
                // 当nums[mid]被检测后，下一步的搜索区间应该去掉mid
                // 分割成两个子区间：[left, mid) 或 [mid + 1, right)
                // 如下两种情况
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else if (nums[mid] > target) {
                right = mid;
            }
        }
        // target 比所有元素都大
        if (left == nums.length) return -1;
        // target 是否比所有元素都小
        return nums[left] == target ? left : -1;
    }
    
    
    private int getRightBound(int[] nums, int target) {
        // [0, nums.length)
        int left = 0, right = nums.length;
        // 因为搜索区间[left, right)左闭右开，而nums.length是越界的
        // 所以使用left < right，因此循环结束条件为left == right
        while (left < right) {
            // 为了防止left + right整型溢出，可以使用left + (right - left) / 2
            int mid = (left + right) / 2;
            if (nums[mid] == target) {
                // 遇到target不是直接返回，而是进一步收缩范围
                // 因为要找的是元素最后一次在数组中出现的位置
                // 所以需要收缩左边界，来继续向右寻找
                left = mid + 1;
                // 当nums[mid]被检测后，下一步的搜索区间应该去掉mid
                // 分割成两个子区间：[left, mid) 或 [mid + 1, right)
                // 如下两种情况
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else if (nums[mid] > target) {
                right = mid;
            }
        }
        // target 比所有元素都小
        if (left == 0) return -1;
        // target 是否比大所有元素都大
        return nums[left - 1] == target ? left - 1 : -1;
    }
}
```

**时间复杂度：** $O(logn)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。

## 参考

1. [LeetCode题解——二分查找算法细节详解](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/er-fen-cha-zhao-suan-fa-xi-jie-xiang-jie-by-labula/)；
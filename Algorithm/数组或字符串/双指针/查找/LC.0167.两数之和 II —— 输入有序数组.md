# [两数之和 II —— 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)

## 问题描述

给定一个已按照**升序**排列的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值`index1`和`index2`，其中`index1`必须小于`index2`。

**说明：**

返回的下标值`index1`和`index2`不是从零开始的。

你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

**示例：**

```
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2。
```

## 解题思路

### 个人AC

取两个指针`l`和`h`，分别指向数组开头和结尾：

- 当这两个指针指向数的和`sum == target`时，返回对应下标组成的数组：
- 否则如果`sum < target`，令`l++`；
- 否则`sum > target`，令`h--`。

```Java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        if (null == nums) throw new IllegalArgumentException("Input array can't be null!");
        
        int n = nums.length;
        int l = 0, h = n - 1;
        // index1必须小于index2
        while (l < h) {
            int sum = nums[l] + nums[h];
            if (sum == target) {
                return new int[]{l + 1, h + 1};
            } else if (sum > target) {
                h--;
            } else {
                l++;
            }
        }
        return {-1， -1};
    }
}
```

**时间复杂度：** $O(n)$，每个元素最多只被访问一次，共`n`个元素；

**空间复杂度：** $O(1)$，只用了`2`个指针。

### 最优解

同上。
# [最接近的三数之和](https://leetcode-cn.com/problems/3sum-closest/solution/)

## 题目描述

给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

```
例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
```

## 解题思路

### 个人AC

#### 双指针法

- 先对数组进行排序；
- 每次固定一个元素，对右边剩余的元素使用双指针寻找剩余的两个元素。

```java
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        int n = nums.length;
        if (n < 3) throw new IllegalArgumentException("len < 3");
        Arrays.sort(nums);
        int closest = nums[0] + nums[1] + nums[2];
        for (int i = 0; i < n - 2; i++) {
            int l = i + 1, r = n - 1;
            while (l < r) {
                int threeSum = nums[i] + nums[l] + nums[r];
                if (Math.abs(threeSum - target) < Math.abs(closest - target)) {
                    closest = threeSum;
                }
                if (threeSum < target) {
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    l++;
                } else if (threeSum > target) {
                    while (l < r && nums[r - 1] == nums[r]) r--;
                    r--;
                } else {
                    // 如果已经等于target，则直接返回
                    return target;
                }
            }
        }
        return closest;
    }
}
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。
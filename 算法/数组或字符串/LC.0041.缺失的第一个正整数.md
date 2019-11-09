# [缺失的第一个正整数](https://leetcode-cn.com/problems/first-missing-positive/)

## 题目描述

给定一个未排序的整数数组，找出其中没有出现的最小的正整数。

**示例 1:**

```
输入: [1,2,0]
输出: 3
```

**示例 2：**

```
输入: [3,4,-1,1]
输出: 2
```

**示例 3：**

```
输入: [7,8,9,11,12]
输出: 1
```

**说明：**

你的算法的时间复杂度应为O(n)，并且只能使用常数级别的空间。

## 解题思路

### 个人AC

**Bitmap**，首先，当`nums == null || nums.length == 0`时返回1，然后进行两次遍历：

1. 第一次遍历，将值在`[0, n-1]`的`nums[i]`放在`nums[i] - 1`的位置上；
2. 第二次遍历，当`nums[i] != i + 1`时，返回`i + 1`；

如果遍历结束时没有`return`，则`return n + 1`。

```java
class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        int i = 0;
        while (i < n) {
            // nums[nums[i] - 1] != nums[i]是为了跳过重复值，防止死循环
            if (nums[i] > 0 && nums[i] <= n && nums[i] - 1 != i && nums[nums[i] - 1] != nums[i]) {
                swap(nums, i, nums[i] - 1);
            } else {
                i++;
            }
        }
        
        for (i = 0; i < n; i++) {
            if (nums[i] != i + 1) return i + 1;
        }
        return n + 1;
    }
    
    private void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
}
```

时间复杂度： $O(n)$；

空间复杂度： $O(1)$。

### 最优解

同上。
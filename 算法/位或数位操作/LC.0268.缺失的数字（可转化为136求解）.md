# [缺失的数字](https://leetcode-cn.com/problems/missing-number/submissions/)

## 题目描述

给定一个包含 `0, 1, 2, ..., n` 中 *n* 个数的序列，找出 0 .. *n* 中没有出现在序列中的那个数。

**示例 1：**

```
输入: [3,0,1]
输出: 2
```

**示例 2：**

```
输入: [9,6,4,2,3,5,7,0,1]
输出: 8
```

**说明：**

你的算法应具有线性时间复杂度。你能否仅使用额外常数空间来实现？

## 解题思路

### 个人AC

将原数组看作一个`“BitMap”`：

1. 第一次遍历，将`num[i]`放到第`i`个位置上（除了n之外）；
2. 第二次遍历，判断`map`后的数组，各个位置上的元素是否和下标相同，若不对应，则返回该下标（即缺失的数字）。

```java
class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int i = 0;
        while (i < n) {
            if (nums[i] == n || nums[i] == i) {
                i++;
            } else {
                swap(nums, i, nums[i]);
            }
        }
        
        for (i = 0; i < n; i++) {
            if (nums[i] != i) return i;
        }
        return n;
    }
    
    private void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

除了缺失的那个数字，其余数字和序列索引是成对出现的。

```java
class Solution {
    public int missingNumber(int[] nums) {
        int res = 0;
        for (int i = 0; i < nums.length; i++) {
            res ^= i ^ nums[i];
        }
        return res ^ nums.length;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。
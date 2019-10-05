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

你的算法应具有线性时间复杂度。你能否仅使用额外常数空间来实现?

## 解题思路

### 个人AC

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

### 最优解

同上。
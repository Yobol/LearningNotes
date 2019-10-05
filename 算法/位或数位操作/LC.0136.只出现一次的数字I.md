# [只出现一次的数字I](https://leetcode-cn.com/problems/single-number/)

## 题目描述

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

**说明：**

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

**示例 1：**

```
输入: [2,2,1]
输出: 1
```

**示例 2：**

```
输入: [4,1,2,1,2]
输出: 4
```

## 解题思路

### 个人AC

两个数异或的结果为0。

任何数和0异或的结果都为它自身。

```java
class Solution {
    public int singleNumber(int[] nums) {
        int res = nums[0];
        for (int i = 1; i < nums.length; i++) {
            res ^= nums[i];
        }
        return res;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。




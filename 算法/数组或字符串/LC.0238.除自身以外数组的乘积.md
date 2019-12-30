# [除自身以外数组的乘积](https://leetcode-cn.com/problems/product-of-array-except-self/)

## 题目描述

给定长度为 n 的整数数组 nums，其中 n > 1，返回输出数组 output ，其中 output[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。

**示例：**

```
输入: [1,2,3,4]
输出: [24,12,8,6]
```

**说明：** 请不要使用除法，且在 O(n) 时间复杂度内完成此题。

**进阶：**

你可以在常数空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组不被视为额外空间。）

## 解题思路

### 个人AC

从左往左遍历： a0 = 1, a1 = a0, a2 = a0a1, a3 = a0a1a2

从右往左遍历： a3 = 1, a2 = a3, a1 = a3a2, a0 = a3a2a1

累乘： a0 = a1a2a3, a1 = a0a2a3, a2 = a0a1a3, a3 = a0a1a2

```java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int[] output = new int[nums.length];
        int sum = 1;
        for (int i = 0; i < nums.length; i++) {
            output[i] = sum;
            sum *= nums[i];
        }
        sum = 1;
        for (int i = nums.length - 1; i >= 0; i--) {
            output[i] *= sum;
            sum *= nums[i];
        }
        return output;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。
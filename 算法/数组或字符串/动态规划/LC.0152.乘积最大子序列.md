# [乘积最大子序列](https://leetcode-cn.com/problems/maximum-product-subarray/)

## 题目描述

给定一个整数数组 `nums` ，找出一个序列中乘积最大的连续子序列（该序列至少包含一个数）。

**示例 1：**

```
输入: [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。
```

**示例 2：**

```
输入: [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
```

## 解题思路

### 个人AC

遍历给定数组，不断更新最大值`max`。

因为在遍历过程中，`nums[i]`的正负性可能会导致当前获得的值在最大最小之间交替变换，所以可以设置两个变量`iMinPdt`和`iMaxPdt`来表示遍历到`nums[i]`时获得的最小值和最大值。而且，只有当`nums[i] < 0`时，最小值和最大值会相互转换。

```java
class Solution {
    public int maxProduct(int[] nums) {
        if (nums.length == 0) return 0;
        int max = Integer.MIN_VALUE;
        int iMaxPdt = 1, iMinPdt = 1;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] < 0) {
                iMaxPdt = iMaxPdt ^ iMinPdt;
                iMinPdt = iMaxPdt ^ iMinPdt;
                iMaxPdt = iMaxPdt ^ iMinPdt;
            }
            iMaxPdt = Math.max(iMaxPdt * nums[i], nums[i]);
            iMinPdt = Math.min(iMinPdt * nums[i], nums[i]);
            
            max = Math.max(max, iMaxPdt);
        }
        return max;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。
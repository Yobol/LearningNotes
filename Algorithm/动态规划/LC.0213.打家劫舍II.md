# [打家劫舍II](https://leetcode-cn.com/problems/house-robber-ii/)

## 题目描述

你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都围成一圈，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你**在不触动警报装置的情况下，能够偷窃到的最高金额**。

**示例 1：**

```
输入: [2,3,2]
输出: 3
解释: 你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
```

**示例 2：**

```
输入: [1,2,3,1]
输出: 4
解释: 你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

## 解题思路

### 个人AC

该问题在[打家劫舍](https://leetcode-cn.com/problems/house-robber/)的基础上进行了约束，意味着在第一个房子和最后一个房子中只能选择一个偷窃。

```Java
public class Solution {
    public int rob(int[] nums) {
        if (null == nums || nums.length == 0) return 0;
        int n = nums.length;
        if (n == 1) return nums[0];
        return Math.max(rob(nums, 0, n - 1), rob(nums, 1, n));
    }
    
    // [start, end)
    private int rob(int[] nums, int start, int end) {
        int prevMax = 0;
        int currMax = 0;
        for (int i = start; i < end; i++) {
            int tmp = currMax;
            currMax = Math.max(prevMax + nums[i], currMax);
            prevMax = tmp;
        }
        return currMax;
    }
}
```



### 最优解


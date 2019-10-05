# [打家劫舍](https://leetcode-cn.com/problems/house-robber/)

## 题目描述

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警**。

给定一个代表每个房屋存放金额的非负整数数组，计算你**在不触动警报装置的情况下，能够偷窃到的最高金额**。

**示例 1：**

```
输入: [1,2,3,1]
输出: 4
解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

**示例2：**

```
输入: [2,7,9,3,1]
输出: 12
解释: 偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
```

示例3：

```
输入: [2,1,1,2]
输出: 4
解释: 偷窃 1 号房屋 (金额 = 2), 偷窃 4 号房屋 (金额 = 2)。
	 偷窃到的最高金额 = 2 + 2 = 4 。
```

## 解题思路

### 个人AC

因为题目要求计算**能够偷窃到的最大金额**，所以声明一个长度为`n`的数组`dp`，第`i`位上对应偷窃到第 `i + 1`号房屋能够抢到的最大金额。

- 当`i == 0`时，`dp[0] = nums[0]`；
- 当`i == 1`时，`dp[1] = max(nums[0], nums[1])`；
- 当`i == 2`时，有两个选项：
  - 不抢第 3 号房屋，保持现有最大金额；
  - 抢劫第 3 号房屋，将数额与第 1 号房屋相加；
- 当`i >= 2`时，有公式：`dp[i] = max(dp[i - 2] + nums[i], dp[i - 1])`。

```Java
class Solution {
    public int rob(int[] nums) {
        if (null == nums || nums.length == 0) return 0;
        
        int n = nums.length;
        if (n == 1) return nums[0];
        if (n == 2) return Math.max(nums[0], nums[1]);
        int[] dp = new int[n];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        for (int i = 2; i < n; i++) {
            dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
        }
        return dp[n - 1];
    }
}
```

时间复杂度： $O(n)$；

空间复杂度： $O(n)$。

### 最优解

因为每一步只需要前两个最大值，所以只需要两个变量就够了。

```Java
class Solution {
    public int rob(int[] nums) {
        int prevMax = 0;
        int currMax = 0;
        for (int x : nums) {
            int tmp = currMax;
            currMax = Math.max(prevMax + x, currMax);
            prevMax = tmp;
        }
        return currMax;
    }
}
```

时间复杂度： $O(n)$；

空间复杂度： $O(1)$。


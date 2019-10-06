# [买卖股票的最佳时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

## 题目描述

给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。

设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。

**示例 1：**

```
输入: [1,2,3,0,2]
输出: 3 
解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
```

## 解题思路

### 个人AC

### 最优解

```java
class Solution {
    public int maxProfit(int[] prices) {
        if (prices == null || prices.length == 0) return 0;
        // 当i == 0时
        // dp_i_0表示第1天手里未持有股票，收益为0
        // dp_i_1表示第1天手里会持有股票，收益为负的当天股票的价格
        int dp_i_0 = 0, dp_i_1 = -prices[0];
        int dp_pre_0 = 0; // 代表dp[i-2][0]
        for (int i = 1; i < prices.length; i++) {
            int lastUnhold = dp_i_0;
            // dp_i_0表示第i天手里未持有股票，可能前一天就没持有股票，也可能前一天持有股票，但是今天售出了
            dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
            // dp_i_1表示第i天手里会持有股票，可能前一天就已持有股票，
            // 也可能大前天售完股票后，隔了一天冷却时间，今天才能购买
            dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i]);
            dp_pre_0 = lastUnhold;
        }
        return dp_i_0;
    }
}
```

时间复杂度： $O(n)$；

空间复杂度： $O(1)$。
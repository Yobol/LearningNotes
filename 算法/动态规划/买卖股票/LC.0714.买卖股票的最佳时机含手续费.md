# [买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

## 题目描述

给定一个整数数组 prices，其中第 i 个元素代表了第 i 天的股票价格 ；非负整数 fee 代表了交易股票的手续费用。

你可以无限次地完成交易，但是你每次交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。

返回获得利润的最大值。

**示例 1：**

```
输入: prices = [1, 3, 2, 8, 4, 9], fee = 2
输出: 8
解释: 能够达到的最大利润:  
在此处买入 prices[0] = 1
在此处卖出 prices[3] = 8
在此处买入 prices[4] = 4
在此处卖出 prices[5] = 9
总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
```

**注意：**

```
0 < prices.length <= 50000.
0 < prices[i] < 50000.
0 <= fee < 50000.
```

## 解题思路

### 个人AC

### 最优解

```java
class Solution {
    public int maxProfit(int[] prices, int fee) {
        if (prices == null || prices.length == 0) return 0;
        // 当i == 0时
        // dp_i_0表示第1天手里未持有股票，收益为0
        // dp_i_1表示第1天手里会持有股票，收益为负的（当天股票的价格 + fee）
        int dp_i_0 = 0, dp_i_1 = -prices[0] - fee;
        for (int i = 1; i < prices.length; i++) {
            int lastUnhold = dp_i_0;
            // dp_i_0表示第i天手里未持有股票，可能前一天就没持有股票，也可能前一天持有股票，但是今天售出了
            dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
            // dp_i_1表示第i天手里会持有股票，可能前一天就已持有股票，也可能前一天未持有股票，但是今天购买了
            // 每次交易都需要手续费，相当于买入股票的价格升高了
            dp_i_1 = Math.max(dp_i_1, lastUnhold - prices[i] - fee);
        }
        return dp_i_0;
    }
}
```

时间复杂度： $O(n)$；

空间复杂度： $O(1)$。


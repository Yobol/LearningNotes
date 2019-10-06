# [买卖股票的最佳时机IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)

## 题目描述

给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。

注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

**示例 1：**

```
输入: [2,4,1], k = 2
输出: 2
解释: 在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
```

**示例 2：**

```
输入: [3,2,6,5,0,3], k = 2
输出: 7
解释: 在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
     随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。
```

## 解题思路

### 个人AC

### 最优解

```java
class Solution {
    public int maxProfit(int k, int[] prices) {
        if (prices == null || prices.length == 0) return 0;
        if (k > prices.length / 2) {
            return maxProfit(prices);
        }
        
        int[][][] dp = new int[prices.length][k + 1][2];
        for (int i = 0; i < prices.length; i++) {
            for (int rest_k = k; rest_k >= 1; rest_k--) {
                if (i == 0) {
                    dp[i][rest_k][0] = 0;
                    dp[i][rest_k][1] = -prices[i];
                    continue;
                }
                dp[i][rest_k][0] = Math.max(dp[i - 1][rest_k][0], dp[i - 1][rest_k][1] + prices[i]);
                dp[i][rest_k][1] = Math.max(dp[i - 1][rest_k][1], dp[i - 1][rest_k - 1][0] - prices[i]);
            }
        }
        return dp[prices.length - 1][k][0];
    }
    
    private int maxProfit(int[] prices) {
        if (prices == null || prices.length == 0) return 0;
        int dp_i_0 = 0, dp_i_1 = -prices[0];
        for (int i = 1; i < prices.length; i++) {
            int lastUnhold = dp_i_0;
            dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
            dp_i_1 = Math.max(dp_i_1, lastUnhold - prices[i]);
        }
        return dp_i_0;
    }
    
}	
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。
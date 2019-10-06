# [买卖股票的最佳时机II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

## 题目描述

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1：

```
输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```

示例 2：

```
输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
    注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
    因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
```

示例 3：

```
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

## 解题思路

### 个人AC

找到所有的波谷和其后紧邻的波峰，并统计其差值之和。

```java
class Solution {
    public int maxProfit(int[] prices) {
        int maxPft = 0; // 获得的最大利润
        int day = 0;
        while (day < prices.length - 1) {
            int valley = Integer.MAX_VALUE, peak = Integer.MIN_VALUE;
            while (day < prices.length - 1 && prices[day] >= prices[day + 1]) day++;
            valley = prices[day];
            while (day < prices.length - 1 && prices[day] <= prices[day + 1]) day++;
            peak = prices[day];
            
            maxPft += peak - valley;
        }
        return maxPft;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

[状态转移方程]()

```java
class Solution {
    public int maxProfit(int[] prices) {
        if (prices == null || prices.length == 0) return 0;
        // 当i == 0时
        // dp_i_0表示第1天手里未持有股票，收益为0
        // dp_i_1表示第1天手里会持有股票，收益为负的当天股票的价格
        int dp_i_0 = 0, dp_i_1 = -prices[0];
        for (int i = 1; i < prices.length; i++) {
            int lastUnhold = dp_i_0;
            // dp_i_0表示第i天手里未持有股票，可能前一天就没持有股票，也可能前一天持有股票，但是今天售出了
            dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
            // dp_i_1表示第i天手里会持有股票，可能前一天就已持有股票，也可能前一天未持有股票，但是今天购买了
            dp_i_1 = Math.max(dp_i_1, lastUnhold - prices[i]);
        }
        return dp_i_0;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。
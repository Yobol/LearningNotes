# [买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

## 题目描述

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。

注意你不能在买入股票前卖出股票。

**示例 1：**

```
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
```

**示例 2：**

```
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

## 解题思路

### 个人AC

找到最小的波谷和其后最大的波峰。

```java
class Solution {
    public int maxProfit(int[] prices) {
        // 最低的购入价格
        int minPrice = Integer.MAX_VALUE;
        // 最大利润
        int maxPft = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxPft) {
                maxPft = price - minPrice;
            }
        }
        return maxPft;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

#### [状态转移方程](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/solution/yi-ge-tong-yong-fang-fa-tuan-mie-6-dao-gu-piao-wen/)

```java
class Solution {
    public int maxProfit(int[] prices) {
        if (prices == null || prices.length == 0) return 0;
        // 当i == 0时
        // dp_i_0表示第1天手里未持有股票，收益为0
        // dp_i_1表示第1天手里会持有股票，收益为负的当天股票的价格
        int dp_i_0 = 0, dp_i_1 = -prices[0];
        for (int i = 1; i < prices.length; i++) {
            // dp_i_0表示第i天手里未持有股票，可能前一天就没持有股票，也可能前一天持有股票，但是今天售出了
            dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
            // dp_i_1表示第i天手里会持有股票，只可能前一天未持有股票，但是今天购买了；因为只允许交易一次
            dp_i_1 = Math.max(dp_i_1, -prices[i]);
        }
        return dp_i_0;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。
# [解码方法](https://leetcode-cn.com/problems/decode-ways/)

## 题目描述

一条包含字母 `A-Z` 的消息通过以下方式进行了编码：

```
'A' -> 1
'B' -> 2
...
'Z' -> 26
```

给定一个只包含数字的分空字符串，请计算解码方法的总数。

**示例 1：**

```
输入: "12"
输出: 2
解释: 它可以解码为 "AB"（1 2）或者 "L"（12）。
```

**示例 2：**

```
输入: "226"
输出: 3
解释: 它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
```

## 解题思路

### 个人AC

```java
class Solution {
    public int numDecodings(String s) {
        int n = s.length();
        if (n == 0) return 0;

        int[] dp = new int[n + 1];
        if (s.charAt(0) == '0') {
            return 0;
        }
        dp[0] = dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            int cur = s.charAt(i - 1) - '0';
            int last = s.charAt(i - 2) - '0';
            if (cur != 0) { // 当前数字不为0，则说明当前数字能单独构成合法数字
                dp[i] += dp[i - 1];
            }
            if (last == 1 || (last == 2 && cur < 7)) { // 如果当前数字和前一位数字能组成合法数字
                dp[i] += dp[i - 2];
            }
        }
        return dp[n];
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(n)$。

### 最优解

同上。


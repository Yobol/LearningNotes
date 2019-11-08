# [通配符匹配](https://leetcode-cn.com/problems/wildcard-matching/)

## 题目描述

给定一个字符串 (`s`) 和一个字符模式 (`p`) ，实现一个支持 `'?'` 和 `'*'` 的通配符匹配。

```
'?' 可以匹配任何单个字符。
'*' 可以匹配任意字符串（包括空字符串）。
```

两个字符串**完全匹配**才算匹配成功。

**说明：**



**示例 1：**

```
输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
```

**示例 2：**

```
输入:
s = "aa"
p = "*"
输出: true
解释: '*' 可以匹配任意字符串。
```

**示例 3：**

```
输入:
s = "cb"
p = "?a"
输出: false
解释: '?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。
```

**示例 4：**

```
输入:
s = "adceb"
p = "*a*b"
输出: true
解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".
```

**示例 5：**

```
输入:
s = "acdcb"
p = "a*c?b"
输入: false
```

## 解题思路

### 个人AC

该题和[LeetCode第10题 正则表达式匹配]()相似，采用动态规划 + “备忘录”思想求解。

```java
class Solution {
    public boolean isMatch(String s, String p) {
        int sLen = s.length(), pLen = p.length();
        // 动态规划思想可以用于解决满足最优子结构特征的问题，即当前状态依赖于前面子问题的状态
        // 数组dp[i][j]用来表示s中前i个字符和p中前j个字符的匹配结果
        // dp下标与s，p下标相差1，即dp[i][j]表示当前应该匹配s[i-1]和p[j-1]
        boolean[][] dp = new boolean[sLen + 1][pLen + 1];
        dp[0][0] = true; // 当s和p都为空串时，匹配成功
        
        // 这里令i=0，是因为存在匹配串s为空，而模式串p不为空的情况
        for (int j = 1; j <= pLen; j++) {
            if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 1];
        }
        
        // 遍历匹配串s和模式串p
        for (int i = 1; i <= sLen; i++) {
            // 这里从j=1开始，是因为若匹配串s不为空，而模式串为空，则必然不匹配，dp[i][0] = false；而初始值就是false
            for (int j = 1; j <= pLen; j++) {
                // 当前状态dp[i][j]由当前模式字符p[j-1]决定
                if (s.charAt(i - 1) == p.charAt(j - 1) || p.charAt(j - 1) == '?') {
                    // 如果当前模式字符不为*
                    // 当s[i-1] == p[j-1] 或 p[j-1] == '?'，即p[j-1] != '*'时，
                    // dp[i][j] 将由 dp[i-1][j-1]决定
                    dp[i][j] = dp[i - 1][j - 1];
                } else if (p.charAt(j - 1) == '*') {
                    // 如果当前模式字符为*
                    // 因为*可以匹配任意字符串（也可匹配空串）
                    // 如果*匹配空串，则dp[i][j] 将由 dp[i][j-1]决定
                    // 如果*匹配s[i-2]，则dp[i][j] 将由 dp[i-1][j]决定
                    dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
                }
            }
        }
        return dp[sLen][pLen];
    }
}
```

**时间复杂度：** $O(m * n)$，m为匹配串s的长度，n为模式串p的长度；

**空间复杂度：** $O(m * n)$。

### 最优解

同上。


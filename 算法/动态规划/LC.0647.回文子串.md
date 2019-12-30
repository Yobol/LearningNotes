# [回文子串](https://leetcode-cn.com/problems/palindromic-substrings/)

## 题目描述

给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。

具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被计为是不同的子串。

**示例 1：**

```
输入: "abc"
输出: 3
解释: 三个回文子串: "a", "b", "c".
```

**示例 2：**

```
输入: "aaa"
输出: 6
说明: 6个回文子串: "a", "a", "a", "aa", "aa", "aaa".
```

**注意：**

1. 输入的字符串长度不会超过1000。

## 解题思路

1. **状态**： `dp[i][j]`表示`substring[i, j]`是否为回文子串；

2. **状态转换**：

   如果`substring[i+1, j-1]`是回文子串，则`dp[i][j] = substring[i, i] == substring[j, j] `，否则为`false`，即`dp[i][j] = (i + 1 >= j - 1 || d[i + 1][j - 1]) ? chs[i] == chs[j] : false; `

```java
class Solution {
    public int countSubstrings(String s) {
        int cnt = 0;
        char[] chs = s.toCharArray();
        boolean[][] dp = new boolean[chs.length][chs.length];
        for (int i = 0; i < chs.length; i++) {
            dp[i][i] = true;
            cnt++;
        }

        for (int i = chs.length - 2; i >= 0; i--) {
            for (int j = chs.length - 1; j >= i + 1; j--) {
                dp[i][j] = (i + 1 >= j - 1 || dp[i + 1][j - 1]) ? chs[i] == chs[j] : false;
                if (dp[i][j]) cnt++;
            }
        }
        
        return cnt;
    }
}
```

合并两个for循环，精简代码如下：

```java
class Solution {
    public int countSubstrings(String s) {
        int cnt = 0;
        char[] chs = s.toCharArray();
        boolean[][] dp = new boolean[chs.length][chs.length];

        for (int i = chs.length - 1; i >= 0; i--) {
            for (int j = i; j < chs.length; j++) {
                if (chs[i] == chs[j] && (i + 1 > j - 1 || dp[i + 1][j - 1])) {
                    dp[i][j] = true;
                    cnt++;
                }
            }
        }
        
        return cnt;
    }
}
```

**时间复杂度：** $O(n ^ 2)$；

**空间复杂度：** $O(n^2)$。

### 最优解

#### 中心扩展法

```java
class Solution {
    public int countSubstrings(String s) {
        int cnt = 0;

        for (int i = 0; i < s.length(); i++) {
            // 单中心
            cnt += countCenterOn(s, i, i);
            // 双中心
            cnt += countCenterOn(s, i, i + 1);
        }
        
        return cnt;
    }
    
    // c1 == c2时为单中心
    // c1 != c2时为双中心
    private int countCenterOn(String s, int c1, int c2) {
        int count = 0;
        while (c1 >= 0 && c2 < s.length() && s.charAt(c1--) == s.charAt(c2++)) {
            count++;
        }
        return count;
    }
}
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(1)$。
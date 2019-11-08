# [最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

## 题目描述

给定一个字符串 `s`，找到 `s` 中最长的回文子串。你可以假设 `s` 的最大长度为 1000。

**示例 1：**

```
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
```

**示例 2：**

```
输入: "cbbd"
输出: "bb"
```

## 解题思路

### 个人AC

暴力法。

```java
class Solution {
    public String longestPalindrome(String s) {
        if (s == null) {
            throw new IllegalArgumentException("Input array can't null");
        }
        
        int n = s.length();
        if (n <= 1) {
            return s;
        }
        String lsp = ""; // Longest Sub Palindrome
        for (int i = 1; i < n; i++) {
            for (int j = 0; j <= i; j++) {
                String sub = s.substring(j, i + 1);
                // 验证每个字符串需要O(n)的复杂度
                if (isPalindrome(sub) && sub.length() > lsp.length()) {
                    lsp = sub;
                    break;
                }
            }
        }
        return lsp;
    }
    
    private boolean isPalindrome(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s.charAt(i++) != s.charAt(j--)) {
                return false;
            }
        }
        return true;
    }
}
```

**时间复杂度：** $O(n^3)$；

**空间复杂度：** $O(1)$。

![1572674018725](assets/1572674018725.png)

有执行结果可见，代码效率太低，需要进一步优化代码逻辑！

### 最优解

#### 动态规划

应当避免在验证子字符串是否回文时进行不必要的重复计算。

```java
...
```

#### 中心扩展

可以观察到回文串中心的两侧互为镜像，因此判断字符串是否回文可以从它的中心向外展开，并且只有`2n - 1`个这样的中心。

为什么是`2n - 1`个中心，而不是`n`个中心？

因为当字符串包含偶数个元素时，其中心将处在两字母之间。

```java
class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() == 0) return "";
        int start = 0, end = 0; // 记录最长回文子串在原字符串中的起始位置
        for (int i = 0; i < s.length(); i++) {
            // 倘若回文串为ABA类型
            int len1 = expandAroundCenter(s, i, i);
            // 倘若回文串为ABBA类型
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            // 更新最长回文子串的起始位置
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }
    
    // 从字符串中心分别向两边扩展，返回能找到的最长的回文串的长度
    private int expandAroundCenter(String s, int left, int right) {
        int L = left, R = right;
        while (L >= 0 && R < s.length() && s.charAt(L) == s.charAt(R)) {
            L--;
            R++;
        }
        return R - L - 1;
    }
}
```

**时间复杂度：** $O(n^2)$，围绕中心向两边扩展只需要$O(n)$的复杂度；

**空间复杂度：** $O(1)$。


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

```java
class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() == 0) return "";
        int n = s.length();
        String longestSubstring = s.substring(0, 1);
        for (int start = 0; start < n; start++) {
            for (int end = 0; end < n; end++) {
                if (isPalindrome(s, start, end) && end - start + 1 > longestSubstring.length()) {
                    longestSubstring = s.substring(start, end + 1);
                }
            }
        }
        return longestSubstring;
    }
    
    private boolean isPalindrome(String s, int start, int end) {
        while (start < end) {
            if (s.charAt(start) != s.charAt(end)) {
                return false;
            }
            start++;
            end--;
        }
        return true;
    }
}
```

**时间复杂度：** $O(n^3)$；

**空间复杂度：** $O(1)$。

### [最优解](https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zui-chang-hui-wen-zi-chuan-by-leetcode/)

#### [动态规划](https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zhong-xin-kuo-san-dong-tai-gui-hua-by-liweiwei1419/)

作者：liweiwei1419
链接：https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zhong-xin-kuo-san-dong-tai-gui-hua-by-liweiwei1419/
来源：力扣（LeetCode）

---

解决这类 “最优子结构” 问题，可以考虑使用 “动态规划”：

1、定义 “状态”；
2、找到 “状态转移方程”。

**记号说明：** 下文中，使用记号 s[l, r] 表示原始字符串的一个子串，l、r 分别是区间的左右边界的索引值，使用左闭、右闭区间表示左右边界可以取到。举个例子，当 s = 'babad' 时，s[0, 1] = 'ba' ，s[2, 4] = 'bad'。

1、定义 “状态”，这里 “状态”数组是二维数组。

`dp[l][r]` 表示子串 s[l, r]（包括区间左右端点）是否构成回文串，是一个二维布尔型数组。即如果子串 s[l, r] 是回文串，那么`dp[l][r] `= true。

2、找到 “状态转移方程”。

首先，我们很清楚一个事实：

> 1、当子串只包含 1 个字符，它一定是回文子串；
>
> 2、当子串包含 2 个以上字符的时候：如果 s[l, r] 是一个回文串，例如 “abccba”，那么这个回文串两边各往里面收缩一个字符（如果可以的话）的子串 s[l + 1, r - 1] 也一定是回文串，即：如果`dp[l][r]` == true 成立，一定有`dp[l + 1][r - 1]` = true 成立。

根据这一点，我们可以知道，给出一个子串 s[l, r] ，如果 s[l] != s[r]，那么这个子串就一定不是回文串。如果 s[l] == s[r] 成立，就接着判断 s[l + 1] 与 s[r - 1]，这很像中心扩散法的逆方法。

事实上，当 s[l] == s[r] 成立的时候，`dp[l][r]`的值由`dp[l + 1][r - l]`决定，这一点也不难思考：当左右边界字符串相等的时候，整个字符串是否是回文就完全由“原字符串去掉左右边界”的子串是否回文决定。但是这里还需要再多考虑一点点：“原字符串去掉左右边界”的子串的边界情况。

>1、当原字符串的元素个数为 3 个的时候，如果左右边界相等，那么去掉它们以后，只剩下 1 个字符，它一定是回文串，故原字符串也一定是回文串；
>
>2、当原字符串的元素个数为 2 个的时候，如果左右边界相等，那么去掉它们以后，只剩下 0 个字符，显然原字符串也一定是回文串。

把上面两点归纳一下，只要 s[l + 1, r - 1] 至少包含两个元素，就有必要继续做判断，否则直接根据左右边界是否相等就能得到原字符串的回文性。而“s[l + 1, r - 1] 至少包含两个元素”等价于 l + 1 < r - 1，整理得 l - r < -2，或者 r - l > 2。

综上，如果一个字符串的左右边界相等，以下二者之一成立即可：
1、去掉左右边界以后的字符串不构成区间，即“ s[l + 1, r - 1] 至少包含两个元素”的反面，即 l - r >= -2，或者 r - l <= 2；
2、去掉左右边界以后的字符串是回文串，具体说，它的回文性决定了原字符串的回文性。

于是整理成“状态转移方程”：

`dp[l, r] = (s[l] == s[r] and (l - r >= -2 or dp[l + 1, r - 1]))`

或

`dp[l, r] = (s[l] == s[r] and (r - l <= 2 or dp[l + 1, r - 1]))`

**编码实现细节：**因为要构成子串 l 一定小于等于 r ，我们只关心 “状态”数组“上三角”的那部分取值。理解上面的“状态转移方程”中的 (r - l <= 2 or dp[l + 1, r - 1]) 这部分是关键，因为 or 是短路运算，因此，如果收缩以后不构成区间，那么就没有必要看继续 dp[l + 1, r - 1] 的取值。

读者可以思考一下：为什么在动态规划的算法中，不用考虑回文串长度的奇偶性呢。想一想，答案就在状态转移方程里面。

具体编码细节在代码的注释中已经体现。

```java
public class Solution {

    public String longestPalindrome(String s) {
        if (s == null) return "";
        int n = s.length();
        if (n <= 1) return s;
        
        String longestPalindrome = s.substring(0, 1);
        boolean[][] dp = new boolean[n][n]; // 记录各子串是否是回文子串
        // abcdedcba
        //   l   r
        // 如果 dp[l, r] = true 那么 dp[l + 1, r - 1] 也一定为 true
        // 关键在这里：[l + 1, r - 1] 一定至少有 2 个元素才有判断的必要
        // 因为如果 [l + 1, r - 1] 只有一个元素，不用判断，一定是回文串
        // 如果 [l + 1, r - 1] 表示的区间为空，不用判断，也一定是回文串
        // [l + 1, r - 1] 一定至少有 2 个元素 等价于 l + 1 < r - 1，即 r - l >  2

        // 写代码的时候这样写：如果 [l + 1, r - 1]  的元素小于等于 1 个，即 r - l <=  2 ，就不用做判断了

        // 因为只有 1 个字符的情况在最开始做了判断
        // 左边界一定要比右边界小，因此右边界从 1 开始
        for (int r = 1; r < n; r++) {
            for (int l = 0; l < r; l++) {
                // 区间应该慢慢放大
                // 状态转移方程：如果头尾字符相等并且中间也是回文
                // 在头尾字符相等的前提下，如果收缩以后不构成区间（最多只有 1 个元素），直接返回 true 即可
                // 否则要继续看收缩以后的区间的回文性
                if (s.charAt(l) == s.charAt(r) && (r - l <= 2 || dp[l + 1][r - 1])) {
                    dp[l][r] = true;
                    if (r - l + 1 > longestPalindrome.length()) {
                        longestPalindrome = s.substring(l, r + 1);
                    }
                }
            }
        }
        return longestPalindrome;
    }
}
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(n^2)$，需要一个二维数组来表示各子串是否是回文子串。

#### [中心扩展算法](https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zui-chang-hui-wen-zi-chuan-by-leetcode/)

事实上，只需使用恒定的空间，我们就可以在$O(n^2)$的时间内解决这个问题。

我们观察到回文中心的两侧互为镜像。因此，回文可以从它的中心展开，并且只有`2n - 1`个这样的中心。

你可能会问，为什么会是`2n - 1`个，而不是`n`个中心？原因在于所含字母数为偶数的回文的中心可以处于两字母之间（例如 “abba” 的中心在两个 ‘b’ 之间）。

```java
public String longestPalindrome(String s) {
    if (s == null || s.length() < 1) return "";
    int start = 0, end = 0; // [start, end]
    for (int i = 0; i < s.length(); i++) {
        int len1 = expandAroundCenter(s, i, i); // 字母数为奇数，babad
        int len2 = expandAroundCenter(s, i, i + 1);  // 字母数为偶数，babbad
        int len = Math.max(len1, len2);
        if (len > end - start) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    return s.substring(start, end + 1); // +1 是因为 substring 区间为 [l, r)
}

private int expandAroundCenter(String s, int left, int right) {
    int L = left, R = right;
    while (L >= 0 && R < s.length() && s.charAt(L) == s.charAt(R)) {
        L--;
        R++;
    }
    return R - L - 1;
}
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(1)$。
# [反转字符串](https://leetcode-cn.com/problems/reverse-string-ii/)

## 题目描述

给定一个字符串和一个整数 k，你需要对从字符串开头算起的每个 2k 个字符的前k个字符进行反转。如果剩余少于 k 个字符，则将剩余的所有全部反转。如果有小于 2k 但大于或等于 k 个字符，则反转前 k 个字符，并将剩余的字符保持原样。

**示例 ：**

```
输入: s = "abcdefg", k = 2
输出: "bacdfeg"
```

**要求:**

1. 该字符串只包含小写的英文字母。
2. 给定字符串的长度和 k 在[1, 10000]范围内。

## 解题思路

### 个人AC

```java
class Solution {
    public String reverseStr(String s, int k) {
        char[] chs = s.toCharArray();
        for (int l = 0; l < chs.length; l += 2 * k) {
            int r = Math.min(l + k - 1, chs.length - 1);
            while (l < r) {
                chs[l] ^= chs[r];
                chs[r] ^= chs[l];
                chs[l++] ^= chs[r--];
            }
        }
        return new String(chs);
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(n)$。

### 最优解

同上。
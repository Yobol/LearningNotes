# 验证回文字符串 II

## 题目描述

给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。

**示例 1：**

```
输入: "aba"
输出: True
```

**示例 2：**

```
输入: "abca"
输出: True
解释: 你可以删除c字符。
```

`注：字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。`

## 解题思路

### 个人AC

思考上有漏洞，未AC。

使用双指针，从两头向中间逼近，直到`l > r`：

- 如果`s[l] == s[r]`，令`l++; r--;`；
- 否则，详见代码。

```Java
class Solution {
    public boolean validPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        boolean deleted = false;
        while (l <= r) {
            if (s.charAt(l) != s.charAt(r)) {
                if (deleted) return false;
                if (s.charAt(l) != s.charAt(r - 1) && s.charAt(l + 1) != s.charAt(r)) {
                    return false;
                } else if (s.charAt(l) != s.charAt(r - 1)) {
                    l++;
                } else if (s.charAt(l + 1) != s.charAt(r)) {
                    r--;
                } else {
                    // 这里不应该简单的令 l++
                    // 而是应该考虑两种情况！！
                    l++;
                }
                deleted = true;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

### 最优解（贪心）

使用双指针`l`和`r`，从两头向中间逼近，直到`l >= r`：

- 如果`l`指向的字符和`r`指向的字符相同，即`s[l] == s[r]`，则其内部字符是否为回文（`s[l+1], ..., s[r-1]`）将唯一地确定整个字符串是否为回文，此时令`l++; r--`即可；
- 如果`l`指向的字符和`r`指向的字符不同，即`s[l] != s[r]`，则需要判断`s[l], ..., s[r-1]`和`s[l+1], ..., s[r]`中是否存在一个为回文子串：

```Java
class Solution {
    public boolean validPalindrome(String s) {
        for (int l = 0, r = s.length() - 1; l < r; l++, r--) {
            if (s.charAt(l) != s.charAt(r)) {
                return isPalindrome(s, l, r - 1) || isPalindrome(s, l + 1, r);
            }
        }
        return true;
    }
    
    private boolean isPalindrome(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) return false;
        }
        return true;
    }
}
```

**时间复杂度：** $O(n)$，其中`n`是字符串的长度，检查两个子串是否为回文串所用时间都是$O(N)$；
**空间复杂度：** $O(1)$，仅使用了指针。
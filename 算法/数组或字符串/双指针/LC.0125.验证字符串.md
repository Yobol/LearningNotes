# [验证字符串](https://leetcode-cn.com/problems/valid-palindrome/)

## 题目描述

给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

**说明：**本题中，我们将空字符串定义为有效的回文串。

**示例 1：**

```
输入: "A man, a plan, a canal: Panama"
输出: true
```

**示例 2：**

```
输入: "race a car"
输出: false
```

## 解题思路

### 个人AC

```java
class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !(isLetter(s.charAt(left)) || isNumber(s.charAt(left)))) left++;
            while (left < right && !(isLetter(s.charAt(right)) || isNumber(s.charAt(right)))) right--;

            char cL = s.charAt(left++), cR = s.charAt(right--);
            if (isNumber(cL) && isNumber(cR)) {
                if (cL != cR) return false;
                else continue;
            }

            if (isLetter(cL) && isLetter(cR)) {
                cL = toLowerCase(cL);
                cR = toLowerCase(cR);
                if (cL != cR) return false;
                else continue;
            }

            if ((isLetter(cL) && isNumber(cR)) || (isNumber(cL) && isLetter(cR))) return false;
        }
        return true;
    }

    private boolean isLetter(char c) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
    }

    private char toLowerCase(char c) {
        if (c >= 'A' && c <= 'Z') c = (char)(c + 32);
        return c;
    }

    private boolean isNumber(char c) {
        return c >= '0' && c <= '9';
    }
}
```

### 最优解

同上。
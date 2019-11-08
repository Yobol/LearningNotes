# [最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/)

## 题目描述

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 `""`。

**示例 1：**

```
输入: ["flower","flow","flight"]
输出: "fl"
```

**示例 2：**

```
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

**说明：**

所有输入只包含小写字母`a-z`。

## 解题思路

### 个人AC

依次遍历每个字符串的第`i`个位置，当：

- `i`超过某个字符串长度；
- 某个字符串的第`i`个字符其他字符串不等

时，返回公共前缀，否则将这第`i`字符放入公共前缀中，`i++`。

```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        StringBuilder prefix = new StringBuilder("");
        if (strs == null || strs.length == 0) {
            return prefix.toString();
        }
        int i = 0;
        while (true) {
            char last = '\u0000';
            for (String str : strs) {
                if (i == str.length()) {
                    return prefix.toString();
                } else if (last == '\u0000') {
                    last = str.charAt(i);
                } else if (last != str.charAt(i)) {
                    return prefix.toString();
                }
            }
            prefix.append(strs[0].charAt(i));
            i++;
        }
    }
}
```

时间复杂度： $O(s)$，s为字符串数组中所有字符数之和；

空间复杂度： $O(1)$。

### 最优解

同上。
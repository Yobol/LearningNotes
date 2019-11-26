# [字符串中的第一个唯一字符](https://leetcode-cn.com/problems/first-unique-character-in-a-string/)

## 题目描述

给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

**示例：**

```
s = "leetcode"
返回 0.

s = "loveleetcode",
返回 2.
```

**注意事项：**您可以假定该字符串只包含小写字母。

## 解题思路

### 个人AC

```java
class Solution {
    public int firstUniqChar(String s) {
        int[] cells = new int[26];
        int n = s.length();
        for (int i = 0; i < n; i++) {
            char c = s.charAt(i);
            cells[c - 'a']++;
        }

        for (int i = 0; i < n; i++) {
            char c = s.charAt(i);
            if (cells[c - 'a'] == 1) return i;
        }
        return -1;
    }
}
```

时间复杂度： $O(n)$；

空间复杂度： $O(1)$。

### 最优解

同上。


# [最后一个单词的长度](https://leetcode-cn.com/problems/length-of-last-word/)

## 题目描述

给定一个仅包含大小写字母和空格 ' ' 的字符串，返回其最后一个单词的长度。

如果不存在最后一个单词，请返回 0 。

说明：一个单词是指由字母组成，但不包含任何空格的字符串。

**示例 1：**

```
输入: "Hello World"
输出: 5
```

**示例 2：**

```
输入: "Hello "
输出: 5
```

## 解题思路

### 个人AC

```java
class Solution {
    public int lengthOfLastWord(String s) {
        int len = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            char c = s.charAt(i);
            if (len == 0 && c == ' ') {
                continue;
            } else if (c == ' ') {
                break;
            } else {
                len++;
            }
        }
        return len;
    }
}
```

### 最优解

同上。
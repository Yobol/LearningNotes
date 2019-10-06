# [转换成小写字母](https://leetcode-cn.com/problems/to-lower-case/)

## 题目描述

实现函数 ToLowerCase()，该函数接收一个字符串参数 str，并将该字符串中的大写字母转换成小写字母，之后返回新的字符串。

**示例 1：**

```
输入: "Hello"
输出: "hello"
```

**示例 2：**

```
输入: "here"
输出: "here"
```

**示例 3：**

```
输入: "LOVELY"
输出: "lovely"
```

## 解题思路

### 个人AC

```java
class Solution {
    public String toLowerCase(String str) {
        if (str == null) return null;
        char[] chs = str.toCharArray();
        for (int i = 0; i < chs.length; i++) {
            char ch = chs[i];
            if ('A' <= ch && ch <= 'Z') {
                chs[i] = (char)(ch + 32);
            }
        }
        return new String(chs);
    }
}
```

### 最优解

同上。
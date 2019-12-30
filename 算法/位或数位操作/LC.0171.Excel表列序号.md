# [Excel表列序号](https://leetcode-cn.com/problems/excel-sheet-column-number/)

## 题目描述

给定一个Excel表格中的列名称，返回其相应的列序号。

例如，

```
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28 
...
```

**示例 1：**

```
输入: "A"
输出: 1
```

**示例 2：**

```
输入: "AB"
输出: 28
```

**示例 3：**

```
输入: "ZY"
输出: 701
```

## 解题思路

### 个人AC

```java
class Solution {
    public int titleToNumber(String s) {
        int index = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            index = index * 26 + (c - 'A' + 1);
        }
        return index;
    }
}
```

### 最优解

同上。
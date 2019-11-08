# [字符串转整数](https://leetcode-cn.com/problems/string-to-integer-atoi/)

## 题目描述

请你来实现一个 atoi 函数，使其能将字符串转换成整数。

首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。

当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。

该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。

注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0。

**说明：**

假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [$−2^{31}$,  $2^{31} − 1$]。如果数值超过这个范围，请返回  INT_MAX ($2^{31} - 1$) 或 INT_MIN ($−2^{31}$) 。

## 解题思路

### 个人AC（直接跳过，看下面的最优解）

```java
class Solution {
    public int myAtoi(String str) {
        if (str == null) return 0;
        
        int res = 0;
        boolean isNegative = false;
        boolean hasSignal = false; // 已经有标识位
        boolean hasNumber = false; // 已经有数字位
        for (int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            if (c == ' ') { // 当遇到空格时，需要判断是否是开头空格，如果是则丢弃，否则退出循环返回之前转换得到的整数
                if (hasSignal || hasNumber) break;
                continue;
            } else if (c == '+' || c == '-') { // 当遇到正负号时，需要判断是否已经遇到过有效子字符串（可以转换为整数的子字符串）
                // 退出循环返回之前转换得到的整数
                if (hasSignal || hasNumber) break;
                hasSignal = true;
                if (c == '-') isNegative = true;
            } else if (c >= '0' && c <= '9') {
                hasNumber = true;
                int digit = c - '0';
                // Integer.MAX_VALUE is 2147483647
                if (!isNegative && (res > Integer.MAX_VALUE / 10 || (res == Integer.MAX_VALUE / 10 && digit > 7))) {
                    return Integer.MAX_VALUE;
                }
                // Integer.MIN_VALUE is -2147483648
                if (isNegative && (res > Integer.MAX_VALUE / 10 || (res == Integer.MAX_VALUE / 10 && digit > 8))) {
                    return Integer.MIN_VALUE;
                }
                res = res * 10 + digit;
            } else { // 遇到除 ' ' '+' '-' '0'~'9' 之外的其他字符时，退出循环返回之前转换得到的整数
                break;
            }
        }
        return isNegative ? -res : res;
    }
}
```

### 最优解

一开始去掉开头的无用空格，获取到开头的正负号（如果有的话），然后将后面的空格和正负号都判定为无效字符处理，会让代码看起来更简洁。

```java
class Solution {
    public int myAtoi(String str) {
        if (str == null) return 0;
        
        int i = 0;
        char[] chs = str.toCharArray();
        while (i < chs.length && chs[i] == ' ') i++; // 略过开头的无用空格
        if (i >= chs.length) return 0;
        
        boolean isNegative = false; // 是否有正负号
        if (chs[i] == '-') isNegative = true;
        if (chs[i] == '+' || chs[i] == '-') i++;
        // 后面再遇到 空格 或者 正负号 都归为无效字符处理， 退出循环返回之前转换得到的整数
        int res = 0;
        while (i < chs.length) {
            if (chs[i] >= '0' && chs[i] <= '9') {
                int digit = chs[i++] - '0';
                // Integer.MAX_VALUE is 2147483647
                // Integer.MIN_VALUE is -2147483648
                if (res > Integer.MAX_VALUE / 10 || (res == Integer.MAX_VALUE / 10 && digit > 7)) {
                    return isNegative ? Integer.MIN_VALUE : Integer.MAX_VALUE;
                }
                res = res * 10 + digit;
            } else {
                break;
            }
        }
        return !isNegative ? res : -res;
    }
}
```






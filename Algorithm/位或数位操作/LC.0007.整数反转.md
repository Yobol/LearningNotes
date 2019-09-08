# 整数反转

## 题目描述

给出一个32位的有符号整数，你需要将这个整数中每位上的数字进行反转。

**示例 1：**

```
输入: 123
输出: 321
```

**示例 2：**

```
输入: -123
输出: -321
```

**示例 3：**

```
输入: 120
输出: 21
```

**注意：**

假设我们的环境只能存储得下32位的有符号整数，则其数值范围为 [−2^31^,  2^31^ − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

## 解题思路

### 个人AC

每次构建反转整数的一位数字，并且在向原整数加一位数字前检查是否会溢出。

```Java
public class Solution {
    
    public int reverse(int x) {
        int res = 0;
        while (x != 0) {
            int digit = x % 10;
            x /= 10;
            // Integer.MAX_VALUE is 2147483647
            if (res > Integer.MAX_VALUE / 10 || (res == Integer.MAX_VALUE / 10 && digit > 7)) 
                return 0;
            // Integer.MIN_VALUE is -2147483648
            if (res < Integer.MIN_VALUE / 10 || (res == Integer.MIN_VALUE / 10 && digit < -8))
                return 0;
            res = res * 10 + digit;
        }
        return res;
    }
}
```

**时间复杂度：** O(lg(x)) 。

**空间复杂度：** O(1)。

### 最优解

同上。


# [两数相除](https://leetcode-cn.com/problems/divide-two-integers/)

## 题目描述

给定两个整数，被除数`dividend`和除数`divisor`。将两数相除，要求不使用乘法、除法和`mod`运算符。

返回被除数`dividend`除以除数`divisor`得到的商。

示例 1：

```
输入: dividend = 10, divisor = 3
输出: 3
```

示例 2：

```
输入: dividend = 7, divisor = -3
输出: -2
```

说明：

- 被除数和除数均为 32 位有符号整数；
- 除数不为 0；
- 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31^,  2^31^ − 1]。本题中，如果除法结果溢出，则返回 2^31^ − 1。

## 解题思路

### 个人AC

无。

### 最优解

**参考：**[LeetCode 题解](https://leetcode-cn.com/problems/divide-two-integers/solution/29-liang-shu-xiang-chu-by-en-zhao//)

使用位移法：左移1相当于乘以2，右移1相当于除以2。

解题思路：

若计算`100 / 3`，且`100 = 3 * 33 + 1`，其中`33 = 32 + 1 = 2 ^ 5 + 2 ^ 0`。我们可以用100不断减去3的倍数，直到值小于3为止。

实质：当`dividend`和`divisor`都为正数时，用`dividend`不断减去`divisor`的倍数，直到`dividend < divisor`为止。否则，若当`dividend`和`divisor`都为负数时，用`dividend`不断加上`divisor`的倍数，直到`dividend > divisor`为止。

```java
class Solution {
    public int divide(int dividend, int divisor) {
        // 根据被除数和除数得出最后结果的符号：负负得正
        boolean positive = (dividend > 0) ^ (divisor > 0);
        // 改用负数计算
        dividend = dividend > 0 ? -dividend : dividend;
        divisor = divisor > 0 ? -divisor : divisor;
        
        int result = 0;
        while (dividend <= divisor) { // dividend和divisor都为负数
            int tmp = divisor; // 找到当前不小于dividend的divisor的最大倍数
            int tmp_result = -1; // divisor的倍数
            while (dividend <= (tmp << 1)) {
                // 如果移位超出负数边界
                if (tmp <= (Integer.MIN_VALUE >> 1)) break;
                tmp <<= 1; // divisor * 2
                tmp_result <<= 1;
            }
            dividend -= tmp; // dividend加上当前不小于dividend的divisor的最大倍数
            result += tmp_result; // divisor的总倍数，(-2)^5 + (-2)^0 = -33
        }
        
        if (!positive) {
            if (result <= Integer.MIN_VALUE) return Integer.MAX_VALUE;
            result = -result;
        }
        return result;
    }
}
```

**时间复杂度：** $O()$；

**空间复杂度：** $O(1)$。
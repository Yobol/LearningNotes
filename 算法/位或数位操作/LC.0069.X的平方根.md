# [X的平方根](https://leetcode-cn.com/problems/sqrtx/)

## 题目描述

实现`int sqrt(int x)`函数。s

计算并返回`x`的平方根，其中`x`是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

**示例 1：**

```
输入: 4
输出: 2
```

**示例 2：**

```
输入: 8
输出: 2
说明: 8 的平方根是 2.82842..., 
     由于返回类型是整数，小数部分将被舍去。
```

## 解题思路

### 个人AC

二分查找，因为只返回平方根的整数部分，所以使用二分查找寻找左边界的模板。

#### Java

```java
class Solution {
    public int mySqrt(int x) {
        if (x == 0) return 0;
        // x的平方根必定小于等于它的二分之一，且大于等于1
        long left = 1, right = x >> 1;
        while (left < right) {
            long mid = (left + right + 1) >> 1;
            long square = mid * mid;
            if (square > x) {
                right = mid - 1;
            } else {
                left = mid;
            }
        }
        return (int)left;
    }
}
```

#### Golang

```go
func mySqrt(x int) int {
    if x == 0 {
        return x
    }
    // x 的平方根必小于等于它的二分之一，且大于等于1 => (1 + x) / 2 >= sqrt(1 * x)
    // sqrt(x) <= (x + 1) / 2
    left, right := 1, x >> 1
    for left < right {
        mid := (left + right + 1) / 2
        square := mid * mid
        if square > x {
            right = mid - 1
        } else {
            left = mid
        }
    }
    return left
}
```

**时间复杂度：** $O(logn)$；

**空间复杂度：** $O(1)$。

### 最优解

牛顿法。
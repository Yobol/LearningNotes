# [X的平方根]()

## 题目描述

## 解题思路

### 个人AC

二分查找，因为只返回平方根的整数部分，所以使用二分查找寻找左边界的模板。

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

**时间复杂度：** $O(logn)$；

**空间复杂度：** $O(1)$。

### 最优解

牛顿法。
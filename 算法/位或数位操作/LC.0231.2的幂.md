# [2的幂](https://leetcode-cn.com/problems/power-of-two/)

## 题目描述

给定一个整数，编写一个函数来判断它是否是 2 的幂次方。

**示例 1：**

```
输入: 1
输出: true
解释: 20 = 1
```

**示例 2：**

```
输入: 16
输出: true
解释: 24 = 16
```

**示例 3：**

```
输入: 218
输出: false
```

## 解题思路

### 个人AC

```java
class Solution {
    public boolean isPowerOfTwo(int n) {
        if (n <= 0) return false;
        int cnt = 0;
        while (n != 0) {
            n &= (n - 1);
            cnt++;
            if (cnt > 1) return false; 
        }
        return cnt == 1;
    }
}
```

**时间复杂度：** $O(1)$，k为给定n的二进制表示中1的位数；

**空间复杂度：** $O(1)$。

### 最优解

```java
class Solution {
    public boolean isPowerOfTwo(int n) {
        // 若n为正整数，且二进制表示中只有1位是1，则n & (n - 1)结果必为0
        return n > 0 && n & (n - 1) == 0;
    }
}
```

**时间复杂度：** $O(1)$；

**空间复杂度：** $O(0)$。
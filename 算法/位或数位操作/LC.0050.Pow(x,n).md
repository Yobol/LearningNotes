# [Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)

## 题目描述

实现`pow(*x*, *n*)`，即计算`x`的`n`次幂函数。

**示例 1：**

```
输入: 2.00000, 10
输出: 1024.00000
```

**示例 2：**

```
输入: 2.10000, 3
输出: 9.26100
```

**示例 3：**

```
输入: 2.00000, -2
输出: 0.25000
解释: 2^(-2) = (1/2)^2 = 1/4 = 0.25
```

**说明:**

- -100.0 < *x* < 100.0；
- *n* 是 32 位有符号整数，其数值范围是 [−2^31^, 2^31^ − 1] 。

## 解题思路

### 个人AC

因为当`n < 0`时，$x^n == 1/x^{-n}$，所以可以将`n < 0`的情况先归结到`n > 0`的情况上来，最后再根据n的符号取倒数即可。

如计算2的10次方，10的二进制表示为(1010)B，2^10^ = 2^8^ ✖ 2^2^，所以我们可以对`n`进行无符号右移操作，对每一个为1的有效位进行乘方运算。

```java
class Solution {
    public double myPow(double x, int n) {
        boolean reciprocal = n < 0;
        // if n == Integer.MIN_VALUE, it's opposite number will overflow
        n = reciprocal ? -n : n;
        double res = 1.0;
        int shift = 0;
        while (n != 0) {
            if ((n & 1) == 1) {
                res *= pow(x, shift);
            }
            shift++;
            n >>>= 1;
        }
        return reciprocal ? 1 / res : res;
    }

    private double pow(double x, int shift) {
        double res = x;
        while (shift-- > 0) {
            res *= res;
        }
        return res;
    }
}
```

**时间复杂度：** $O(k*l)$，其中`k`为`n`的二进制表达式中`1`的位数，`l`为`pow`中需要进行的乘法运算次数的平均数，`shift`为需要进行的乘法运算次数，最小为0次，最大为31次；

**空间复杂度：** $O(1)$。

### 最优解

#### 迭代法

同上。

#### 递归法

##### Java

```java
class Solution {
    public double myPow(double x, int n) {
        if (n < 0) {
            return 1 / helper(x, -n);
        } else {
            return helper(x, n);
        }
    }
    
    private double helper(double x, int n) {
        if (n == 0) return 1;
        double tmp = helper(x, n / 2); // 递归处理相乘的幂，重复利用已经算出来的值
        double result = tmp * tmp;
        if ((n & 1) == 1) { // 当幂为奇数时， 多乘一个x
            result *= x;
        } 
        return result;
    }
}
```

##### Golang

```go
func myPow(x float64, n int) float64 {
    if n < 0 {
        return 1 / helper(x, -n)
    } else {
        return helper(x, n)
    }
}

func helper(x float64, n int) float64 {
    if n == 0 {
        return 1
    }
    
    tmp := helper(x, n / 2)
    result := tmp * tmp
    if (n & 1) == 1 {
        result = x * result
    } 
    return result
}
```

**时间复杂度：** $O(logn)$；

**空间复杂度：** $O(logn)$， 递归栈深度。


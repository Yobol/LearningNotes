# [汉明距离](https://leetcode-cn.com/problems/hamming-distance/)

## 题目描述

两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。

给出两个整数 x 和 y，计算它们之间的汉明距离。

注意：

0 ≤ x, y < 2^31^.

**示例：**

```
输入: x = 1, y = 4

输出: 2

解释:
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑

上面的箭头指出了对应二进制位不同的位置。
```

## 解题思路

### 个人AC

```java
class Solution {
    public int hammingDistance(int x, int y) {
        int cnt = 0;
        while (x != 0 || y != 0) {
            if (((x & 1) ^ (y & 1)) == 1) cnt++;
            x >>>= 1;
            y >>>= 1;
        }
        return cnt;
    }
}
```

也可以先算出`x ^ y`。

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。
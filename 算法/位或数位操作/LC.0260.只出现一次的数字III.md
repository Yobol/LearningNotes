# [只出现一次的数字III](https://leetcode-cn.com/problems/single-number-iii/)

## 题目描述

给定一个整数数组 `nums`，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。

**示例：**

```
输入: [1,2,1,3,2,5]
输出: [3,5]
```

**注意：**

1. 结果输出的顺序并不重要，对于上面的例子， `[5, 3]` 也是正确答案。
2. 你的算法应该具有线性时间复杂度。你能否仅使用常数空间复杂度来实现？

## 解题思路

### 个人AC

```java
class Solution {
    public int[] singleNumber(int[] nums) {
        int single = 0;
        // 过滤掉所有重复元素
        for (int num : nums) {
            single ^= num;
        }

        // single是数组中只出现一次的两个元素的异或值
        // 找出两个元素二进制表示不同的最低位，即找出异或值中最右边的1
        int diff = single & -single;
        // 根据这个差异将所有元素分成两组，每组都可看作只有一个元素出现一次，其余元素皆出现两次
        int[] res = new int[2];
        for (int num : nums) {
            if ((num & diff) == diff) { // n & (1 << n) == 1 << n
                res[0] ^= num;
            } else {
                res[1] ^= num;
            }
        }
        return res;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。
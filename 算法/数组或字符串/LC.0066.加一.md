# [加一](https://leetcode-cn.com/problems/plus-one/)

## 题目描述

给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

**示例 1：**

```
输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。
```

**示例 2：**

```
输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。
```

## 解题思路

### 个人AC

```java
class Solution {
    public int[] plusOne(int[] digits) {
        int carry = 1;
        for (int i = digits.length - 1; i >= 0; i--) {
            int sum = digits[i] + carry;
            carry = sum / 10;
            digits[i] = sum % 10;
        }
        if (carry == 1) {
            int[] res = new int[digits.length + 1];
            res[0] = 1;
            System.arraycopy(digits, 0, res, 1, digits.length);
            return res;
        }
        return digits;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### [最优解](https://leetcode-cn.com/problems/plus-one/solution/java-shu-xue-jie-ti-by-yhhzw/)

看到的一个很巧妙的解法，学习一下：

```java
class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            digits[i]++; // 加一操作
            // 加一后如果有进位，则继续循环加一，否则直接返回
            digits[i] %= 10;
            // 若该位上有进位，则进位后此位为0，否则无进位
            if (digits[i] != 0) return digits;
        }
        // 循环结束，仍有进位，则扩充数组长度
        digits = new int[digits.length + 1];
        digits[0] = 1;
        return digits;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。


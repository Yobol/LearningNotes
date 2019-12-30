# [字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)

## 题目描述

给定两个以字符串形式表示的非负整数 `num1` 和 `num2`，返回 `num1` 和 `num2` 的乘积，它们的乘积也表示为字符串形式。

**示例 1：**

```
输入: num1 = "2", num2 = "3"
输出: "6"
```

**示例 2：**

```
输入: num1 = "123", num2 = "456"
输出: "56088"
```

**说明：**

- num1 和 num2 的长度小于110。
- num1 和 num2 只包含数字 0-9。
- num1 和 num2 均不以零开头，除非是数字 0 本身。
- 不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。

## 解题思路

### 个人AC

#### 模拟竖式乘法

```java
class Solution {
    public String multiply(String num1, String num2) {
        String product = "0";
        for (int i = num2.length() - 1; i >= 0; i--) {
            product = plus(product, multiply(num1, num2.charAt(i) - '0', num2.length() - 1 - i));
        }
        return product;
    }

    private String multiply(String num1, int num2, int offset) {
        if (num1.equals("0") || num2 == 0) return "0";
        StringBuilder sb = new StringBuilder("");
        int carry = 0;
        while (offset-- > 0) sb.append('0');
        for (int i = num1.length() - 1; i >= 0; i--) {
            int d = num1.charAt(i) - '0';
            int sum = d * num2 + carry;
            sb.append(sum % 10);
            carry = sum / 10;
        }
        if (carry > 0) sb.append(carry);
        return sb.reverse().toString();
    }

    private String plus(String num1, String num2) {
        StringBuilder sb = new StringBuilder("");
        int carry = 0;
        int i = num1.length() - 1, j = num2.length() - 1;
        while (i >= 0 || j >= 0) {
            int a = i < 0 ? 0 : num1.charAt(i--) - '0';
            int b = j < 0 ? 0 : num2.charAt(j--) - '0';
            int sum = a + b + carry;
            sb.append(sum % 10);
            carry = sum / 10;
        }
        if (carry > 0) sb.append(carry);
        return sb.reverse().toString();
    }
}
```

### 最优解

参考：[优化版竖式](https://leetcode-cn.com/problems/multiply-strings/solution/you-hua-ban-shu-shi-da-bai-994-by-breezean/)

```java
class Solution {
    public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) {
            return "0";
        }
        int[] res = new int[num1.length() + num2.length()];
        for (int i = num1.length() - 1; i >= 0; i--) {
            int n1 = num1.charAt(i) - '0';
            for (int j = num2.length() - 1; j >= 0; j--) {
                int n2 = num2.charAt(j) - '0';
                // res[i + j + 1]为上次循环的进位
                int sum = (res[i + j + 1] + n1 * n2);
                res[i + j + 1] = sum % 10;
                res[i + j] += sum / 10;
            }
        }

        StringBuilder result = new StringBuilder();
        for (int i = 0; i < res.length; i++) {
            if (i == 0 && res[i] == 0) continue;
            result.append(res[i]);
        }
        return result.toString();
    }
}
```

时间复杂度： $O(m * n)$；
空寂复杂度： $O(m + n)$。
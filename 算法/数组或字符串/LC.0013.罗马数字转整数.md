# [罗马数字转整数](https://leetcode-cn.com/problems/roman-to-integer/)

## 题目描述

罗马数字包含以下七种字符: `I`， `V`， `X`， `L`，`C`，`D` 和 `M`。

```
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

例如， 罗马数字 2 写做`II`，即为两个并列的 1。12 写做`XII`，即为`X + II`。 27 写做 `XXVII`, 即为`XX + V + II`。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做`IIII`，而是`IV`。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为`IX`。这个特殊的规则只适用于以下六种情况：

- `I`可以放在`V`(5) 和`X`(10) 的左边，来表示 4 和 9。
- `X`可以放在`L`(50) 和`C`(100) 的左边，来表示 40 和 90。 
- `C`可以放在`D`(500) 和`M`(1000) 的左边，来表示 400 和 900。

给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。

**示例 1：**

```
输入: "III"
输出: 3
```

**示例 2：**

```
输入: "IV"
输出: 4
```

**示例 3：**

```
输入: "IX"
输出: 9
```

**示例 4：**

```
输入: "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.
```

**示例 5：**

```
输入: "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```

## 解题思路

### 个人AC

通常情况下，罗马数字中小的数字在大的数字的右边，这种情况累加即可；但是当小的数字出现在大的数字右边时，则需要将右边大的数字减去出现其左边且小于它的数字，也等价于先减去左边的数字，最后再加上右边的数字。

```java
class Solution {
    public int romanToInt(String s) {
        if (s == null || s.length() == 0) return 0;
        int sum = 0;
        // lastNum用来表示上一个罗马数字对应的阿拉伯数字：
        // 如果 lastNum >= curNum，则意味着一个分组的结束，如 lastNum=V curNum=I，需要将lastNum加到sum上
        // 否则表示需要做减法运算，需要将让sum减去lastNum
        int lastNum = r2a(s.charAt(0));
        for (int i = 1; i < s.length(); i++) {
            int curNum = r2a(s.charAt(i));
            if (lastNum >= curNum) {
                sum += lastNum;
            } else {
                sum -= lastNum;
            }
            lastNum = curNum;
        }
        // 因为前面的只进行了n-1次运算，所以仍需要一次运算来将最后一个元素加到sum上
        sum += lastNum;
        return sum;
    }
    
    // 罗马数字转阿拉伯数字
    private int r2a(Character c) {
        switch (c) {
            case 'I':
                return 1;
            case 'V':
                return 5;
            case 'X':
                return 10;
            case 'L':
                return 50;
            case 'C':
                return 100;
            case 'D':
                return 500;
            case 'M':
                return 1000;
            default:
                return 0;
        }
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。
# [报数]()

## 题目描述

报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：

```
1.     1
2.     11
3.     21
4.     1211
5.     111221
```

`1`被读作`"one 1"`("一个一") , 即`11`。
`11`被读作`"two 1s"`("两个一"）, 即`21`。
`21`被读作`"one 2"`, `"one 1"`（`"一个二"`, `"一个一"`) , 即`1211`。

给定一个正整数 *n*（1 ≤ *n* ≤ 30），输出报数序列的第 *n* 项。

注意：整数顺序将表示为一个字符串。

**示例 1：**

```
输入: 1
输出: "1"
```

**示例 2：**

```
输入: 4
输出: "1211"
```

## 解题思路

### 个人AC

```java
class Solution {
    public String countAndSay(int n) {
        String start = "1";
        while (--n > 0) {
            start = countNext(start);
        }
        return start;
    }
    
    private String countNext(String num) {
        StringBuilder sb = new StringBuilder();
        int cnt = 0;
        char last = '\u0000';
        for (int i = 0; i < num.length(); i++) {
            char digit = num.charAt(i);
            if (last == digit) {
                cnt++;
            } else {
                if (last != '\u0000') {
                    sb.append(cnt);
                    sb.append(last);
                }
                // 重置计数器
                cnt = 1;
            }
            last = digit;
        }
        // 原序列最后一部分只在for循环被遍历过，但是没有将结果append到新序列中
        sb.append(cnt);
        sb.append(last);
        
        return sb.toString();
    }
}
```

**时间复杂度：** $O(n * k)$，`n`为第`n`个报数序列，`k`为前`n`个报数序列的平均长度；

**空间复杂度：** $O(n * k)$，`n`为第`n`个报数序列，`k`为前`n`个报数序列的平均长度。

### 最优解

暂同上。
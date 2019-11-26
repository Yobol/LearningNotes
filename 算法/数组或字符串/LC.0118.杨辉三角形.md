# [杨辉三角形](https://leetcode-cn.com/problems/pascals-triangle/)

## 题目描述

给定一个非负整数 *numRows，*生成杨辉三角的前 *numRows* 行。

![img](assets/PascalTriangleAnimated2.gif)

在杨辉三角中，每个数是它左上方和右上方的数的和。

**示例：**

```
输入: 5
输出:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
```

## 解题思路

### 个人AC

```java
class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> outer = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            List<Integer> inner = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                if (j - 1 < 0 || j > i - 1) {
                    // 每行的首位元素皆为1
                    inner.add(1);
                    continue;
                }
                inner.add(outer.get(i - 1).get(j - 1) + outer.get(i - 1).get(j));
            }
            outer.add(inner);
        }
        return outer;
    }
}
```

### 最优解

同上。
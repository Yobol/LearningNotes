# [不同的二叉搜索树](https://leetcode-cn.com/problems/unique-binary-search-trees/)

## 题目描述

给定一个整数 *n*，求以 1 ... *n* 为节点组成的二叉搜索树有多少种？

**示例：**

```
输入: 3
输出: 5
解释:
给定 n = 3, 一共有 5 种不同结构的二叉搜索树:

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
```



## 解题思路

### 个人AC

#### DFS + 哈希表剪枝

- f(0) = 1;
- f(1) = 1;
- f(2) = 2f(0)f(1);`注：根节点为1，左子树元素个数为0，右子树元素为1；根节点为2，左子树元素个数为1，右子树元素个数为0`；
- f(3) = 2f(0)f(2) + f(1)f(1);
- f(4) = 2f(0)f(3) + 2f(1)f(2);
- f(5) = 2f(0)f(4) + 2f(1)f(3) + f(2)f(2);
- ...

```java
class Solution {

    private HashMap<Integer, Integer> map = new HashMap<Integer, Integer>() {
        {
            this.put(0, 1);
            this.put(1, 1);
        }
    };
    private int c = 0;
    public int numTrees(int n) {
        int sum = 0;
        if (n == 0 || n == 1) return map.get(n);
        for (int i = 0, j = n - 1; i <= j; i++, j--) {
            if (i == j) {
                int a;
                if (map.containsKey(i)) a = map.get(i);
                else a = numTrees(i);
                sum += a * a;
            } else {
                int a, b;
                if (map.containsKey(i)) a = map.get(i);
                else a = numTrees(i);
                if (map.containsKey(j)) b = map.get(j);
                else b = numTrees(j);
                sum += (a * b) << 1;
            }
        }
        map.put(n, sum);
        return sum;
    }
}
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(n)$。

#### 动态规划

```java
class Solution {
    public int numTrees(int n) {
        int[] memo = new int[n + 1];
        memo[0] = 1;
        memo[1] = 1;
        for (int i = 2; i <= n; i++) {
            int sum = 0;
            for (int l = 0, r = i - 1; l <= r; l++, r--) {
                if (l == r) {
                    sum += memo[l] * memo[l];
                } else {
                    sum += (memo[l] * memo[r]) << 1;
                }
            }
            memo[i] = sum;
        }
        return memo[n];
    }
}
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(n)$。

### 最优解

同上。
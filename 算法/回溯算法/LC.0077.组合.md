# [组合](https://leetcode-cn.com/problems/combinations/)

## 题目描述

给定两个整数 *n* 和 *k*，返回 1 ... *n* 中所有可能的 *k* 个数的组合。

**示例：**

```
输入: n = 4, k = 2
输出:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

## 解题思路

### 个人AC（回溯 + 剪枝）

```java
class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> outer = new LinkedList<>();
        
        int depth = 1;
        LinkedList<Integer> inner = new LinkedList<>();
        backtrack(n, outer, inner, depth, k);
        return outer;
    }
    
    private void backtrack(int n, List<List<Integer>> outer, LinkedList<Integer> inner, 
                           int depth, int k) {
        if (inner.size() == k) {
            outer.add(new LinkedList(inner));
        }
        
        for (int i = depth; i < n; i++) {
            inner.add(i);
            // pruning: use rest integers to complete the combination
            // make depth as i+1
            backtrack(n, outer, inner, i + 1);
            // backtrack
            inner.removeLast();
        }
    }
}
```

**时间复杂度：** $kC_{n}^{k}$，需要遍历每一种情况；

**空间复杂度：** $kC_{n}^{k}$，需要保存所有组合。

### 解题思路

借助栈来完成`backtrack`：

```java
class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> outer = new LinkedList<>();
        
        int depth = 1;
        Stack<Integer> stack = new Stack<>();
        backtrack(n, outer, stack, depth, k);
        return outer;
    }
    
    private void backtrack(int n, List<List<Integer>> outer, Stack<Integer> stack, 
                           int depth, int k) {
        if (stack.size() == k) {
            outer.add(new LinkedList(stack));
            return;
        }
        
        // n-i+1 < k-stack.size()即剩下的元素已经不够装满符合条件的容器则剪枝
        for (int i = depth; i <= n - (k - stack.size()) + 1; i++) {
            stack.push(i);
            // pruning: use rest integers to complete the combination
            // make depth as i+1
            backtrack(n, outer, stack, i + 1, k);
            // backtrack
            stack.pop();
        }
    }
}
```


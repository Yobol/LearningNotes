# [全排列II](https://leetcode-cn.com/problems/permutations-ii/)

## 题目描述

给定一个**可包含重复数字**的序列，返回所有不重复的全排列。

**示例：**

```
输入: [1,1,2]
输出:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
```

## 解题思路

### 个人AC

在[全排列](https://leetcode-cn.com/problems/permutations/)的基础上进行剪枝即可：在水平扩展（遍历）时，如果当前值已经在之前遍历过，则直接跳到下一元素，不做纵向探索（递归）。

```java
class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        // construct output list
        List<List<Integer>> outer = new LinkedList<>();
        
        // convert nums to list since output is a list of lists
        ArrayList<Integer> inner = new ArrayList<>();
        for (int num : nums) {
            inner.add(num);
        }
        /*
                    1               1                   2
                [1, 1, 2]                           [2, 1, 1]
            [1, 1, 2][1, 2, 1]                  [2, 1, 1]
         */
        backtrack(nums.length, outer, inner, 0);
        return outer;
    }
    
    private void backtrack(int n, List<List<Integer>> outer, ArrayList<Integer> inner, int first) {
        if (first == n) {
            outer.add(new ArrayList<>(inner));
            return;
        }
        HashSet<Integer> set = new HashSet<>();
        for (int i = first; i < n; i++) {
            // pruning: skip the case that if element in [first, i) equals inner.get(i)
            if (set.contains(inner.get(i))) {
                continue;
            }
            set.add(inner.get(i));
            Collections.swap(inner, i, first);
            // DFS
            backtrack(n, outer, inner, first + 1);
            // backtrack
            Collections.swap(inner, i, first);
        }
    }
    
}
```

### 最优解

同上。
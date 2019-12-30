# [子集](https://leetcode-cn.com/problems/subsets/)

## 题目描述

给定一组**不含重复元素**的整数数组 *nums*，返回该数组所有可能的子集（幂集）。

**说明：**解集不能包含重复的子集。

**示例：**

```
输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```

## 解题思路

### 个人AC

回溯算法。

```java
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> outer = new LinkedList<>();
        LinkedList<Integer> inner = new LinkedList<>();
        dfs(outer, inner, nums, 0);
        return outer;
    }
    
    /*
        [1, 2, 3]
        
        >>>>>> Enter
        []
        --> dfs
        --> outer.add(new LinkedList<>([]))
        [1] --> add 1
        --> dfs
        --> outer.add(new LinkedList<>([1]))
        
        [1, 2] --> add 2
        --> dfs
        --> outer.add(new LinkedList<>([1, 2]))
        [1, 2, 3] --> add 3
        --> dfs
        --> outer.add(new LinkedList<>([1, 2, 3]))
        --> backtrack remove 3 
        --> backtrack remove 2
        
        [1, 3] --> add 3
        --> dfs
        --> outer.add(new LinkedList<>([1, 3]))
        --> backtrack remove 3
        --> backtrack remove 1
        
        
        [2] --> add 2
        --> dfs
        --> outer.add(new LinkedList<>([2]))
        [2, 3] --> add 3
        --> dfs
        --> outer.add(new LinkedList<>([2]))
        --> backtrack remove 3
        --> backtrack remove 2
        
        
        [3] --> add 3
        --> dfs
        --> outer.add(new LinkedList<>([2]))
        --> backtrack remove 3
        exit >>>>>>
     */
    private void dfs(List<List<Integer>> outer, LinkedList<Integer> inner, int[] nums, int depth) {
        outer.add(new LinkedList<>(inner));
        for (int i = depth; i < nums.length; i++) {
            inner.add(nums[i]);
            // dfs
            dfs(outer, inner, nums, i + 1);
            // backtrack
            inner.removeLast();
        }
    }
}
```

时间复杂度： $O(2^n)$，递归进行$2^n$次；

空间复杂度： $O(n * 2^{n-1})$，每个元素出现$2^{n-1}$次；

### 最优解

同上。
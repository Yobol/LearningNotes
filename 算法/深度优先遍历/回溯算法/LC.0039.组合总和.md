# [组合总和](https://leetcode-cn.com/problems/combination-sum/)

## 题目描述

给定一个无重复元素的数组`candidates`和一个目标数`target`，找出`candidates`中所有可以使数字和为`target`的组合。

`candidates`中的数字可以无限制重复被选取。

**说明：**

- 所有数字（包括 target）都是正整数。
- 解集不能包含重复的组合。 

**示例 1：**

```
输入: candidates = [2,3,6,7], target = 7,
所求解集为:
[
  [7],
  [2,2,3]
]
```

**示例 2：**

```
输入: candidates = [2,3,5], target = 8,
所求解集为:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```

## 解题思路

### 个人AC

```java
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> outer = new LinkedList<>();
        Stack<Integer> stack = new Stack<>();
        // 先对数组排序，便于剪枝
        Arrays.sort(candidates);
        int depth = 0;
        // 利用减法，可以少传一个参数
        backtrack(candidates, target, outer, stack, depth);
        return outer;
    }
    
    private void backtrack(int[] candidates, int remainder, List<List<Integer>> outer, Stack<Integer> stack, int depth) {
        if (remainder == 0) {
            outer.add(new LinkedList<>(stack));
            return;
        }
        for (int i = depth; i < candidates.length; i++) {
            // 配合排序后的数组是递增的，如果当前数字大于remainer，则进行剪枝
            if (remainder < candidates[i]) {
                break;
            }
            stack.push(candidates[i]);
            // 因为数组中的数字可以重复使用，
            backtrack(candidates, remainder - candidates[i], outer, stack, i);
            stack.pop();
        }
    }
}
```

### 最优解

做搜索、回溯问题的套路是画图，代码其实就是根据画出的树形图写出来的。

那么如何画图呢？

- 根据题目中的用例，画一个图，因为是搜索，因此呈现的是一个树形结构图，并且在这个树形结构中会体现出递归结构。
- 根据题目中的用例，比对自己画图的结果和题目的结果的差异，如果一样，说明我们的分析没有错；如果不一样，说明我们的分析有误，一定有哪一个环节漏掉了或者分析错误，根据找到的问题调整算法。

针对示例 1：

> 输入: `candidates = [2, 3, 6, 7]`，`target = 7`，所求解集为: `[[7], [2, 2, 3]]`

思路：以 target = 7 为根结点，每一个分支做减法。减到 0 或者负数的时候，剪枝。其中，减到 0 的时候结算，这里 “结算” 的意思是添加到结果集。

![39-1.png](assets/fe32ae9cee9ec8e2545d038d80a8da70d809eed01c153c6f0076801baab5010d-39-1.png)

![39-2.png](assets/6e40e8001540f336dacbef4baa7710f31ca00a31ad286b7aa4109a13657d8960-39-2.png)

![39-3.png](assets/ade93b4f0678b2b1385ad1362ff426ce0a5a800a5b0ae07dfb65f58677374559-39-3.png)
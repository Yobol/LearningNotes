# [前K个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)

## 题目描述

给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

**示例 1：**

```
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
```

**示例 2：**

```
输入: nums = [1], k = 1
输出: [1]
```

**说明：**

你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
你的算法的时间复杂度必须优于$O(n log n)$, n 是数组的大小。

## 解题思路

### 个人AC

首先使用`HashMap`来统计数组中各元素出现的次数，然后使用`桶排序`的思想找出前K个最大值。

```Java
class Solution {
    public List<Integer> topKFrequent(int[] nums, int k) {
        // 统计数组中各元素出现的次数
        HashMap<Integer, Integer> counters = new HashMap<>();
        for (int num : nums) {
            counters.put(num, counters.getOrDefault(num, 0) + 1);
        }
        // 桶排序：将频率作为数组下标
        List<Integer>[] buckets = new List[nums.length + 1];
        for (int key : counters.keySet()) {
            int counter = counters.get(key);
            if (buckets[counter] == null) {
                buckets[counter] = new ArrayList<>();
            } 
            buckets[counter].add(key);
        }
        
        List<Integer> topK = new ArrayList<>();
        // 倒序遍历数组获得 top k
        for (int i = buckets.length - 1; i > 0 && topK.size() < k; i--) {
            if (buckets[i] == null) continue;
            if (buckets[i].size() <= k - topK.size()) {
                topK.addAll(buckets[i]);
            } else {
                topK.addAll(buckets[i].subList(0, k - topK.size()));
            }
        }
        return topK;
    }
}
```

**时间复杂度：** 平均复杂度$O(n)$；

**空间复杂度：** $O(n)$。

### 最优解

同上。


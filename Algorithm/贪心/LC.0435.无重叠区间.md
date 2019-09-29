# [无重叠区间](https://leetcode-cn.com/problems/non-overlapping-intervals/)

## 题目描述

给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

注意：

可以认为区间的终点总是大于它的起点。
区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。

**示例 1：**

```
输入: [ [1,2], [2,3], [3,4], [1,3] ]
输出: 1
解释: 移除 [1,3] 后，剩下的区间没有重叠。
```

**示例 2：**

```
输入: [ [1,2], [1,2], [1,2] ]
输出: 2
解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
```

**示例 3：**

```
输入: [ [1,2], [2,3] ]
输出: 0
解释: 你不需要移除任何区间，因为它们已经是无重叠的了。
```

## 解题思路

### 个人AC

在每次选择中，区间的结尾最为重要，选择的区间结尾越小，留给后面的区间的空间越大，那么后面能够选择的区间
个数也就越大。 

按区间的结尾边界排序，每次选择结尾边界最小，并且不与前面区间重叠的区间。

```Java
class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;
        
        Arrays.sort(intervals, new Comparator<int[]>() {
           
            @Override
            public int compare(int[] a, int[] b) {
                return a[1] - b[1];
            }
        });
        
        int intervalsToBeDeleted = 0;
        int lastEnd = intervals[0][1];
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < lastEnd) {
                intervalsToBeDeleted++;
                continue;
            }
            lastEnd = intervals[i][1];
        }
        return intervalsToBeDeleted;
    }
}
```

### 最优解

同上。


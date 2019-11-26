# [合并区间](https://leetcode-cn.com/problems/merge-intervals/)

## 题目描述

给出一个区间的集合，请合并所有重叠的区间。

**示例 1：**

```java
输入: [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6]。
```

**示例 2：**

```java
输入: [[1,4],[4,5]]
输出: [[1,5]]
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
```

## 解题思路

### 个人AC

```java
class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals == null || intervals.length == 0) {
            return intervals;
        }
        // 实现Comparator接口进行排序
        Arrays.sort(intervals, new Comparator<int[]>() {
            @Override
            public int compare(int[] o1, int[] o2) {
                if (o1[0] == o2[0]) {
                    return o1[1] - o2[1];
                }
                return o1[0] - o2[0];
            }
        });
        int left = intervals[0][0], right = intervals[0][1];
        List<int[]> list = new ArrayList<>();
        for (int i = 0; i < intervals.length; i++) {
            // 排序后intervals[i][0]一定大于等于left，
            // 所以只需比较intervals[i][0]和right的大小关系
            if (intervals[i][0] <= right) { // 区间重叠，如[1, 3]和[2, 6]
                right = Math.max(right, intervals[i][1]);
            } else { // 无重叠部分，将上一区间加入list中，并将left和right置为当前区间
            	list.add(new int[]{left, right});
                left = intervals[i][0];
                right = intervals[i][1];
            }
        }
        list.add(new int[]{left, right});
        int[][] result = new int[list.size()][2];
        for (int i = 0; i < list.size(); i++) {
            result[i] = list.get(i);
        }
        return result;
    }
}
```

### 最优解

同上。


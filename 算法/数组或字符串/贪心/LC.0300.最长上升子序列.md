# [最长上升子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

## 题目描述

给定一个无序的整数数组，找到其中最长上升子序列的长度。

**示例：**

```
输入: [10,9,2,5,3,7,101,18]
输出: 4 
解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
```

**说明：**

- 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
- 你算法的时间复杂度应该为 O(n2) 。

进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?

## 解题思路

### 个人AC

维持一个子序列`sequence`，该序列中的元素是递增的，该序列实际承载元素的数量即为最长上升子序列的长度。遍历给定数组：

- 当`nums[i]`大于`sequence`的最后一个元素时，直接将`nums[i]`置于该元素末尾，能够维护最长上升子序列的长度；
- 否则，利用二分查找（时间复杂度为$O(logn)$）在`sequence`中寻找将要被`nums[i]`替换的元素的位置，即找到`sequence`中大于`nums[i]`的最小元素的位置。

```java
class Solution {
    public int lengthOfLIS(int[] nums) {
        int n = nums.length;
        if (n < 2) return n;

        int[] sequence = new int[n];
        sequence[0] = nums[0];
        int maxLen = 1; // sequence的容量，即最长上升子序列的长度
        for (int i = 1; i < n; i++) {
            if (nums[i] > sequence[maxLen - 1]) { // 如果nums[i]大于sequence序列的最后一个元素，则直接放入其尾部即可
                sequence[maxLen++] = nums[i];
            } else { // 否则，使用二分法将nums[i]替换掉sequence序列中大于nums[i]的最小元素
                int pos = binarySearch(sequence, 0, maxLen, nums[i]);
                if (pos >= 0) {
                    sequence[pos] = nums[i];
                }
            }
        }
        return maxLen;
    }

    // 找到sequence[0, maxLen)中大于target的最小元素的位置
    private int binarySearch(int[] sequence, int left, int right, int target) {
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (sequence[mid] == target) { // 如果target存在于sequence[0, maxLen)中，则返回-1，表明无需替换
                return -1;
            } else if (sequence[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
}
```

时间复杂度： $O(nlogn)$；

空间复杂度： $O(n)$。

## 最优解

同上。

### 参考

[图解一道腾讯笔试算法题：「最长上升子序列」](https://mp.weixin.qq.com/s?__biz=MzUyNjQxNjYyMg==&mid=2247487027&idx=2&sn=3ce9c7b253f38d5cc3a4ae44c32ded2f&chksm=fa0e61b2cd79e8a45146c709a3e8936788de84c16d17eb2a97b651ea6e347d0a275b7eb6069b&mpshare=1&scene=1&srcid=&sharer_sharetime=1575271800779&sharer_shareid=04018bea7e0dee23276c3a18bf359e53#rd)


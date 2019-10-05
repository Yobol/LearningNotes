# [数组中的第k个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

## 题目描述

在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

**示例 1：**

```
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```

**示例 2：**

```
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

**说明：**

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

## 解题思路

### 个人AC

快排的`partition`方法每次都会将一个元素放到最终的位置上并返回该位置，同时该元素左边的所有元素都小于等于该元素，该元素右边的元素都大于等于该元素。

找第`k`大的元素，等价于找第`i (= len - k) `小的元素。不断地通过`partition`来获得

```Java
class Solution {
    // 改进版的快排 —— 快速选择
    public int findKthLargest(int[] nums, int k) {
        k = nums.length - k; // 转换成找第 i (len - k) 小
        int l = 0, h = nums.length - 1;
        while (l < h) {
            int i = partition(nums, l, h);
            if (k == i) {
                break;
            } else if (k < i) {
                h = i - 1;
            } else {
                l = i + 1;
            }
        }
        return nums[k];
    }
    
    // [start, end]
    private int partition(int[] nums, int start, int end) {
        int pivot = nums[start];
        int i = start, j = end;
        while (i < j) {
            while (i < j && nums[j] >= pivot) j--;
            if (i < j) {
                swap(nums, i, j);
                i++; // 此时i位置的元素已经被遍历过，其值是小于pivot的
            }
            while (i < j && nums[i] <= pivot) i++;
            if (i < j) {
                swap(nums, i, j);
                j--; // 此时j位置的元素已经被遍历过，其值是大于pivot的
            }
        }
        return i;
    }
    
    private void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
}
```

时间复杂度： 平均复杂度$O(n)$，最坏复杂度$O(n^2)$；

空间复杂度： $O(1)$。

### 最优解

同上。
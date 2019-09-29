# [寻找两个有序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)

## 题目描述

给定两个大小为`m`和`n`的有序数组`nums1`和`nums2`。

请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为`O(log(m + n))`。

你可以假设`nums1`和`nums2`不会同时为空。

**示例1：**

```
nums1 = [1, 3]
nums2 = [2]

则中位数是 2.0
```

**示例2：**

```
nums1 = [1, 2]
nums2 = [3, 4]

则中位数是 (2 + 3)/2 = 2.5
```

## 解题思路

### 个人AC

无。

### 最优解

两个有序数组求中位数，问题可以一般化为：求两个有序数组的第`k`个数，当`k = (m + n) / 2`时为原问题的解。

怎么求第`k`个数？分别求出第一个和第二个数组的第`k/2`个数`a`和`b`，然后比较`a`和`b`：

- 若`a < b`，说明第`k`个数位于`a`的后半段或者`b`的前半段；
- 否则`a >= b`，则第`k`个数位于`a`的前半段或者`b`的后半段；

问题规模缩小了一般，递归处理即可。时间复杂度为`O(log(m + n))`。

```Java
public class Solution {
    
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (null == nums1 || null == nums2) throw new IllegalArgument("Input array can't be null");
        
        int n1 = nums1.length, n2 = nums2.length;
        // 处理任何一个nums为空的情况
        if (n1 == 0) {
            if ((n1 & 1) == 1) return 1.0 * nums2[n2 / 2];
            return (nums2[n2 / 2] + nums2[n2 / 2 - 1]) / 2.0;
        }
        if (n2 == 0) {
            if ((n1 & 1) == 1) return 1.0 * nums1[n1 / 2];
            return (nums1[n1 / 2] + nums1[n1 / 2 - 1]) / 2.0;
        }
        
        int n = n1 + n2; // 数组总长度
        if ((n & 1) == 1) { // 如果总长度为奇数，则找第(n / 2 + 1)个数
            return find_kth(nums1, 0, nums2, 0, n / 2 + 1);
        }
        // 总长度为偶数，找第(n / 2)和第(n / 2 + 1)个数
        return (find_kth(nums1, 0, nums2, 0, n / 2) + find_kth(nums1, 0, nums2, 0, n / 2 + 1)) / 2.0;
    }
    
    public int find_kth(int[] nums1, )
}
```




# [合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)

## 题目描述

给定两个有序整数数组`nums1`和`nums2`，将`nums2`合并到`nums1`中，使得`num1`成为一个有序数组。

**说明：**

```
初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
```

**示例：**

```
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]
```

## 解题思路

### 个人AC

设置两个指针，从后向前遍历给定的数组。

```Java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int l = m + n; // 合并数组
        while (m > 0 && n > 0) {
            if (nums1[m - 1] > nums2[n - 1]) {
                nums1[l - 1] = nums1[m - 1];
                m--;
            } else {
                nums1[l - 1] = nums2[n - 1];
                n--;
            }
            l--;
        }
        if (m == 0) System.arraycopy(nums2, 0, nums1, 0, n);
    }
}
```

**时间复杂度：** $O(m + n)$；

**空间复杂度：** $O(1)$。

### 最优解

同上。






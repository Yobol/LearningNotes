# 合并两个有序数组

## 题目描述

给定两个有序整数数组`nums1`和`nums2`，将`nums2`合并到`nums1`中，使得`num1`成为一个有序数组。

说明：

```
初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
```

示例：

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
        int i = nums1.length - 1;
        m--;
        n--;
        while (m >= 0 && n >= 0) {
            if (nums1[m] >= nums2[n]) {
                nums1[i--] = nums1[m--];
            } else {
                nums1[i--] = nums2[n--];
            }
        }
        
        while (m >= 0) {
            nums1[i--] = nums1[m--];
        }
        
        while (n >= 0) {
            nums1[i--] = nums2[n--];
        }
    }
}
```

**时间复杂度：** $O(m + n)$；

**空间复杂度：** $O(1)$。

### 最优解

想法同上，但是精简了代码。

```Java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = nums1.length - 1;
        int p1 = m - 1, p2 = n - 1;
        while (p1 >= 0 && p2 >= 0) {
            nums1[i--] = nums1[p1] >= nums2[p2] ? nums1[p1--] : nums2[p2--];
        }
        
        // 将nums2中剩余的元素添加到nums1中
        while (p2 >= 0) {
            nums1[i--] = nums2[p2--];
        }
    }
}
```

或者仅使用一个`while`循环：

```Java
public void merge(int[] nums1, int m, int[] nums2, int n) {
	int i = m + n - 1;
	int p1 = m - 1, p2 = n - 1;
	while (p1 >= 0 || p2 >= 0) {
		if (p1 < 0) {
			nums1[i--] = nums2[p2--];
		} else if (p2 < 0) {
			nums1[i--] = nums1[p1--];
		} else if (nums1[p1] >= nums2[p2]) {
			nums1[i--] = nums1[p1--];
		} else {
			nums1[i--] = nums2[p2--];
		}
	}
}
```


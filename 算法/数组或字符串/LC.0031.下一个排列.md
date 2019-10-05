# [下一个排列](https://leetcode-cn.com/problems/next-permutation/)

## 题目描述

实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

必须原地修改，只允许使用额外常数空间。

以下是一些例子，输入位于左侧列，其相应输出位于右侧列。

```
1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1
```

## 解题思路

### 个人AC

找规律。

```java
class Solution {
    public void nextPermutation(int[] nums) {
        int n = nums.length;
        if (n <= 1) {
            return;
        }
        // traverse from back to front
        // nothing to do if increase
        // until encounter the case from big to small(nums[i] > nums[i - 1])
        int i;
        for (i = n - 1; i > 0; i--) {
            if (nums[i] > nums[i - 1]) {
                // find nums[x] in [i, n) that is larger than nums[i - 1]
                int j = n - 1;
                while (nums[i - 1] >= nums[j]) j--;
                swap(nums, i - 1, j);
                break;
            } 
        }
        // sort from i to the end
        // because the part is descending, we use double pointers to reverse it
        reverse(nums, i, n - 1);
    }
    
    private void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
    
    private void reverse(int[] nums, int start, int end) {
        for (int i = start, j = end; i < j; i++, j--) {
            swap(nums, i, j);
        }
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

### 最优解

```java
public class Solution {
    public void nextPermutation(int[] nums) {
        int i = nums.length - 2;
        while (i >= 0 && nums[i + 1] <= nums[i]) {
            i--;
        }
        if (i >= 0) {
            int j = nums.length - 1;
            while (j >= 0 && nums[j] <= nums[i]) {
                j--;
            }
            swap(nums, i, j);
        }
        reverse(nums, i + 1);
    }

    private void reverse(int[] nums, int start) {
        int i = start, j = nums.length - 1;
        while (i < j) {
            swap(nums, i, j);
            i++;
            j--;
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。
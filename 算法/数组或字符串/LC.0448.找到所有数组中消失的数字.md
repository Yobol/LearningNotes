# [找到所有数组中消失的数字](https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/)

## 题目描述

给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，另一些只出现一次。

找到所有在 [1, n] 范围之间没有出现在数组中的数字。

您能在不使用额外空间且时间复杂度为O(n)的情况下完成这个任务吗? 你可以假定返回的数组不算在额外空间内。

**示例：**

```
输入:
[4,3,2,7,8,2,3,1]

输出:
[5,6]
```

## 解题思路

### 个人AC

第一次遍历数组将元素与下标对应起来，然后再遍历一遍数组找出那些不能正确对应的元素。

```java
class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        int i = 0;
        while (i < nums.length) {
            if ((nums[i] - 1) != i && nums[nums[i] - 1] != nums[i]) {
                swap(nums, i, nums[i] - 1);
            } else {
                i++;
            }
        }
        return new ArrayList() {{
            for (int i = 0; i < nums.length; i++) {
                if ((nums[i] - 1) != i) {
                    this.add(i + 1);
                }
            }
        }};
    }

    private void swap(int[] nums, int i, int j) {
        nums[i] ^= nums[j];
        nums[j] ^= nums[i];
        nums[i] ^= nums[j];
    }
}
```

时间复杂度： $O(n)$；

空间复杂度： $0$。

### 最优解

同上。
# [三数之和](https://leetcode-cn.com/problems/3sum/)

## 题目描述

给定一个包含`n`个整数的数组 nums，判断`nums`中是否存在三个元素`a`，`b`，`c` ，使得`a + b + c = 0`？找出所有满足条件且不重复的三元组。

**注意：**答案中不可以包含重复的三元组。

```
例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

## 解题思路

### 个人AC

排序 + 双指针。

1. 首先对原数组进行排序；
2. 选定一个`nums[i]`，再用两个指针`l`和`r`指向其后子数组的两端，计算三个数的和是否等于0：
   1. 如果`nums[i] > 0`，则三数之和必定不为0，结束循环；
   2. 如果`nums[i] == nums[i-1]`，说明该数字重复，继续操作会导致结果重复，应该跳过；
   3. 收缩`l`和`r`，计算三数之和：
      1. 当`sum == 0`时，若`nums[l] == nums[l+1]`会导致结果重复，跳过，`l++`；
      2. 当`sum == 0`时，若`nums[r] == nums[r-1]`会导致结果重复，跳过，`r--`。

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        if (nums == null || nums.length < 3) return res;
        Arrays.sort(nums);
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，结束循环
            if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1]) l++; // 去重
                    while (l < r && nums[r] == nums[r - 1]) r--; // 去重
                    l++;
                    r--;
                } else if (sum < 0) {
                    l++;
                } else if (sum > 0) {
                    r--;
                }
            }
        }
        return res;
    }
}
```

时间复杂度： $O(n^2)$；

空间复杂度： $O(1)$。

### 最优解

同上。


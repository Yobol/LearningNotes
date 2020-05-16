# [两数之和](https://leetcode-cn.com/problems/two-sum/)

## 题目描述

给定一个整数数组`nums`和一个目标值`target`，请你在该数组中找出和为目标值的那 **两个** 整数，并返回他们的 **数组下标**。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例：

```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

## 解题思路

### 个人AC

借助`HashMap`数据结构将查询操作的时间复杂度从`O(n)`降到`O(1)`：将遍历过的整数放进哈希表中。

```Java
import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        if (null == nums || nums.length < 2) throw new IllegalArgumentException("Input array error");
        
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("no tow sum solution");
    }
}
```

**时间复杂度**：O(n)；

**空间复杂度**：O(n)。

### 最优解

同上。
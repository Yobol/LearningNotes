# [最短无序连续子数组]()

## 题目描述

给定一个整数数组，你需要寻找一个连续的子数组，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。

你找到的子数组应是最短的，请输出它的长度。

**示例 1：**

```
输入: [2, 6, 4, 8, 10, 9, 15]
输出: 5
解释: 你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。
```

**说明：**

1. 输入的数组长度范围在 [1, 10,000]。
2. 输入的数组可能包含**重复**元素 ，所以**升序**的意思是**<=。**

### 个人AC

```java
class Solution {
    public int findUnsortedSubarray(int[] nums) {
        // start记录连续子数组的开始下标，当nums[i] < nums[i-1]时为start赋值
        // m记录数组中的最大值
        // end记录连续子数组的结束下标，当nums[i] < m时，更新end，并且看是否要更新start
        int start = -1, end = -1, m = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i - 1] > nums[i] && start < 0) {
                start = i - 1;
            }
            
            if (m > nums[i]) {
                end = i;
                while (start >= 1 && nums[start - 1] > nums[i]) start--;
            } else {
                m = nums[i];
            }
        }
        // start < 0说明给定数组是升序的，无序子数组长度为0
        return start < 0 ? 0 : end - start + 1;
    }
}
```

时间复杂度： $O(n)$；

空间复杂度： $O(1)$。

### 最优解

同上。


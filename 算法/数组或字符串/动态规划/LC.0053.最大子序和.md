# [最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)

## 题目描述

给定一个整数数组 `nums` ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**示例：**

```
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

**进阶：**

如果你已经实现复杂度为 O(*n*) 的解法，尝试使用更为精妙的分治法求解。

## 解题思路

### 个人AC

可以想到用暴力法求解。

### 最优解

#### Java

```java
class Solution {
    public int maxSubArray(int[] nums) {
        int res = Integer.MIN_VALUE;
        int sum = 0;
        for (int num : nums) {
            // 如果sum > 0，则说明sum对结果有增益效果，则sum保留并加上当前遍历数字
            if (sum > 0) {
                sum += num;
            } else {  // 否则，说明sum对结果无增益效果，舍弃并将sum直接更新为当前遍历数字
                sum = num;
            }
            res = Math.max(res, sum);
        }
        return res;
    }
}
```

#### Golang

```go
// 执行用时 : 8 ms, 在所有 Go 提交中击败了 64.35% 的用户
// 内存消耗 : 3.3 MB, 在所有 Go 提交中击败了 100.00% 的用户
func maxSubArray(nums []int) int {
    n := len(nums)
    sum := nums[0] // 当前最大子序和
    maxSum := sum // 最大子序和
    for i := 1; i < n; i++ {
        // `sum > 0` means `sum + nums[i] > nums[i]`
        if sum > 0 { // 如果sum > 0，则说明sum对结果有增益效果，则sum保留并加上当前遍历数字
            sum += nums[i]
        } else { // 否则，说明sum对结果无增益效果，舍弃并将sum直接更新为当前遍历数字
            sum = nums[i]
        }
        if sum > maxSum {
            maxSum = sum
        }
    }
    return maxSum
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

 
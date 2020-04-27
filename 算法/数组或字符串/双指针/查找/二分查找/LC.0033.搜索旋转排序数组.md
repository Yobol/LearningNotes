# [搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)

## 题目描述

假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组`[0,1,2,4,5,6,7]`可能变为`[4,5,6,7,0,1,2]`)。

搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

你可以假设数组中不存在重复的元素。

你的算法时间复杂度必须是 O(log n) 级别。

示例 1：

```
输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
```

示例 2：

```
输入: nums = [4,5,6,7,0,1,2], target = 3
输出: -1
```

## 解题思路

### 个人AC

将数组一分为二的话，必定有一个是升序序列，而另一个是旋转序列。

基于二分法进行改进：

1. 首先需要判断哪个子序列是升序序列，哪个序列是旋转序列：
   - 如果`nums[l] < nums[m]`，则左半段是有序序列，右半段是旋转序列，
   - 否则左半段是旋转序列，右半段是有序序列。
2. 然后在判断子序列类型后，进一步拆分，直到区间元素只有一个为止。

#### Java

```java
class Solution {
    public int search(int[] nums, int target) {
        if (nums.length == 0) return -1;
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int m = (l + r) / 2;
            if (nums[m] == target) {
                return m;
            } else if (nums[m] < nums[r]) { // 左半段旋转，右半段有序
                if (nums[m] < target && target <= nums[r]) { // target在右半段有序序列
                    l = m + 1;
                } else { // target在左半段旋转序列
                    r = m - 1;
                }
            } else { // 左半段有序，右半段旋转
                if (nums[l] <= target && target < nums[m]) { // target在左半段有序序列
                    r = m - 1;
                } else { // // target在右半段旋转序列
                    l = m + 1;
                }
            }
        }
        
        return -1;
    }
}
```

#### Golang

```go
// 可以借鉴二分查找思想解决该问题
// 对该问题而言，每次都会将原数组分为有序数组和旋转数组，
// 不断地对旋转数组进行二分查找，直到数组长度为1
func search(nums []int, target int) int {
    if len(nums) == 0 {
        return -1
    }
    for left, right := 0, len(nums) - 1; left <= right; {
        mid := (left + right) / 2
        if nums[mid] == target {
            return mid
        } else if nums[mid] < nums[right] { // 左半段旋转，右半段有序
            // 为什么不能先判断target在旋转序列再判断在有序序列？
            // 如果先判断target在左半段有序序列，
            // 则判断条件为 nums[left] >= target && target > nums[mid]
            // 因为左半段是旋转数组，所以该条件是成立的！！！
            if nums[mid] < target && target <= nums[right] { // target在右半段有序序列
                left = mid + 1
            } else { // target在左半段旋转序列
                right = mid - 1
            }
        } else { // 左半段有序，右半段旋转
            // 同上
            if nums[left] <= target && target < nums[mid] { // target在左半段有序序列
                right = mid - 1
            } else { // target在右半段旋转序列
                left = mid + 1
            }
        }
    }
    return -1

}
```

时间复杂度： $O(log n)$；

空间复杂度： $O(1)$。

### 最优解

**参考：** [极简 Solution](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/solution/ji-jian-solution-by-lukelee/)
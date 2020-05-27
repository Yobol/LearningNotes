# [山脉数组中查找目标值](https://leetcode-cn.com/problems/find-in-mountain-array/)

## 题目描述

给你一个 山脉数组`mountainArr`，请你返回能够使得`mountainArr.get(index)`等于`target`的最小下标。

如果不存在这样的下标，就请返回` -1`。

何为山脉数组？如果数组`A`是一个山脉数组的话，那它满足如下条件：

- 首先，`A.length >= 3`；
- 其次，在`0 < i < A.length - 1`条件下，存在`i`使得：
  - `A[0] < A[1] < ... A[i-1] < A[i]`；
  - `A[i] > A[i+1] > ... > A[A.length - 1]`。

你将不能直接访问该山脉数组，必须通过 MountainArray 接口来获取数据：

- `MountainArray.get(k) `- 会返回数组中索引为k 的元素（下标从 0 开始）；
- `MountainArray.length() `- 会返回该数组的长度。

 **示例 1：**

```
输入：array = [1,2,3,4,5,3,1], target = 3
输出：2
解释：3 在数组中出现了两次，下标分别为 2 和 5，我们返回最小的下标 2。
```

**示例 2：**

```
输入：array = [0,1,2,4,2,1], target = 3
输出：-1
解释：3 在数组中没有出现，返回 -1。
```

**提示：**

- 3 <= mountain_arr.length() <= 10000；
- 0 <= target <= 10^9^；
- 0 <= mountain_arr.get(index) <= 10^9^。

## 解题思路

### 个人AC

1. 先使用二分法找到“山峰”；
2. 然后先对左半边使用二分法查找目标值，如果找到返回其下标；
3. 否则对右半边使用二分法查找目标值，如果找到返回其下标；
4. 否则返回-1。

```go
/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * type MountainArray struct {
 * }
 *
 * func (this *MountainArray) get(index int) int {}
 * func (this *MountainArray) length() int {}
 */

func findInMountainArray(target int, mountainArr *MountainArray) int {
	index := -1
	top := findMountainTop(mountainArr, 0, mountainArr.length() - 1)
	index = searchLeftHalf(target, mountainArr, 0, top)
	if index == -1 {
		index = searchRightHalf(target, mountainArr, top + 1, length)
	}
	return index
}

// 寻找山峰
func findMountainTop(mountainArr *MountainArray, left int, right int) int {
	top := -1
	mid := (left + right) / 2
	midValue := mountainArr.get(mid)
	beforeMidValue := mountainArr.get(mid - 1)
	afterMidValue := mountainArr.get(mid + 1)
	if beforeMidValue < midValue && midValue > afterMidValue {
		top = mid
	} else if beforeMidValue < midValue && midValue < afterMidValue {
		top = findMountainTop(mountainArr, mid, right) // 山峰在mid右侧
	} else {
		top = findMountainTop(mountainArr, left, mid) // 山峰在mid左侧
	}
	return top
}

// 查找左半边
func searchLeft(target int, mountainArr *MountainArray, left int, right int) int {
    for ; left <= right; {
        mid := (left + right) / 2
        midValue := mountainArr.get(mid)
        if midValue == target {
            return mid
        } else if midValue < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    
	return -1
}

// 查找右半边
func searchRightHalf(target int, mountainArr *MountainArray, left int, right int) int {
    for ; left <= right; {
        mid := (left + right) / 2
        midValue := mountainArr.get(mid)
        if midValue == target {
            return mid
        } else if midValue > target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
	return -1
}
```

**时间复杂度：** $O(log2n)$；

**空间复杂度：** $O(1)$。
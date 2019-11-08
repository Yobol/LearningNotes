# [删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

## 题目描述

给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

**示例 1：**

```
给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

你不需要考虑数组中超出新长度后面的元素。
```

**示例 2：**

```
给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。
```

## 解题思路

### 个人AC

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums == null || nums.length == 0) return 0; 
        
        int induplicatedNum = 1;
        for (int i = 1; i < nums.length; i++) {
            // 如果当前遍历到的数字与前面的数字重复，则直接跳过【其实不写也可以，个人编程习惯】
            if (nums[i] == nums[induplicatedNum - 1]) continue;
            
            // 否则，将当前遍历到的数字前移到“新”数组的末尾，并将新数组长度+1
            nums[induplicatedNum++] = nums[i];
        }
        return induplicatedNum;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。

## 最优解

同上。
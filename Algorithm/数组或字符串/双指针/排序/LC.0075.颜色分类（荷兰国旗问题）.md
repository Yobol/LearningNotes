# [颜色分类（荷兰国旗问题）](https://leetcode-cn.com/problems/sort-colors/)

## 题目描述

给定一个包含红色、白色和蓝色，一共`n`个元素的数组，**原地**对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

`注：不能使用代码库中的排序函数来解决这道题。`

**示例：**

```
输入: [2,0,2,1,1,0]
输出: [0,0,1,1,2,2]
```

## 解题思路

### 个人AC

最直观的解决方案是使用计数排序的两趟扫描算法。首先，计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。

```Java
class Solution {
    public void sortColors(int[] nums) {
        if (null == nums) throw new IllegalArgumentException("Input array can't be null");
        
        int[] cnts = new int[3];
        for (int i = 0; i < nums.length; i++) {
            cnts[nums[i] % 3]++;
        }
        
        int index = 0;
        for (int i = 0; i < cnts.length; i++) {
            int cnt = cnts[i];
            while (cnt-- > 0) {
                nums[index++] = i;
            }
        }
    }
}
```

**时间复杂度：** $O(2 * n)$；

**空间复杂度：** $O(1)$。

### 最优解

用三个指针（p0, p2 和curr）来分别追踪0的最右边界，2的最左边界和当前考虑的元素。

沿着数组移动 curr 指针，若nums[curr] = 0，则将其与 nums[p0]互换；若 nums[curr] = 2 ，则与 nums[p2]互换。

**思路：**

- 初始化0的最右边界：p0 = 0（在整个算法执行过程中 nums[idx < p0] = 0）；

- 初始化2的最左边界：p2 = n - 1（在整个算法执行过程中 nums[idx > p2] = 2）；

- 初始化当前考虑的元素序号 ：curr = 0；

- While curr <= p2 :
  - 若 nums[curr] = 0 ：交换第`curr`个和第`p0`个 元素，并将指针都向右移。
  - 若 nums[curr] = 2 ：交换第`curr`个和第`p2`个元素，并将 p2指针左移 。
  - 若 nums[curr] = 1 ：将指针`curr`右移。

```Java
class Solution {
    
    private void swap(int[] nums, int i, int j) {
        int tmp =  nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
    public void sortColors(int[] nums) {
        if (null == nums) throw new IllegalArgumentException("Input array can't be null");
        int n = nums.length;
        
        // p0指向0的最右边界，最终坐标小于p0的都等于0
        // p2指向2的最左边界，最终坐标大于p2的都等于2
        int p0 = 0, p2 = n - 1;
        for (int cur = 0; cur <= p2;) {
            if (nums[cur] == 0) {
                swap(nums, cur++, p0++);
            } else if (nums[cur] == 2) { 
                // 因为p2之前指向的元素属于cur未扫描到的区域，和cur指向的元素交换之后，
                // cur现在指向的元素是未被扫描过的元素，需要进行扫描，所以cur不用加一
                swap(nums, cur, p2--);
            } else {
                cur++;
            }
        }
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。
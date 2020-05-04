# [跳跃游戏]()

## 题目描述

给定一个非负整数数组，你最初位于数组的第一个位置。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个位置。

**示例 1：**

```
输入: [2,3,1,1,4]
输出: true
解释: 我们可以先跳 1 步，从位置 0 到达 位置 1, 然后再从位置 1 跳 3 步到达最后一个位置。
```

**示例 2：**

```
输入: [3,2,1,0,4]
输出: false
解释: 无论怎样，你总会到达索引为 3 的位置。但该位置的最大跳跃长度是 0 ， 所以你永远不可能到达最后一个位置。
```

## 解题思路

### 个人AC

创建一个数组`dp`，`dp[i]`表示第`i`个位置最远能够到达的下标。

从`nums`的倒数第二个元素开始向前遍历：

- 如果`nums[i] == 0`，表示当前位置不能移动，则`dp[i] = i`；
- 否则`nums[i] != 0`，表示当前位置向后最远能移动`nums[i]`个位置，和`dp`的后面`nums[i]`个元素进行比较，取最远能够到达的下标赋值给`dp[i]`。

最后判断`dp[0] >= finalPos`。

```java
class Solution {
    public boolean canJump(int[] nums) {
        int len = nums.length;
        int finalPos = len - 1;

        int[] dp = new int[len];
        for (int i = finalPos - 1; i >= 0; i--) {
            if (nums[i] != 0) {
                dp[i] = i + nums[i];
                for (int j = i + 1; j < len && j <= i + nums[i]; j++) {
                    if (dp[i] >= finalPos) break;
                    dp[i] = Math.max(dp[i], dp[j]);
                }
            } else {
                dp[i] = i;
            }
        }
        return dp[0] >= finalPos;
    }
}
```

**时间复杂度：** $O(n^2)$；

**空间复杂度：** $O(n)$。

### 最优解

#### 贪心算法

1. 如果`nums[i] > 0`，则该位置可以作为起跳点，并且后面`nums[i]`个位置都可以作为起跳点；
2. 把每一个能作为起跳点的位置都尝试一次，把能跳到的最远的距离不断更新；
3. 如果可以抵达最后的位置，则说明游戏可以成功。

```java
class Solution {
    public boolean canJump(int[] nums) {
        int len = nums.length;
        
        int furthestPos = 0;
        for (int i = 0; i < len; i++) {
            if (furthestPos < i) return false;
            furthestPos = Math.max(furthestPos, i + nums[i]);
        }
        return true;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。


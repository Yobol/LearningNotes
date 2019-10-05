# [只出现一次的数字II](https://leetcode-cn.com/problems/single-number-ii/)

## 题目描述

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。

**说明：**

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

**示例 1：**

```
输入: [2,2,3,2]
输出: 3
```

示例 2：

```
输入: [0,1,0,1,0,1,99]
输出: 99
```

### 个人AC

### [最优解](https://leetcode-cn.com/problems/single-number-ii/comments/)

```java
class Solution {
    public int singleNumber(int[] nums) {
        int a = 0, b = 0;
        for (int x : nums) {
            b = (b ^ x) & ~a;
            a = (a ^ x) & ~b;
        }
        return b;
    }
}
```

对于数x，有如下规律：

- x ^ 0 = x；
- x ^ x = 0；
- x & ~x = 0；
- x & ~0 =x。

---

![1570115263918](assets/1570115263918.png)

![img](assets/692ea5a3c41665eb227ee9a5004d9401d45ab5a68bd696d48f4635f13c01ee06-Picture1.png)

![img](assets/31442dd7264f87ad1d9812b34932db659497dddee615c6a19130ccaa56f366bc-Picture2.png)

![img](assets/93f579277878922bc661f6958864dfaf9b386c7ac25a99fb022832cb5d712776-Picture3.png)

![img](assets/d1f09d5cfa1c0b6f85e719bba2455f8c6a6d96bba48c94ecded5b36da5ee256f-Picture4.png)

![img](assets/0e5f5903a24d757a1c15e9dc49fad0780a4a3d71eb7c4a668d40ee8be0de9c77-Picture5.png)

```java
class Solution {
    public int singleNumber(int[] nums) {
        int ones = 0, twos = 0, threes = 0;
        for(int num : nums){
            twos |= ones & num;
            ones ^= num;
            threes = ones & twos;
            ones &= ~threes;
            twos &= ~threes;
        }
        return ones;
    }
}
```

![1570115374471](assets/1570115374471.png)

![img](assets/ec4d9cb6c5dc7cd56e2ca43fc778e3d63b26ae73d4deed5d282b745a90d11a29-Picture11.png)

![img](assets/3bc5bb016144a9b333cb8ad6d06265b9ec85977dfd0b4f6259408598245674e8-Picture12.png)

![img](assets/c68b1b2ded57f9a8a7e3bc2faa8bb2b434047e1be80b9d2c78b1ad0b08934be2-Picture13.png)

![img](assets/c8032b700a9b9523635f0e56b919286a0df3eef0cd0dda23ca58082895eb5449-Picture14.png)

![img](assets/0c279aa224f36fd29e039306b92e7733c8c9b7a655ec711ccef20bc353ea894a-Picture15.png)

![img](assets/63eb0f2c06f289701416eaee46a40ee56e4b685fff2b1c55ad16b00fadf3c8c8-Picture16.png)

```java
class Solution {
    public int singleNumber(int[] nums) {
        int ones = 0, twos = 0;
        for(int num : nums){
            ones = ones ^ num & ~twos;
            twos = twos ^ num & ~ones;
        }
        return ones;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(1)$。
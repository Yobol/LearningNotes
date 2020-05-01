# [快乐数](https://leetcode-cn.com/problems/happy-number/)

## 题目描述

编写一个算法来判断一个数`n`是不是快乐数。

「快乐数」定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是 **无限循环** 但始终变不到 1。如果 可以变为  1，那么这个数就是快乐数。

如果`n`是快乐数就返回`True`；不是，则返回`False`。

**示例：**

```
输入：19
输出：true
解释：
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
```

## 解题思路

### 个人AC

保存中间结果，如果当前值已经在之前出现过了，则不是快乐数。

算法分为两个部分：

1. 给定一个数字`n`，它的下一个数字是什么？【数位分离，求平方和】
2. 判断当前数字是否已经在之前出现过了？【哈希表，查找时间复杂度为O(1)】

```go
func isHappy(n int) bool {
    mapper := make(map[int]bool)
    for ; n != 1 && !mapper[n]; n, mapper[n] = next(n), true {
    }
    return n == 1
}

func next(n int) int {
    sum := 0
    for n > 0 {
        digit := n % 10
        sum += digit * digit
        n /= 10
    }
    return sum
}
```

**时间复杂度：** $O(logn)$；

**空间复杂度：** $O(logn)$。

## 最优解

### [快慢指针法](https://leetcode-cn.com/problems/happy-number/solution/kuai-le-shu-by-leetcode-solution/)

通过反复调用`next(n)`得到的链是一个隐式的链表。隐式意味着我们没有实际的链表节点和指针，但数据仍然形成链表结构。起始数字是链表的头 “节点”，链中的所有其他数字都是节点。`next`指针是通过调用`next(n)`函数获得。意识到我们实际有个链表，那么这个问题就可以转换为检测一个链表是否有环。

因此，我们不是只跟踪链表中的一个值，而是跟踪两个值，称为快跑者和慢跑者。在算法的每一步中，慢速在链表中前进 1 个节点，快跑者前进 2 个节点（对 next(n) 函数的嵌套调用）。

- 如果`n`是一个快乐数，即没有循环，那么快跑者最终会比慢跑者先到达数字 1；
- 如果`n`不是一个快乐的数字，那么最终快跑者和慢跑者将在同一个数字上相遇。

```go
func isHappy(n int) bool {
    slow, fast := n, next(n)
    for fast != 1 && fast != slow {
        fast = next(next(fast))
        slow = next(slow)
    }
    return fast == 1
} 

func next(n int) int {
    sum := 0
    for n > 0 {
        digit := n % 10
        sum += digit * digit
        n /= 10
    }
    return sum
}
```

**时间复杂度：** $O(logn)$；

**空间复杂度：** $O(1)$。






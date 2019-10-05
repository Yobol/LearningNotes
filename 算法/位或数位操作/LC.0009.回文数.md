# 回文数

## 题目描述

## 解题思路

### 个人AC

将整数转为字符数组，再从两头向中心移动进行判断。

```Java
class Solution {
    
    public boolean isPalindrome(int x) {
        if (x < 0) return false;
        
        char[] chs = new String("" + x).toCharArray();
        int i = 0, j = chs.length - 1;
        while (i <= j) {
            if (chs[i++] != chs[j--]) return false;
        }
        return true;
    }
}
```

**时间复杂度：** O(lg(x))。

**空间复杂度：** O(lg(x))。

### 最优解

将数字进行与反转，然后将反转后的数字与原数字进行比较。如果两数字相同，则这个数字就是回文的。

但是反转后的数字可能会大于`Integer.MAX_VALUE`，即会遇到整数溢出问题。

为了避免整数溢出问题，可以只考虑反转数字的一半，如果该数字是回文数，则其后半部分反转后应该与前半部分相同。

```Java
public class Solution {
    
    public boolean isPalindrome(int x) {
        // 如上所述，当 x < 0 时，x 不是回文数。
        // 同样地，如果数字的最后一位是 0，为了使该数字为回文，
        // 则其第一位数字也应该是 0
        // 只有 0 满足这一属性
        if (x < 0 || (x % 10 == 0 &&  x != 0)) return false;
        
        int reverseNumber = 0;
        // 如何知道反转数字的位数已经达到原始数字位数的一半？
        // 将原始数字除以 10，然后给反转后的数字乘上10，
        // 所以，当原始数字小于反转后的数字时，就意味着我们已经处理了一半位数的数字
        while (x > reverseNumber) {
            reverseNumber = reverseNumber * 10 + x % 10;
            x /= 10;
        }
        // 当数字长度为奇数时，可以通过 revertedNumber / 10 去除处于中位的数字
        return x == reverseNumber ||  x == reverseNumber / 10;
    }
}
```

**时间复杂度：** O(lg(x))。

**空间复杂度：** O(1)。
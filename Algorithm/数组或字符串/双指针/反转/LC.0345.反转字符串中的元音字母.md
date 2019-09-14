# 反转字符串中的元音字母

## 题目描述

编写一个函数，以字符串作为输入，反转该字符串中的元音字母。

**示例 1：**

```
输入: "hello"
输出: "holle"
```

**示例 2：**

```
输入: "leetcode"
输出: "leotcede"
```

**说明：**

元音字母不包含字母"y"。

## 解题思路

### 个人AC

定义两个分别指向字符串头尾的指针`l`和`r`，并让两个指针向中间进行移动，如果遇到字母非元音，则跳过，直到遇到元音字母，然后交换`l`和`r`所对应的元素，重复上述过程，直到`l >= r`。

```Java
import java.util.HashSet;

class Solution {
    
    private final static HashSet<Character> set = new HashSet<>(
        Arrays.asList('a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U'));
    
    public String reverseVowels(String s) {
        if (null == s) throw new IllegalArgumentException("Input argument can't be null!");
        
        char[] chs = new char[s.length()];
        int l = 0, r = chs.length - 1;
        while (l <= r) {
            while (l < r && !set.contains(s.charAt(r))) chs[r] = s.charAt(r--);
            while (l < r && !set.contains(s.charAt(l))) chs[l] = s.charAt(l++);
            
            if (l <= r) {
                chs[r] = s.charAt(l);
                chs[l++] = s.charAt(r--);
            }
        }
        
        return new String(chs);
    }
}
```

### 最优解

同上。

"cupuufxoohdfpgjdmysgvhmvffcnqxjjxqncffvmhvgsymdjgpfdhooxfuupucu"
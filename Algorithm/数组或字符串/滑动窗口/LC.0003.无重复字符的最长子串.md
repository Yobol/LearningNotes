# 无重复字符的最长子串

## 题目描述

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

```
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

示例 2:

```
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

示例 3:

```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。

请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

## 解题思路

### 个人AC

因为要找无重复字符的最长子串（即必须连续，不同于子序列），所以我们应该记录最长子串的信息，并且维持一个“滑动”的子串来不断地与最长子串进行比较。

```Java
class Solution {
    // abcbdabcaa
    public int lengthOfLongestSubstring(String s) {
        if (null == s) return 0;
        
        StringBuilder curSubstring = new StringBuilder("");
        int ml = 0; // 最大子串的长度
        int cs = 0; // 当前子串的起始位置
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            int p = curSubstring.indexOf("" + c);
            if (p < 0) { // 如果当前字符不在子串中的话，则扩充子串
                curSubstring.append(c);
            } else { // 否则，当前字符在子串中，需要根据重复字符在最大子串的位置p，更新当前子串
                cs += p + 1;
                curSubstring = new StringBuilder(s.substring(cs, i + 1));
            }
                
            if (curSubstring.length() > ml) { // 更新最大子串的长度
                ml = curSubstring.length();
            }
        }
        return ml;
    }
}
```

**时间复杂度：** O(n^2^)；

**空间复杂度：** O(1)。

思维愚钝，看了官方题解才知道原来这是一道“滑动窗口”的题目。

### 最优解

1. 使用`HashMap`来保存所有字符最后出现的位置；
2. 一旦当前字符与滑动窗口中的字符重复了，则需要更新滑动窗口的起点。

```Java
import java.util.HashMap;

public class Solution {
    
    public int lengthOfLongestSubstring(String s) {
        int n = s.length(), ml = 0; // ml为最长子串的长度
        HashMap<Character, Integer> map = new HashMap<>(); // 保存所有字符最后出现的位置
        for (int i = 0, p = 0; i < n; i++) { // p用来标记当前滑动窗口的起始位置，以计算窗口长度
            char c = s.charAt(i);
            if (map.containsKey(c)) { // 如果字符在当前子串中的话，需要重新定位滑动窗口
                // 新的滑动窗口的起点为上一个滑动窗口中的重复字符在整个字符串的位置 + 1
                p = Math.max(p, map.get(c) + 1);
            }
            ml = Math.max(ml, i - p + 1); // 更新最长子串的长度
            map.put(c, i); // 更新字符最后出现的位置
        }
        return ml;
    }
}
```

**时间复杂度：** O(n)；

**空间复杂度（HashMap）： **O(min(m, n))。

```Java
public class Solution {
    public int lengthOfLongestSubstring(String s) {
        char[] chs = s.toCharArray();
        int n = chs.length, ml = 0; // ml为最长子串的长度
        for (int i = 0, p = 0; i < n; i++) { // p用来标记当前滑动窗口的起始位置，以计算窗口长度
            for (int j = p; j < i; j++) { // 在滑动窗口chs[p, i)中寻找是否存在重复字符chs[i]
                if (chs[i] != chs[j]) continue;
                // 存在则更新滑动窗口
                p = j + 1; // 新的滑动窗口的起点为上一个滑动窗口中的重复字符在整个字符串的位置 + 1
                break;
            }
            ml = Math.max(ml, i - p + 1); // 尝试更新最长子串长度
        }
    	return ml;
    }
}
```

**时间复杂度：** O(k * n)；

**空间复杂度：**O(1)。

但是，不使用`HashMap`，效率更高。
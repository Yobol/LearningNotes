# [无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

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

因为要找无重复字符的最长子串（即必须连续，不同于子序列），所以我们应该记录最长子串的长度，并且维持一个“滑动”的子串来不断地与最长子串进行比较。

#### Java

```Java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        // 使用HashMap来保存所有字符最后出现的位置
        // 特别地，当元素较少时，可以用数组来代替HashMap提高效率
        HashMap<Character, Integer> window = new HashMap<>();
        int n = s.length(), maxSubLen = 0;
        
        // p用来标记当前滑动窗口的起始位置，以计算窗口长度
        for (int i = 0, p = 0; i < n; i++) {
            char c = s.charAt(i);
            // 当遍历到的字符存在当前于滑动窗口时，需要重新定位滑动窗口
            if (window.containsKey(c)) {
                // 新的滑动窗口的起点为当前字符在上一个滑动窗口中的位置 + 1
                p = Math.max(p, window.get(c) + 1);
            } 
            // 更新最长子串的长度
            maxSubLen = Math.max(maxSubLen, i - p + 1);
            // 更新字符最后出现的位置
            window.put(c, i);
        }
        return maxSubLen;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度（HashMap）：** $O(min(m, n))$。

### 最优解

#### Java

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

#### Golang

```go
func lengthOfLongestSubstring(s string) int {
    n, ml := len(s), 0 // ml为最长子串的长度
    for i, p := 0, 0; i < n; i++ { // p用来标记当前滑动窗口的起始位置，以计算窗口长度
        for j := p; j < i; j++ {
            if s[i] != s[j] {
                continue
            }
            // 存在则更新窗口
            p = j + 1 // 新的滑动窗口的起点为上一个滑动窗口中的重复字符在整个字符串中的位置 + 1
            break
        }
        if i - p + 1 > ml {
            ml = i - p + 1
        }
    }
    return ml
}
```

**时间复杂度：** O(k * n)；

**空间复杂度：**O(1)。

但是，不使用`HashMap`，效率更高。
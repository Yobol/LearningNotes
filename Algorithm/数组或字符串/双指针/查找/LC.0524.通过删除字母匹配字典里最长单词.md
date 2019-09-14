

# 通过删除字母匹配字典里最长单词

## 题目描述

给定一个字符串和一个字符串字典，找到字典里面最长的字符串，该字符串可以通过删除给定字符串的某些字符来得到。如果答案不止一个，返回长度最长且字典顺序最小的字符串。如果答案不存在，则返回空字符串。

**示例 1：**

```
输入:
s = "abpcplea", d = ["ale","apple","monkey","plea"]

输出: 
"apple"
```

**示例 2：**

```
输入:
s = "abpcplea", d = ["a","b","c"]

输出: 
"a"
```

**说明：**

所有输入的字符串只包含小写字母。
字典的大小不会超过 1000。
所有输入的字符串长度不会超过 1000。

## 解题思路

### 个人AC

遍历字典里的每一个字符串`target`，与给定的字符串`s`比较，如果`target`是`s`的子序列，且长度大于当前的最长子序列`longestWord`或者长度相等但字典序排在`longestWord`之前，则将`target`赋值给`longestWord`。



```Java
class Solution {
    public String findLongestWord(String s, List<String> d) {
        String longestWord = "";
        for (String target : d) {
            int ll = longestWord.length(), lt = match(s, target);
            if (ll < lt || (ll == lt && longestWord.compareTo(target) > 0)) {
                longestWord = target;
            }
        }
        return longestWord;
    }
    
    private int match(String s, String target) {
        for (int ps = 0, pt = 0; ps < s.length(); ps++) {
            if (s.charAt(ps) == target.charAt(pt)) {
                pt++;
                if (pt == target.length()) return pt;
            }
        }
        return -1;
    }
}
```

**时间复杂度：** $O(n * x)$，这里`n`是列表`d`中字符串的个数，`x`是字符串的平均长度；

**空间复杂度：** $O(x)$，使用了变量`longestWord`来存储当前最长子序列。

### 最优解

```Java
class Solution {
    public String findLongestWord(String s, List<String> d) {
        String longestWord = "";
        for (String target : d) {
            int ll = longestWord.length(), lt = target.length();
            if (!isSubsequence(s, target)) continue;
            if (ll < lt || (ll == lt && longestWord.compareTo(target) > 0)) {
            	longestWord = target;
            }
        }
        return longestWord;
    }
    
    private boolean isSubsequence(String s, String target) {
        int pt = 0;
        for (int ps = 0; ps < s.length() && pt < target.length(); ps++) {
            if (s.charAt(ps) == target.charAt(pt)) {
                pt++;
            }
        }
        return pt == target.length();
    }
}
```




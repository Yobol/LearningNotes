# [单词拆分II](https://leetcode-cn.com/problems/word-break-ii/)

## 题目描述

给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，在字符串中增加空格来构建一个句子，使得句子中所有的单词都在词典中。返回所有这些可能的句子。

**说明：**

- 分隔时可以重复使用字典中的单词。
- 你可以假设字典中没有重复的单词。

**示例 1：**

```
输入:
s = "catsanddog"
wordDict = ["cat", "cats", "and", "sand", "dog"]
输出:
[
  "cats and dog",
  "cat sand dog"
]
```

**示例 2：**

```
输入:
s = "pineapplepenapple"
wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
输出:
[
  "pine apple pen apple",
  "pineapple pen apple",
  "pine applepen apple"
]
```

**示例 3：**

```
输入:
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
输出:
[]
```

## 解题思路

### 个人AC

#### 暴力回溯

```java
class Solution {
    public List<String> wordBreak(String s, List<String> wordDict) {
        return backtrace(s, new HashSet<>(wordDict), 0);
    }

    private List<String> backtrace(String s, HashSet<String> wordDict, int start) {
        List<String> output = new LinkedList<>();

        if (start == s.length()) {
            output.add("");
        }
        
        for (int end = start + 1; end <= s.length(); end++) {
            String sub = s.substring(start, end);
            if (wordDict.contains(sub)) {
                // 调用回溯，返回end后面的子字符串能够返回的字符组合
                List<String> suffix = backtrace(s, wordDict, end);
                for (String word : suffix) {
                    output.add(sub + (word.equals("") ? "" : " ") + word);
                }
            }
        }
        return output;
    }
}
```

**时间复杂度：** $O(n^n)$，超出时间限制；

**空间复杂度：** $O(n)$。

#### 备忘录

```java
class Solution {
    public List<String> wordBreak(String s, List<String> wordDict) {
        return backtrace(s, new HashSet<>(wordDict), 0, new HashMap<>());
    }

    // 备忘录，使用哈希表来保存开始下标为start的子字符串能够返回的字符组合
    private List<String> backtrace(String s, HashSet<String> wordDict, int start, HashMap<Integer, List<String>> memo) {
        if (memo.containsKey(start)) return memo.get(start);

        List<String> output = new LinkedList<>();
        if (start == s.length()) {
            output.add("");
        }
        
        for (int end = start + 1; end <= s.length(); end++) {
            String sub = s.substring(start, end);
            if (wordDict.contains(sub)) {
                // 调用回溯，返回end后面的子字符串能够返回的字符组合
                List<String> suffix = backtrace(s, wordDict, end, memo);
                for (String word : suffix) {
                    output.add(sub + (word.equals("") ? "" : " ") + word);
                }
            }
        }
        memo.put(start, output);
        return output;
    }
}
```

**时间复杂度：** $O(n^3)$。

### 最优解

同上。
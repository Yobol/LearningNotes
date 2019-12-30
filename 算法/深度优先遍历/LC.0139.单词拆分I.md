# [单词拆分I](https://leetcode-cn.com/problems/word-break/)

## 题目描述

给定一个**非空**字符串 *s* 和一个包含**非空**单词列表的字典 *wordDict*，判定 *s*是否可以被空格拆分为一个或多个在字典中出现的单词。

**说明：**

- 拆分时可以重复使用字典中的单词。
- 你可以假设字典中没有重复的单词。

**示例 1：**

```
输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。
```

**示例 2：**

```
输入: s = "applepenapple", wordDict = ["apple", "pen"]
输出: true
解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
     注意你可以重复使用字典中的单词。
```

**示例 3：**

```
输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
输出: false
```

## 解题思路

### 个人AC

#### DFS

遍历所有的子字符串组合可能。

```java
class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        return dfs(s, new HashSet<>(wordDict), 0);
    }

    private boolean dfs(String s, HashSet<String> set, int start) {
        if (start == s.length()) return true;

        // the bound of s.substring(start, end), namely [0, s.length()), so end <= s.length()
        for (int end = start + 1; end <= s.length(); end++) {
            if (set.contains(s.substring(start, end)) && dfs(s, set, end)) {
                return true;
            }
        }
        return false;
    }
}
```

**时间复杂度：** $O(n^n)$，超出时间限制；

**空间复杂度：** $O(n)$。

### 最优解

#### 记忆化回溯

在DFS方法中，没有对重复情况进行剪枝，会导致对相同的字符串多次调用DFS方法。因此，可以使用一个`memo`数组来保存子问题的结果。每当访问到已经访问过的后缀串，直接返回`memo`数组中的值。

```java
class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        return dfs(s, new HashSet<>(wordDict), 0, new Boolean[s.length()]);
    }

    private boolean dfs(String s, HashSet<String> set, int start, Boolean[] memo) {
        if (start == s.length()) return true;

        if (memo[start] != null) return memo[start];

        // the bound of s.substring(start, end), namely [0, s.length()), so end <= s.length()
        for (int end = start + 1; end <= s.length(); end++) {
            if (set.contains(s.substring(start, end)) && dfs(s, set, end, memo)) {
                return memo[start] = true;
            }
        }
        return memo[start] = false;
    }
}
```

时间复杂度： $O(n^2)$，DFS最多调用n^2^次；

空间复杂度： $O(n)$，DFS深度最多达到n层。
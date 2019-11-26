# [分割字符串]()

## 题目描述

给定一个字符串 *s*，将 *s* 分割成一些子串，使每个子串都是回文串。

返回 *s* 所有可能的分割方案。

**示例：**

```
输入: "aab"
输出:
[
  ["aa","b"],
  ["a","a","b"]
]
```

## 解题思路

### 个人AC

```java
class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> output = new LinkedList<>();
        dfs(output, new LinkedList<>(), s, 0, s.length() - 1);
        return output;
    }

    private void dfs(List<List<String>> outer, List<String> inner, String s, int start, int end) {
        if (start >= s.length()) {
            outer.add(new LinkedList<>(inner));
            return;
        }

        for (int i = start; i <= end; i++) {
            String sub = s.substring(start, i + 1);
            if (isPalindrome(sub)) {
                inner.add(sub);
                dfs(outer, inner, s, i + 1, end);
                inner.remove(inner.size() - 1);
            }
        }
    }

    private boolean isPalindrome(String s) {
        int start = 0, end = s.length() - 1;
        while (start < end) {
            if (s.charAt(start++) != s.charAt(end--)) return false;
        }
        return true;
    }
}
```

### 最优解

同上。
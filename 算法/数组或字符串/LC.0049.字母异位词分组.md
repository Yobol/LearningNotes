# [字母异位词分组](https://leetcode-cn.com/problems/group-anagrams/)

## 题目描述

给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

**示例 1：**

```
输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
输出:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```

**说明：**

- 所有输入均为小写字母；
- 不考虑答案输出的顺序。

## 解题思路

## 个人AC

**暴力求解——超出时间限制**

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> groups = new ArrayList<>();
        for (String str : strs) {
            boolean hasGroup = false;
            for (List<String> group : groups) {
                if (areAnagrams(str, group.get(0))) {
                    group.add(str);
                    hasGroup = true;
                    break;
                }
            }
            if (!hasGroup) {
                List<String> group = new ArrayList<>();
                group.add(str);
                groups.add(group);
            }
        }
        return groups;
    }

    private boolean areAnagrams(String a, String b) {
        if (a.length() != b.length()) return false;
        HashMap<Character, Integer> compositionOfA = new HashMap<>();
        HashMap<Character, Integer> compositionOfB = new HashMap<>();
        for (int i = 0; i < a.length(); i++) {
            compositionOfA.put(a.charAt(i), compositionOfA.getOrDefault(a.charAt(i), 0) + 1);
            compositionOfB.put(b.charAt(i), compositionOfB.getOrDefault(b.charAt(i), 0) + 1);
        }
        for (Character c : compositionOfA.keySet()) {
            if (!compositionOfB.containsKey(c) || compositionOfB.get(c) != compositionOfA.get(c)) {
                return false;
            }
        }
        return true;
    }
}
```

### 最优解

#### 排序数组分类

**思路**

- 当两个字符串排序后相等时，它们是字母异位词。

**算法**

- 维护一个`HashMap<String, List>`，其中`Key`是一个排序字符串，`Value`为原数组中排序后等于`K`的字符串列表。

**实现**

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> groups = new ArrayList<>();

        Map<String, List> map = new HashMap<>();
        for (String str : strs) {
            char[] chs = str.toCharArray();
            Arrays.sort(chs);
            String key = String.valueOf(chs);
            if (!map.containsKey(key)) {
                map.put(key, new ArrayList<>());
            }
            map.get(key).add(str);
        }

        for (List group : map.values()) {
            groups.add(group);
        }
        return groups;
    }
}
```

**时间复杂度：** $O(NKlogK)$，其中`N`是给定字符串数组的长度，`K`是给定字符串数组中字符串的最大长度。遍历字符串数组的复杂度为$O(N)$，对每个字符串排序的复杂度为$O(KlogK)$；

**空间复杂度：** $O(NK)$。

#### 计数分类

**思路**

- 当两个字符串中每个字符出现的次数都相同时，它们是字母异位词。

**算法**

- 将每个字符串借助字符计数器转换为一个以特殊分隔符分隔的字符串。

**实现**

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> groups = new ArrayList<>();
        Map<String, List> map = new HashMap<>();
        
        int[] counter = new int[26];
        for (String str : strs) {
            Arrays.fill(counter, 0); // 重置计数器
            for (int i = 0; i < str.length(); i++) {
                counter[str.charAt(i) - 'a']++;
            }
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < counter.length; i++) {
                sb.append('#');
                sb.append(counter[i]);
            }
            String key = sb.toString();
            if (!map.containsKey(key)) {
                map.put(key, new ArrayList<>());
            }
            map.get(key).add(str);
        }

        for (List group : map.values()) {
            groups.add(group);
        }
        return groups;
    }
}
```

**时间复杂度：** $O(NK)$，其中`N`是给定字符串数组的长度，`K`是给定字符串数组中字符串的最大长度；

**空间复杂度：** $O(NK)$。
# [根据字符出现频率排序](https://leetcode-cn.com/problems/sort-characters-by-frequency/)

给定一个字符串，请将字符串里的字符按照出现的频率降序排列。

**示例 1：**

```
输入:
"tree"

输出:
"eert"

解释:
'e'出现两次，'r'和't'都只出现一次。
因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
```

**示例 2：**

```
输入:
"cccaaa"

输出:
"cccaaa"

解释:
'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
注意"cacaca"是不正确的，因为相同的字母必须放在一起。
```

**示例 3：**

```
输入:
"Aabb"

输出:
"bbAa"

解释：
此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
注意'A'和'a'被认为是两种不同的字符。
```

## 解题思路

### 个人AC

首先使用`HashMap`来统计字符串中各字符出现的次数，然后使用`桶排序`的思想基于`出现频次`进行排序。

```Java
class Solution {
    
    // 核心思想： 桶排序
    public String frequencySort(String s) {
        // 首先统计字符串中的每个字符出现的频次
        HashMap<Character, Integer> counters = new HashMap<>();
        for (char c : s.toCharArray()) {
            counters.put(c, counters.getOrDefault(c, 0) + 1);
        }
        
        // 按照出现的频次和出现的先后次序排序
        List<Character>[] buckets = new List[s.length() + 1];
        for (char c : counters.keySet()) {
            // 按照字符出现的频次分桶
            int counter = counters.get(c);
            if (buckets[counter] == null) {
                buckets[counter] = new ArrayList<>();
            }
            buckets[counter].add(c);
        }
        
        char[] chs = new char[s.length()];
        // 倒序遍历桶中的元素，对原字符串进行排序
        for (int i = buckets.length - 1, k = 0; i > 0; i--) {
            if (buckets[i] == null) continue;
            for (char c : buckets[i]) {
                for (int j = 0; j < i; j++) {
                    chs[k++] = c;
                }
            }
        }
        return new String(chs);
    }
}
```

**时间复杂度：** 平均复杂度$O(n)$；

**空间复杂度：** $O(n)$。

### 最优解

同上。


# [电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

## 题目描述

给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![img](assets/17_telephone_keypad.png)

**示例：**

```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

**说明：**

尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

## 解题思路

### 个人AC

回溯法能够遍历问题的所有情况，适用于复杂、规模较大的情况，如排列组合问题。

```java
class Solution {
    
    
    public List<String> letterCombinations(String digits) {
        HashMap<Character, String> keyboard = new HashMap<>();
        keyboard.put('2', "abc");
        keyboard.put('3', "def");
        keyboard.put('4', "ghi");
        keyboard.put('5', "jkl");
        keyboard.put('6', "mno");
        keyboard.put('7', "pqrs");
        keyboard.put('8', "tuv");
        keyboard.put('9', "wxyz");
        
        List<String> res = new ArrayList<>();
        if (digits == null || digits.length() == 0) {
            return res;
        }
        dfs(keyboard, res, digits, 0, "");
        return res;
    }
    
    /**
      * @param dIndex: int 定位到digits中的第dIndex个元素
      */
    private void dfs(HashMap<Character, String> keyboard, List<String> output, String digits, int dIndex, String combination) {
        if (dIndex == digits.length()) {
            output.add(combination);
            return;
        }
        
        // 迭代数字digit对应的所有字符characters
        // cIndex定位到keyboard.get(digits.charAt(dIndex))中的第cIndex个字符
        String characters = keyboard.get(digits.charAt(dIndex));
        for (int cIndex = 0; cIndex < characters.length(); cIndex++) {
            char c = characters.charAt(cIndex);
            // 将当前的字符加到combination后，递归到下一个数字
            dfs(keyboard, output, digits, dIndex + 1, combination + c);
        }
    }
}
```

时间复杂度： $O(3^m * 4^n)$，m、n分别表示给定数字串digits中数字对应字符数为3或4个的数量；

空间复杂度： $O(3^m * 4^n)$。

### 最优解

同上。
# [最长有效括号](https://leetcode-cn.com/problems/longest-valid-parentheses/)

## 题目描述

给定一个只包含 `'('` 和 `')'` 的字符串，找出最长的包含有效括号的子串的长度。

**示例 1：**

```
输入: "(()"
输出: 2
解释: 最长有效括号子串为 "()"
```

**示例 2：**

```
输入: ")()())"
输出: 4
解释: 最长有效括号子串为 "()()"
```

## 解题思路

### 个人AC

#### 暴力法

将字符串中的每一个字符作为首字符来判断是否为有效括号序列。

#### 滑动窗口

- 遇到`(`就将其下标放入栈中；
- 遇到`)`，先弹出栈顶元素：
  - 如果栈为空，则将`(`下标放入栈中；
  - 如果栈非空，则计算当前`(`的下标与栈顶元素的差值，并更新最大长度；
- 特别地，可以先在栈中放入`-1`来简化逻辑。

```java
class Solution {
    public int longestValidParentheses(String s) {
        int maxLen = 0;
        Stack<Integer> stack = new Stack<>(); // 滑动窗口
        stack.push(-1);
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(') {
                stack.push(i);
            } else if (c == ')') {
                stack.pop();
                if (stack.isEmpty()) {
                    stack.push(i);
                } else {
                    maxLen = Math.max(maxLen, i - stack.peek());
                }
            }
        }
        return maxLen;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(n)$。

### 最优解

可以使用额外的变量来替换掉栈，使得空间复杂度可以降为$O(1)$。

用`left`和`right`来记录`()`的数量，以寻找最长有效括号序列。

```java
public class Solution {
    public int longestValidParentheses(String s) {
        int left = 0, right = 0, maxLen = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                left++;
            } else {
                right++;
            }
            if (left == right) {
                maxLen = Math.max(maxLen, 2 * right);
            } else if (right > left) {
                left = right = 0;
            }
        }
        // 因为从左到右遍历时，最终会出现left > right的情况
        // ()(()
        left = right = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            if (s.charAt(i) == '(') {
                left++;
            } else {
                right++;
            }
            if (left == right) {
                maxLen = Math.max(maxLen, 2 * left);
            } else if (left > right) {
                left = right = 0;
            }
        }
        return maxLen;
    }
}
```

**时间复杂度：** $O(n)$；

**空间复杂度：** $O(n)$。
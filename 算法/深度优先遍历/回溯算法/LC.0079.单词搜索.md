# [单词搜索](https://leetcode-cn.com/problems/word-search/)

## 题目描述

给定一个二维网格和一个单词，找出该单词是否存在于网格中。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

```
board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

给定 word = "ABCCED", 返回 true.
给定 word = "SEE", 返回 true.
给定 word = "ABCB", 返回 false.
```

## 解题思路

### 个人AC

```java
class Solution {
    public boolean exist(char[][] board, String word) {
        int rows = board.length, cols = board[0].length;
        boolean[][] walked = new boolean[rows][cols];
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                // 以棋盘中的每个格子作为起始，执行搜索
                if (dfs(board, row, col, walked, word, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean dfs(char[][] board, int row, int col, boolean[][] walked, String word, int len) {
        if (len == word.length()) return true;

        // 是否越界
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) return false;
        // 棋子是否已被访问过
        if (walked[row][col]) return false;
        // 是否匹配
        if (board[row][col] != word.charAt(len)) return false;
        // 标记棋子已被访问
        walked[row][col] = true;
        // 从匹配棋子向四周延展
        if (
            dfs(board, row - 1, col, walked, word, len + 1) ||
            dfs(board, row, col + 1, walked, word, len + 1) ||
            dfs(board, row + 1, col, walked, word, len + 1) ||
            dfs(board, row, col - 1, walked, word, len + 1)
        ) {
            return true;
        }
        // backtrace
        walked[row][col] = false;
        return false;
    }
}
```

### 最优解

同上。
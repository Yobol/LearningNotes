# [有效的数独](https://leetcode-cn.com/problems/valid-sudoku/)

## 题目描述

判断一个`9x9`的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。

- 数字`1-9`在每一行只能出现一次。
- 数字`1-9`在每一列只能出现一次。
- 数字`1-9`在每一个以粗实线分隔的`3x3`宫内只能出现一次。

![img](assets/250px-Sudoku-by-L2G-20050714.svg.png)

上图是一个部分填充的有效的数独。

数独部分空格内已填入了数字，空白格用`'.'`表示。

**示例 1：**

```
输入:
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出: true
```

**示例 2：**

```
输入:
[
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出: false
解释: 除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。
     但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。
```

**说明：**

- 一个有效的数独（部分已被填充）不一定是可解的。
- 只需要根据以上规则，验证已经填入的数字是否有效即可。
- 给定数独序列只包含数字`1-9`和字符`'.'`。
- 给定数独永远是`9x9`形式的。

## 解题思路

### 个人AC

**暴力法**

遍历数独中的每一个数字，将它与：

- 同宫的数字；

- 每一行的非同宫右方数字；

  每一列的非同宫下方数字；

进行验重。

```java
class Solution {
    public boolean isValidSudoku(char[][] board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') continue;
                // 同宫
                for (int i = r / 3 * 3; i < (r / 3 + 1) * 3; i++) { // 行
                    for (int j = c / 3 * 3; j < (c / 3 + 1) * 3; j++) { // 列
                        System.out.println(i + " , " + j);
                        if (board[i][j] == '.') continue;
                        if (r == i && c == j) continue;
                        if (board[r][c] == board[i][j]) {
                            return false;
                        }
                    }
                }
                // 同一列非同宫下方
                for (int i = (r / 3 + 1) * 3; i < 9; i++) {
                    if (board[i][c] == '.') continue;
                    if (board[r][c] == board[i][c]) return false;
                }
                // 同一行非同宫右方
                for (int j = (c / 3 + 1) * 3; j < 9; j++) {
                    if (board[r][j] == '.') continue;
                    if (board[r][c] == board[r][j]) return false;
                }
            }
        }
        return true;
    }
}
```

### 最优解

**借助HashMap：**

```java

15 / 15
JavaPython
class Solution {
  public boolean isValidSudoku(char[][] board) {
    // init data
    HashMap<Integer, Integer> [] rows = new HashMap[9];
    HashMap<Integer, Integer> [] columns = new HashMap[9];
    HashMap<Integer, Integer> [] boxes = new HashMap[9];
    for (int i = 0; i < 9; i++) {
      rows[i] = new HashMap<Integer, Integer>();
      columns[i] = new HashMap<Integer, Integer>();
      boxes[i] = new HashMap<Integer, Integer>();
    }

    // validate a board
    for (int i = 0; i < 9; i++) {
      for (int j = 0; j < 9; j++) {
        char num = board[i][j];
        if (num != '.') {
          int n = (int)num;
          int box_index = (i / 3 ) * 3 + j / 3;

          // keep the current cell value
          rows[i].put(n, rows[i].getOrDefault(n, 0) + 1);
          columns[j].put(n, columns[j].getOrDefault(n, 0) + 1);
          boxes[box_index].put(n, boxes[box_index].getOrDefault(n, 0) + 1);

          // check if this value has been already seen before
          if (rows[i].get(n) > 1 || columns[j].get(n) > 1 || boxes[box_index].get(n) > 1)
            return false;
        }
      }
    }

    return true;
  }
}
```

**时间复杂度：** $O(1)$，我们只对所有单元格进行了一次迭代。

**空间复杂度：** $O(1)$。

**位运算：**

```java
/*
    使用位运算, 减少哈希的空间开支
*/
class Solution {
    public boolean isValidSudoku(char[][] board) {
        int[] rows = new int[9]; // 每个元素代表一行，用位的偏移表示行中的数
        int[] cols = new int[9];
        int[] boxes = new int[9];
        for(int r = 0; r < 9; r++){
            for(int c = 0; c < 9; c++){
                if(board[r][c] == '.') continue;
                int num = board[r][c] - '0';
                // 处理行
                if(!valid(rows, r, num)) return false;
                // 处理列
                if(!valid(cols, c, num)) return false;
                // 处理子数独
                int index = r / 3 * 3 + c / 3; // 0 - 9
                if(!valid(boxes, index, num)) return false;
            }
        }
        return true;
    }
    public boolean valid(int[] arr, int i, int cur){
        // cur出现过, 返回false
        if(((arr[i] >> cur) & 1) == 1) return false;
        // cur没出现过, 标记为出现过
        arr[i] = arr[i] | (1 << cur);
        return true;
    }
}
```

参考：[Java 击败100% 简洁位运算](https://leetcode-cn.com/problems/valid-sudoku/solution/java-ji-bai-100-jian-ji-wei-yun-suan-by-littlehaes/)
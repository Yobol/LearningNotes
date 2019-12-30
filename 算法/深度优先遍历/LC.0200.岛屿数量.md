# [岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)

## 题目描述

给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围。

**示例 1：**

```
输入:
11110
11010
11000
00000

输出: 1
```

**示例 2：**

```
输入:
11000
11000
00100
00011

输出: 3
```

## 解题思路

### 个人AC

遍历数组中的每一个元素：

- 如果脚下（遍历到的元素）是陆地，则进行拓展（dfs），并且将“走”过的地方进行标记。
- 如果脚下（遍历到的元素）是水或者已经被标记过的陆地，则停止dfs。

```java
class Solution {
    public int numIslands(char[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) return 0;
        
        int num = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                num += isolated(grid, i, j) ? 1 : 0;
            }
        }
        return num;
    }

    private boolean isolated(char[][] grid, int i, int j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) return false;

        if (grid[i][j] == '#' || grid[i][j] == '0') return false;
        grid[i][j] = '#';
        return isolated(grid, i - 1, j) | isolated(grid, i + 1, j) | isolated(grid, i, j - 1) | isolated(grid, i, j + 1) | true;
    }
}
```

**时间复杂度：** $O(m*n)$，所有元素都仅被访问一次；

**空间复杂度：** $O(m*n)$，DFS的栈深度，最坏情况下为`m*n`，即整个矩阵都为1。

### 最优解

也可将遍历过的元素置为0：

```java
class Solution {
    public int numIslands(char[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) return 0;
        
        int num = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '0') continue;
                num++;
                dfs(grid, i, j); // 每次dfs后都将整块陆地置为0
            }
        }
        return num;
    }

    private void dfs(char[][] grid, int i, int j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) return;

        if (grid[i][j] == '0') return;
        grid[i][j] = '0';
        
        dfs(grid, i - 1, j);
        dfs(grid, i + 1, j);
        dfs(grid, i, j - 1);
        dfs(grid, i, j + 1);
    }
}
```

能够减少函数调用次数，提高效率。


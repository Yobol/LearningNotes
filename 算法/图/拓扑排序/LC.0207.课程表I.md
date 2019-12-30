# [课程表](https://leetcode-cn.com/problems/course-schedule/)

## 题目描述

现在你总共有`n`门课需要选，记为`0`到`n-1`。

在选修某些课程之前需要一些先修课程。 例如，想要学习课程`0`，你需要先完成课程`1`，我们用一个匹配来表示他们: `[0,1]`

给定课程总量以及它们的先决条件，判断是否可能完成所有课程的学习？

**示例 1：**

```
输入: 2, [[1,0]] 
输出: true
解释: 总共有 2 门课程。学习课程 1 之前，你需要完成课程 0。所以这是可能的。
```

**示例 2：**

```
输入: 2, [[1,0],[0,1]]
输出: false
解释: 总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0；并且学习课程 0 之前，你还应先完成课程 1。这是不可能的。
```

**说明：**

- 输入的先决条件是由边缘列表表示的图形，而不是邻接矩阵。详情请参见图的表示法。
- 你可以假定输入的先决条件中没有重复的边。

**提示：**

- 这个问题相当于查找一个循环是否存在于有向图中。如果存在循环，则不存在拓扑排序，因此不可能选取所有课程进行学习。
- 通过 DFS 进行拓扑排序 - 一个关于Coursera的精彩视频教程（21分钟），介绍拓扑排序的基本概念。
- 拓扑排序也可以通过 BFS 完成。

## 解题思路

### 个人AC

```java
class Solution {
    private boolean cycle = false;

    public boolean canFinish(int numCourses, int[][] prerequisites) {
        if (numCourses <= 0) return false;
        if (prerequisites.length == 0) return true;
        
        boolean[] marked = new boolean[numCourses];
        boolean[] onStack = new boolean[numCourses];
        HashMap<Integer, List<Integer>> adj = new HashMap<>();
        for (int v = 0; v < numCourses; v++) {
            adj.put(v, new LinkedList<>());
        }
        for (int i = 0; i < prerequisites.length; i++) {
            adj.get(prerequisites[i][0]).add(prerequisites[i][1]);
        }

        for (int v = 0; v < numCourses; v++) {
            if (!marked[v]) hasCycle(v, adj, marked, onStack);
        }
        return !this.cycle;
    }

    private void hasCycle(int v, HashMap<Integer, List<Integer>> adj, boolean[] marked, boolean[] onStack) {
        onStack[v] = true;
        marked[v] = true;
        for (int w : adj.get(v)) {
            if (this.cycle) {
                return;
            } else if (!marked[w]) {
                hasCycle(w, adj, marked, onStack);
            } else if (onStack[w]) {
                cycle = true;
            }
        }
        onStack[v] = false;
    }
}
```

**时间复杂度：** $O(V + E)$；

**空间复杂度：** $O(V)$。

```java
class Solution {

    public boolean canFinish(int numCourses, int[][] prerequisites) {
        if (numCourses <= 0) return false;
        int pLen = prerequisites.length;
        if (pLen == 0) return true;

        // 默认为0，表示未被访问；1表示正在访问中；2表示已经访问完了
        int[] marked = new int[numCourses];
        // 邻接表
        HashSet<Integer>[] adj = new HashSet[numCourses];
        for (int v = 0; v < numCourses; v++) {
            adj[v] = new HashSet<>();
        }
        for (int i = 0; i < prerequisites.length; i++) {
            adj[prerequisites[i][0]].add(prerequisites[i][1]);
        }

        for (int v = 0; v < numCourses; v++) {
            if (hasCycle(v, adj, marked)) {
                return false;
            }
        }

        return true;
    }

    private boolean hasCycle(int v, HashSet<Integer>[] adj, int[] marked) {
        if (marked[v] == 1) {
            // 当前结点正在当前访问链中被访问，说明有环
            return true;
        }
        if (marked[v] == 2) {
            // 当前访问链中没有遇到环，该节点在其他访问链中已经被访问过了
            return false;
        }
        // 将当前结点标明为正在访问中
        marked[v] = 1;
        for (int w : adj[v]) {
            if (hasCycle(w, adj, marked)) {
                return true;
            }
        }
        // 访问链走完，未发现环
        marked[v] = 2;
        return false;
    }
}
```

**时间复杂度：** $O(V + E)$；

**空间复杂度：** $O(V)$。

### 最优解

同上。
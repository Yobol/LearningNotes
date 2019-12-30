# [课程表II](https://leetcode-cn.com/problems/course-schedule-ii/)

## 题目描述

现在你总共有 n 门课需要选，记为 0 到 n-1。

在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们: [0,1]

给定课程总量以及它们的先决条件，返回你为了学完所有课程所安排的学习顺序。

可能会有多个正确的顺序，你只要返回一种就可以了。如果不可能完成所有课程，返回一个空数组。

**示例 1：**

```
输入: 2, [[1,0]] 
输出: [0,1]
解释: 总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1] 。
```

**示例 2：**

```
输入: 4, [[1,0],[2,0],[3,1],[3,2]]
输出: [0,1,2,3] or [0,2,1,3]
解释: 总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
     因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。
```

**说明：**

- 输入的先决条件是由边缘列表表示的图形，而不是邻接矩阵。详情请参见[图的表示法](http://blog.csdn.net/woaidapaopao/article/details/51732947)。
- 你可以假定输入的先决条件中没有重复的边。

**提示：**

- 这个问题相当于查找一个循环是否存在于有向图中。如果存在循环，则不存在拓扑排序，因此不可能选取所有课程进行学习。
- [通过 DFS 进行拓扑排序](https://www.coursera.org/specializations/algorithms) - 一个关于Coursera的精彩视频教程（21分钟），介绍拓扑排序的基本概念。
- 拓扑排序也可以通过[BFS](https://baike.baidu.com/item/%E5%AE%BD%E5%BA%A6%E4%BC%98%E5%85%88%E6%90%9C%E7%B4%A2/5224802?fr=aladdin&fromid=2148012&fromtitle=%E5%B9%BF%E5%BA%A6%E4%BC%98%E5%85%88%E6%90%9C%E7%B4%A2)完成。

## 解题思路

### 个人AC

拓扑排序的前提是检测有向环：只有有向无环图才可以进行拓扑排序。

算法 4（P376)：一副有向无环图的拓扑排序可以由图的顶点的逆后续排列。

```java
class Solution {

    public int[] findOrder(int numCourses, int[][] prerequisites) {
        if (numCourses <= 0) return new int[0];
        int[] order = new int[numCourses];
        Stack<Integer> stack = new Stack<>();
        int pLen = prerequisites.length;
        if (pLen == 0) {
            for (int i = 0; i < numCourses; i++) order[i] = i;
            return order;
        }

        // 默认为0，表示未被访问；1表示正在访问中；2表示已经访问完了
        int[] marked = new int[numCourses];
        // 邻接表
        HashSet<Integer>[] adj = new HashSet[numCourses];
        for (int v = 0; v < numCourses; v++) {
            adj[v] = new HashSet<>();
        }
        for (int i = 0; i < pLen; i++) {
            adj[prerequisites[i][1]].add(prerequisites[i][0]);
        }

        for (int v = 0; v < numCourses; v++) {
            if (hasCycle(v, adj, marked, stack)) {
                return new int[0];
            }
        }
        int i = 0;
        while (!stack.isEmpty()) {
            order[i++] = stack.pop();
        }
        return order;
    }

    private boolean hasCycle(int v, HashSet<Integer>[] adj, int[] marked, Stack<Integer> stack) {
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
            if (hasCycle(w, adj, marked, stack)) {
                return true;
            }
        }
        
        stack.push(v); // 在DFS方式遍历图时获得其顶点的逆后续排列
        // 访问链走完，未发现环
        marked[v] = 2;
        return false;
    }
}
```

### 最优解

同上。


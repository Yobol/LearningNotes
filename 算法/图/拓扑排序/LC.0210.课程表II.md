# [课程表II](https://leetcode-cn.com/problems/course-schedule-ii/)

## 题目描述

现在你总共有 n 门课需要选，记为 0 到 n-1。

在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们: [0,1]。

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

#### 深度优先搜索

拓扑排序的前提是检测有向环：只有有向无环图才可以进行拓扑排序。

> 《算法 4》（P376)：一副有向无环图的拓扑排序可以由图的顶点的逆后续排列。

##### 思路

我们可以将深度优先搜索的流程与拓扑排序的求解联系起来，用一个栈来存储所有已经搜索完成的节点。

> 对于一个节点 u，如果它的所有相邻节点都已经搜索完成，那么在搜索回溯到 u 的时候，u 本身也会变成一个已经搜索完成的节点。这里的「相邻节点」指的是从 u 出发通过一条有向边可以到达的所有节点。

假设我们当前搜索到了节点 u，如果它的所有相邻节点都已经搜索完成，那么这些节点都已经在栈中了，此时我们就可以把 u 入栈。可以发现，如果我们从栈顶往栈底的顺序看，由于 u 处于栈顶的位置，那么 u 出现在所有 u 的相邻节点的前面。因此对于 u 这个节点而言，它是满足拓扑排序的要求的。

这样以来，我们对图进行一遍深度优先搜索。当每个节点进行回溯的时候，我们把该节点放入栈中。最终从栈顶到栈底的序列就是一种拓扑排序。

##### 算法

对于图中的任意一个节点，它在搜索的过程中有三种状态，即：

- 「未搜索」：我们还没有搜索到这个节点；
- 「搜索中」：我们搜索过这个节点，但还没有回溯到该节点，即该节点还没有入栈，还有相邻的节点没有搜索完成）；
- 「已完成」：我们搜索过并且回溯过这个节点，即该节点已经入栈，并且所有该节点的相邻节点都出现在栈的更底部的位置，满足拓扑排序的要求。

通过上述的三种状态，我们就可以给出使用深度优先搜索得到拓扑排序的算法流程，在每一轮的搜索搜索开始时，我们任取一个「未搜索」的节点开始进行深度优先搜索。

- 我们将当前搜索的节点 u 标记为「搜索中」，遍历该节点的每一个相邻节点 v：
  - 如果 v 为「未搜索」，那么我们开始搜索 v，待搜索完成回溯到 u；
  - 如果 v 为「搜索中」，那么我们就找到了图中的一个环，因此是不存在拓扑排序的；
  - 如果 v 为「已完成」，那么说明 v 已经在栈中了，而 u 还不在栈中，因此 u 无论何时入栈都不会影响到 (u, v) 之前的拓扑关系，以及不用进行任何操作。
- 当 u 的所有相邻节点都为「已完成」时，我们将 u 放入栈中，并将其标记为「已完成」。

在整个深度优先搜索的过程结束后，如果我们没有找到图中的环，那么栈中存储这所有的 n 个节点，从栈顶到栈底的顺序即为一种拓扑排序。

##### Java

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

##### Golang

```go
func findOrder(numCourses int, prerequisites [][]int) []int {
    if numCourses <= 0 {
        return make([]int, 0)
    }
    order := make([]int, numCourses)
    pLen := len(prerequisites)
    if pLen == 0 {
        for i := 0; i < pLen; i++ {
            order[i] = i
        }
        return order
    }
    
}
```

### 最优解

同上。


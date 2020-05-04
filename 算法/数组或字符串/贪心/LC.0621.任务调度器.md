# [任务调度器](https://leetcode-cn.com/problems/task-scheduler/)

## 题目描述

给定一个用字符数组表示的 CPU 需要执行的任务列表。其中包含使用大写的 A - Z 字母表示的26 种不同种类的任务。任务可以以任意顺序执行，并且每个任务都可以在 1 个单位时间内执行完。CPU 在任何一个单位时间内都可以执行一个任务，或者在待命状态。

然而，两个相同种类的任务之间必须有长度为 n 的冷却时间，因此至少有连续 n 个单位时间内 CPU 在执行不同的任务，或者在待命状态。

你需要计算完成所有任务所需要的最短时间。

**示例 1：**

```
输入: tasks = ["A","A","A","B","B","B"], n = 2
输出: 8
执行顺序: A -> B -> (待命) -> A -> B -> (待命) -> A -> B.
```

**注：**

1. 任务的总个数为 [1, 10000]。
2. n 的取值范围为 [0, 100]。

## 解题思路

### 个人AC

```java
class Solution {
    public int leastInterval(char[] tasks, int n) {
        int st = 0;
        int[] cnts = new int[26];
        int total = 0;
        for (int i = 0; i < tasks.length; i++) {
            cnts[tasks[i] - 'A']++;
            total++;
        }
        // 记录任务'X'最后一次执行的时间，从1开始
        // key的类型为Integer，A对应0，B对应1，依此类推...
        // value的类型为Integer，对应其最后一次出现的时间
        HashMap<Integer, Integer> map = new HashMap<>();
        while (total > 0) {
            for (int i = 0; total > 0 && i < cnts.length; i++) {
                if (cnts[i] == 0) continue;

                cnts[i]--;
                total--;
                
                if (map.containsKey(i)) {
                    int interval = st - map.get(i);
                    if (n - interval > 0) st += n - interval;
                }
                st += 1;
                map.put(i, st);
                System.out.println(st);
            }
        }
        return st;
    }
}
```

未通过。

应该在相同任务等待间隔中尽可能地安排其他任务。

### 最优解

#### 排序

---

由于相同的任务之间必须有 n 的冷却时间，所以我们可以想到按照任务的数量来安排它们，即一种任务的出现次数越多，我们就越早地安排。例如有 5 种任务 A, B, C, D, E，且它们分别有 6, 1, 1, 1, 1 个时，假设冷却时间 n = 2，那么我们首先安排任务 A，随后在 2 单位的冷却时间里，我们安排任务 B, C，随后继续安排任务 A，再安排任务 D, E，以此类推。

因此我们得到了一种安排的方法：我们规定 n + 1 个任务为一轮，这样的好处是同一轮中一个任务最多只能被安排一次。在每一轮中，我们将当前的任务按照它们剩余的次数降序排序，并选择剩余次数最多的 n + 1 个任务依次执行。如果任务的种类 t 少于 n + 1 个，就只选择全部的 t 种任务，其余的时间空闲。这样做的正确性在于，由于冷却时间的存在，出现次数较多的那些任务如果不尽早安排，将会导致大量空闲时间的出现，因此**贪心地将出现次数较多的任务安排在前面是合理的**。同时我们可以保证，这一轮的第 k 个任务距离上一次执行至少有 n 个单位的冷却时间。我们可以使用逆向思维来证明：假设第 r 轮中某个任务在第 k 个执行，那么说明它在第 r 轮时为数量第 k 多的任务。在第 r 轮结束后，第 1 多到第 k 多的任务的数量都会减少 1，因此在第 r + 1 轮，这个任务最多也只能是数量第 k 多，因此它如果被执行，一定满足冷却时间的要求。

根据上面的安排方法，我们每一轮选择不超过 n + 1 个任务执行，直到所有的任务被执行。

---

1. 将任务按类型进行分组，统计个数；
2. 对得到的分组进行排序；
3. 首先排列个数最多的任务T，需要的时间最多为 T -> X * n -> T -> X * n -> T：
   - st = (m - 1) * (n + 1) + 1；
4. 统计后续和个数最多的任务T数量相同的任务，T -> X * n -> T -> X * n -> T -> A -> B -> C。

```java
class Solution {
    public int leastInterval(char[] tasks, int n) {
        if (tasks.length <= 1 || n < 1) return tasks.length;

        int st = 0;
        // 将任务按类型分组
        int[] cnts = new int[26];
        for (char task : tasks) {
            cnts[task - 'A']++;
        }
        // 将cnts按从小到大的顺序排序，优先排列个数最多的任务
        Arrays.sort(cnts);
        int i = 25; // 个数最多的任务
        // 只排列个数最多的任务T，需要的时间至少为 T -> X * n -> T -> X * n -> T
        st = (cnts[i--] - 1) * (n + 1) + 1;
        // 如果后面的任务有和最多的任务数量相同的话，则st + 1
        while (i >= 0 && cnts[i] == cnts[25]) {
            st++;
            i--;
        }
        return Math.max(st, tasks.length);
    }
}
```

时间复杂度： $O(Math.max(tasks.length, 26log26))$，对长度为26的数组排序；

空间复杂度： $O(26)$。


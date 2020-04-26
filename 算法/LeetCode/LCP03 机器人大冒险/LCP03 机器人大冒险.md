# [机器人大冒险](https://leetcode-cn.com/problems/programmable-robot/)

## 题目描述

力扣团队买了一个可编程机器人，机器人初始位置在原点`(0, 0)`。小伙伴事先给机器人输入一串指令`command`，机器人就会无限循环这条指令的步骤进行移动。指令有两种：

1. `U`: 向`y`轴正方向移动一格；
2. `R`: 向`x`轴正方向移动一格。

不幸的是，在`xy`平面上还有一些障碍物，他们的坐标用`obstacles`表示。机器人一旦碰到障碍物就会被损毁。

给定终点坐标`(x, y)`，返回机器人能否完好地到达终点。如果能，返回`true`；否则返回`false`。

**示例 1：**

```
输入：command = "URR", obstacles = [], x = 3, y = 2
输出：true
解释：U(0, 1) -> R(1, 1) -> R(2, 1) -> U(2, 2) -> R(3, 2)。
```

**示例 2：**

```
输入：command = "URR", obstacles = [[2, 2]], x = 3, y = 2
输出：false
解释：机器人在到达终点前会碰到(2, 2)的障碍物。
```

**示例 3：**

```
输入：command = "URR", obstacles = [[4, 2]], x = 3, y = 2
输出：true
解释：到达终点后，再碰到障碍物也不影响返回结果。
```

**限制：**

- `2 <= command的长度 <= 1000`；
- `command`由`U，R`构成，且至少有一个`U`，至少有一个`R`；
- `0 <= x <= 1e9, 0 <= y <= 1e9`；
- `0 <= obstacles的长度 <= 1000`；
- `obstacles[i]`不为原点或者终点。

## 解题思路

### 个人AC

模拟机器人的移动过程，最终会超时。

```go
func robot(commands string, obstacles [][]int, x int, y int) bool {
    for i, j := 0, 0; x >= i && y >= j; {
        command := commands[(i + j) % len(commands)]
        if command == 'U' {
            j++
        } else {
            i++
        }
        for _, obstacle := range obstacles {
            if obstacle[0] == i && obstacle[1] == j {
                return false
            }
        }
        if i == x && j == y { // arrive the destination
            return true
        }
    }
    return false
}
```

**时间复杂度：** $O((x + y) * len(obstacles))$。

### 最优解

只需要对目标点`(x, y)`以及所有`obstacle`进行可达性判断：

1. 如果`(x, y)`不可达，直接返回`false`；
2. 遍历`obstacles`，只要有一个`obstacle`可达，则返回`fasle`（否则视为无效障碍）；
3. 否则返回`true`。

那么如何判断一个点是否可达呢？

1. 先计算从`(0, 0)`移动到`(x, y)`需要的步数：`steps := x + y`；
2. 然后计算在这些步数中`R`和`U`的数量，只有`R`和`U`的数量分别等于`x`和`y`时，这个点才是可达的。

```go
func robot(command string, obstacles [][]int, x int, y int) bool {
    if !canArrive(command, x, y) {
        return false
    }
    for _, o := range obstacles {
        if ((x + y) > (o[0] + o[1])) && canArrive(command, o[0], o[1]) {
            return false
        }
    }
    return true
}

func canArrive(command string, x int, y int) bool {
    // TODO: 可以一次计算出R和U的数量
    steps := x + y
    rNum := strings.Count(command, "R") * (steps/len(command)) + strings.Count(command[:steps%len(command)], "R")
    uNum := strings.Count(command, "U") * (steps/len(command)) + strings.Count(command[:steps%len(command)], "U")
    if rNum == x && uNum == y {
        return true
    }
    return false
}
```

**时间复杂度：** $O(len(command) * len(obstacles))$。

`x + y` = `K * len(command)   1 <= k <= 无穷大`。
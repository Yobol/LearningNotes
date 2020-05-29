# [用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)

## 题目描述

使用队列实现栈的下列操作：

- push(x) -- 元素 x 入栈；
- pop() -- 移除栈顶元素；
- top() -- 获取栈顶元素；
- empty() -- 返回栈是否为空。

**注意：**

- 你只能使用队列的基本操作 -- 也就是 `push to back`, `peek/pop from front`, `size`, 和 `is empty` 这些操作是合法的。
- 你所使用的语言也许不支持队列。 你可以使用 `list` 或者 `deque`（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。
- 你可以假设所有操作都是有效的（例如, 对一个空的栈不会调用 `pop` 或者 `top` 操作）。

## 解题思路

### 个人AC

```go
type MyStack struct {
    queue []int
}


/** Initialize your data structure here. */
func Constructor() MyStack {
    return MyStack {
        queue: make([]int, 0),
    }
}


/** Push element x onto stack. */
func (this *MyStack) Push(x int)  {
    // 每当入队一个新元素的时候，可以把队列的顺序反转过来
    this.queue = append(this.queue, x)
    size := len(this.queue)
    for size > 1 {
        head := this.queue[0]
        this.queue = this.queue[1:]
        this.queue = append(this.queue, head)
        size--
    }
}


/** Removes the element on top of the stack and returns that element. */
func (this *MyStack) Pop() int {
    top := this.Top()
    this.queue = this.queue[1:]
    return top
}


/** Get the top element. */
func (this *MyStack) Top() int {
    return this.queue[0]
}


/** Returns whether the stack is empty. */
func (this *MyStack) Empty() bool {
    return len(this.queue) == 0
}


/**
 * Your MyStack object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(x);
 * param_2 := obj.Pop();
 * param_3 := obj.Top();
 * param_4 := obj.Empty();
 */
```

**时间复杂度：**

- **Push：** $O(n)$；
- **Pop：** $O(1)$；
- **Top：** $O(1)$；
- **Empty：** $O(1)$。

**空间复杂度：**

- **Push：** $O(1)$；
- **Pop：** $O(1)$；
- **Top：** $O(1)$；
- **Empty：** $O(1)$；

### 最优解

同上。
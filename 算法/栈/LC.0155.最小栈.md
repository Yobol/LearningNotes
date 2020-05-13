# [最小栈](https://leetcode-cn.com/problems/min-stack/)

## 题目描述

设计一个支持 push，pop，top 操作，并能在常数时间内检索到最小元素的栈。

- push(x) -- 将元素 x 推入栈中。
- pop() -- 删除栈顶的元素。
- top() -- 获取栈顶元素。
- getMin() -- 检索栈中的最小元素。

**示例：**

```
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
```

## 解题思路

### 个人AC

#### 空间换时间

每次将元素压栈后，需要根据情况更新最小元素。

##### Java

```java
class MinStack {
    private Stack<Element> stack;

    private class Element {
        int x;
        int min;

        Element(int x, int min) {
            this.x = x;
            this.min = min;
        }
    }

    /** initialize your data structure here. */
    public MinStack() {
        this.stack = new Stack<>();
    }
    
    public void push(int x) {
        int min = Integer.MAX_VALUE;
        if (!this.stack.isEmpty() && this.stack.peek().min < x) {
            min = this.stack.peek().min;
        } else {
            min = x;
        }
        this.stack.push(new Element(x, min));
    }
    
    public void pop() {
        this.stack.pop();
    }
    
    public int top() {
        return this.stack.peek().x;
    }
    
    public int getMin() {
        return this.stack.peek().min;
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack obj = new MinStack();
 * obj.push(x);
 * obj.pop();
 * int param_3 = obj.top();
 * int param_4 = obj.getMin();
 */
```

##### Golang

```go
type MinStack struct {
    stack []Node
    size int
}

type Node struct {
    data int
    min int
}


/** initialize your data structure here. */
func Constructor() MinStack {
    return MinStack {
        stack: make([]Node, 0),
    }
}


func (this *MinStack) Push(x int)  {
    node := Node {
        data: x,
        min: x,
    }
    if this.size > 0 && this.GetMin() < x {
        node.min = this.GetMin()
    }
    this.stack = append(this.stack, node)
    this.size++
}


func (this *MinStack) Pop()  {
    this.size--
    this.stack = this.stack[:this.size]
}


func (this *MinStack) Top() int {
    return this.stack[this.size - 1].data
}


func (this *MinStack) GetMin() int {
    return this.stack[this.size - 1].min
}


/**
 * Your MinStack object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(x);
 * obj.Pop();
 * param_3 := obj.Top();
 * param_4 := obj.GetMin();
 */
```

**时间复杂度：** $O(1)$；

**空间复杂度：** $O(n)$。

### 最优解

同上。
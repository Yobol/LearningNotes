# Go 并发模式



## runner

`runner`包用于展示如何**使用通道来监视程序的执行时间**，如果程序运行时间太长，也可以用`runner`包来终止。

### 适用场景

适用于开发需要**调度后台处理任务**的程序。每个程序可能作为一个`cron`作业执行，或者在基于定时任务的云环境（如iron.io）里执行。

### 主要功能

在给定的超时时间`timeout <-chan time.Time`内执行一组任务`tasks []func()`，并且在操作系统发送中断信号时结束这些任务：

- 程序可在分配的时间内完成任务，正常终止；
- 若没有及时完成任务，则自动终止；
- 在任务执行过程中可监听系统信号，当接收到指定信号时，完成指定工作后自动终止。

### 核心代码

```go
package runner

import (
	"errors"
    "os"
    "os/signal"
    "time"
)

type Runner struct {
    // 使用 interrupt 通道监听操作系统的信号
    interrupt chan os.Signal
    // 使用 complete 通道监听任务是否完成（nil）或出错（error）
    complete chan error
    // 使用 timeout 通道监听任务是否超时
    timeout <-chan time.Time
    // 使用 tasks 切片持有一组要完成的函数
    tasks []func(int)
}

// ErrTimeout 会在任务执行超时时返回
var ErrTimeout = errors.New("received timeout")
// ErrInterrupt 会在接收到系统中断信号时返回
var ErrInterrupt = errors.New("received interrupt")

// New 方法返回一个新的可供使用的 Runner
func New(d duration) *Runner {
    return &Runner {
        // 创建一个大小为 1 缓冲通道
        // 保证通道至少能接收一个来自语言运行时的 os.Signal 值
        // 确保语言运行时发送这个事件时不会被阻塞。
        // 例如，如果用户反复敲 Ctrl + C 组合键，
        // 程序只会在这个通道的缓冲区可用的时候接收事件，其余的所有事件都会被丢弃
        interrupt: make(chan os.Signal, 1), 
        // complete 被初始化为一个无缓冲的通道，当执行任务的 goroutine 完成时，
        // 会向这个通道发送一个 error 类型的值或 nil 值，之后就会等待 main 函数接收这个值
        // 一旦 main 接收了这个 error 值， goroutine 就可以安全地终止了。
        complete:  make(chan error),
        // time.After 会直接返回一个 time.Time 类型的通道，
        // 语言运行时将在指定的 duration 到期后，向这个通道发送一个 time.Time 值
        timeout:   time.After(d), 
    }
}

// Add 方法可以将若干可执行的方法附加到 Runner 上
func (r *Runner) Add(tasks ...func(int)) {
    r.tasks = append(r.tasks, tasks...)
}

// Start 方法执行所有任务，并监听所有通道事件
func (r *Runner) Start() {
    // 指定要监听的操作系统信号类型：监听所有中断信号
    // 注：如果不跟信号，表示监听所有信号
    signal.Notify(r.interrupt, os.Interrupt)
    
    // 启动独立的 goroutine 来执行任务
    go func() {
        // 任务执行完毕将返回 nil，若执行出错的话将返回对应的 error
        r.complete <- r.run()
    } ()
    
    select {
        // 监听任务是否完成
        case err :=  <-r.complete:
            return err
        // 监听任务是否超时
        case <-r.timeout:
            return ErrTimeout
    }
}

// 完成 Start 方法中执行注册任务的功能
func (r *Runner) run() {
    for id, task := range r.tasks {
        // 监听操作系统的中断信号：如果执行过程中监听到系统中断信号，则返回中断异常
        if (r.gotInterrupt()) {
            return ErrInterrupt
        }
        
        // 执行注册任务
        task(id)
    }
    
    // 所有任务顺利完成，则返回 nil
    return nil
}

// gotInterrupt 方法检测是否监听到中断信号
func (r *Runner) gotInterrupt() {
    select {
        // 监听中断信号
        case <-r.interrupt:
            // 停止接收后续的任何中断信号
            signal.Stop(r.interrupt)
            return true
        // 继续正常运行
        default:
            return false
    }
}
```

### 使用示例

```go
package main

import (
    "log"
    "time"
    
	"me.yobol.runner"
)

// timeout 规定了任务必须在指定的时间内完成
const timeout = 3 * time.Second

func main() {
    log.Println("Starting work.")
    
    // 启动一个新的 Runner，并指定超时时间
    r := runner.New(timeout)
    
    // 添加要执行的任务
    r.Add(createTask(), createTask(), createTask())
    
    // 执行任务并处理结果
    if err := r.Start(); err != nil {
        switch err {
        	case runner.ErrTimeout: // 任务执行超时，程序使用错误码 1 退出
                log.Println("Terminating due to timeout")
                os.Exit(1)
            case runner.ErrInterrupt: // 任务执行过程中因中断信号而停止， 程序使用错误码 2 退出
            	log.Println("Terminating due to interrupt")
            	os.Exit(2)
        }
    }
    
    log.Println("Process ended.")
    // 任务顺利执行结束，程序使用错误码 0 正常退出
}

// 让任务休眠指定时间模拟任务执行
func createTask() func(int) {
    return func(id int) {
        log.Printf("Processor - Task #%d.", id)
        time.Sleep(time.Duration(id) * time.Second)
    }
}
```

## pool



## work
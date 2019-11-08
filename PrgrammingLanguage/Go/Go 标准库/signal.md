# os/signal 信号处理

## func Notify(c chan<- os.Signal, sig ...os.Signal)

```go
// Notify causes package signal to relay incoming signals to c.
// If no signals are provided, all incoming signals will be relayed to c.
// Otherwise, just the provided signals will.
//
// Package signal will not block sending to c: the caller must ensure
// that c has sufficient buffer space to keep up with the expected
// signal rate. For a channel used for notification of just one signal value,
// a buffer of size 1 is sufficient.
//
// It is allowed to call Notify multiple times with the same channel:
// each call expands the set of signals sent to that channel.
// The only way to remove signals from the set is to call Stop.
//
// It is allowed to call Notify multiple times with different channels
// and the same signals: each channel receives copies of incoming
// signals independently.
func Notify(c chan<- os.Signal, sig ...os.Signal) {

}
```

用于监听系统信号：

- 第一个参数表示接收信号的管道；
- 第二个参数表示要监听的信号类型，如果不设置则监听所有信号。

只能使用`Stop`方法来移除监听的信号。

### 示例

```go
package main

import (
	"fmt"
    "os"
    "os/signal"
    "syscall"
)

func main() {
    fmt.Println("main is running")
    sc := make(chan os.Signal, 1)
    // signal.Notify(sc) // 监听所有信号
    // 期望接收 syscall.SIGINT| syscall.SIGTERM | syscall.SIGQUIT 这三个信号
    signal.Notify(sc, 
                 syscall.SIGINT,
                 syscall.SIGTERM,
                 syscall.SIGQUIT)
    // 阻塞当前线程，直到 os.Signal 通道中接收到上述三种信号之一
    sig := <-sc
    fmt.Println("Server got singal: ", sig)
}
```

首先打印`main is running`，然后线程被阻塞等待系统信号，当按下`CTRL + C`后，打印`Server got singal: interrupt`。

```
main is running
Server got singal: interrupt
```

## func Stop()

用于取消监听。
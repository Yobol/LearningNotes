# time

## func After(d Duration) <-chan Time

```go
// After waits for the duration to elapse and then sends the current time
// on the returned channel.
// It is equivalent to NewTimer(d).C.
// The underlying Timer is not recovered by the garbage collector
// until the timer fires. If efficiency is a concern, use NewTimer
// instead and call Timer.Stop if the timer is no longer needed.
func After(d Duration) <-chan Time {
    return NewTimer(d).C
}
```

调用`time.After(d)`后不阻塞，立即返回一个`time.Time`类型`chan`，等过了`d`（如3s）后，将当前时间放入到之前返回的管道中。

### 示例

```go
package main
 
import (
    "time"
    "fmt"
)

func main()  {
    tchan := time.After(time.Second*3)
    fmt.Printf("tchan type=%T\n", tchan)
    fmt.Println("mark 1")
    fmt.Println("tchan=", <-tchan)
    fmt.Println("mark 2")
}
```

首先瞬间打印出前两行，然后等待3S，打印后后两行。

```
tchan type=<-chan time.Time
mark 1
tchan= 2018-03-15 09:38:51.023106 +0800 CST m=+3.015805601
mark 2
```


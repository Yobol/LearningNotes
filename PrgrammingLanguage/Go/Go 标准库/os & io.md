# os & io 文件操作

## os.Chdir() 设置工作路径

1. 设置工作目录，一般在程序开始时设定一次即可（不要在异步过程中修改工作路径）；
2. 默认为程序执行的目录；

```go
import "os"

func main() {
    os.Chdir("/home/yobol") // 后续的文件操作都相对于"/home/yobol"进行的
}
```

## os.MkdirAll() 递归创建文件夹

1. 递归创建文件夹，等价于`mkdir -p xxx/xxx`；

```go
import "os"

func main() {
    // 假设程序执行目录为 /home/yobol
    // os.ModePerm = 0777
    os.MkdirAll("./data/app", os.ModePerm) // 在 /home/yobol 目录下递归创建 data/app
}
```

## os.Rename() 移动目录或文件

1. 移动目录或文件，等价于`mv old new`

```go
import "os"

func main () {
    // mv ./data/a.txt /tmp/data/b.txt
    os.Rename("./data/a.txt", "/tmp/data/b.txt")
}
```

## 拷贝文件

1. 拷贝文件，等价于`cp source target`；

```go
import "io/ioutil"
import "path"

func main() {
    // cp ./data/a.txt ./data/b.txt
    data, err := ioutil.ReadFile("./data/a.txt")
    if err != nil {
        // do xxx
    }
    if err := ioutil.WriteFile("./data/b.txt", data, os.ModePerm); err != nil {
        // do xxx
    }
}
```


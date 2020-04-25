# Shell

## 变量说明

```shell
# Shell本身的PID
$$

# Shell最后运行的后台Process的PID
$!

# Shell最后运行的命令的结束代码（返回值）
$?

# 使用Set命令设定的Flag一览
$-

# $*和$@都表示传递给函数或者脚本的所有参数
# 当二者不被""包围时，没有任何区别，都是将接受到的每个参数看作是一份数据，以空格分隔
# 当二者被""包围时：
# "$*"将所有的参数从整体上看作一份数据，而不是把每个参数都看作是一份数据；
# "$@"仍然将每个参数都看作是独立的数据。
$* | $@

# 传递给函数或者脚本的参数个数
$#

# Shell本身的文件名
$0

# 传递给函数或者脚本的各参数值
$1~$n
```

## echo命令

```shell
uname=Yobol

# 结果重定向
echo "Hello, $uname!" > log # 将 Hello,Yobol! 写入log文件中

# 原样输出字符串，不进行转义或取变量
echo '$uname \n' # $uname \n
# 显示命令执行结果
echo `date` # Fri Apr 19 10:07:34 CST 2019
```

## vim命令

```shell
vim <file-name>
```

> file-name

```
:/<query-string>    # 定位到 query-string 所在的位置
```

## 进程

### 关闭进程

```shell
$ kill -9 PID
```

## 网络

ifconfig

route -n查看路由信息

./data/thinger-svcmgr/remove_service:/thinger/etc/remote_service

```
echo '{"client_id":"hyf", "params":[{"id":"0", "type":"jpg", "data":"'`base64 -w 0 /home/hyf/hyf.jpg`'"}]}' | curl -H "Content-Type: application/json" -H "Expect:" -d @- http://172.16.30.3:7796/api/face_process
```


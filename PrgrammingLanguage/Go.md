# Go

## [安装](https://golang.org/dl/)

```shell
# 查看当前Go的版本
$ go version
go version go1.8 linux/amd64
# 如果存在老的版本，可以从当前版本升级或回退
$ go get golang.org/dl/go1.12.5
$ go1.12.5 download
# 也可以先删除当前老的版本
# 从 /etc/profile or $HOME/.profile 中查看Go的环境变量配置信息

# 下载Linux 1.12.5到本地
# 解压到 /usr/local 下
$ sudo tar -C /usr/local -xzvf go1.12.5.linux-amd64.tar.gz
$ go version
```

> /etc/profile 

```
export GOROOT=/usr/local/go
export GOBIN=$GOROOT/bin
export GOPATH=$HOME/gopath
export PATH=$PATH:$GOBIN:$GOPATH/bin
```

在/etc/profile文件中添加如上信息，其中GOROOT指定/usr/local/go根目录，GOBIN为Go的bin目录，GOPATH为

并且在PATH中加入$GOBIN和$GOPATH/bin
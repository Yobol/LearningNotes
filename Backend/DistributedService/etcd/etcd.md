# [etcd](https://coreos.com/etcd/)

etcd是以实现配置共享和服务注册为目的，提供一致性的键值对存储的分布式数据库。

## 安装

### 安装最新版本etcd-latest

```shell
# etcd使用Go语言开发，如果使用编译源码的方式安装，需要Go的版本在1.8+
$ wget https://studygolang.com/dl/golang/go1.9.7.linux-amd64.tar.gz
$ sudo tar -xzvf go1.9.7.linux-amd64.tar.gz
$ sudo cp -r go /usr/local

$ cd ~
$ mkdir gopath
$ cd gopath
$ mkdir src
$ mkdir bin
$ mkdir pkg

$ sudo vim /etc/profile
#############################
export GOROOT=/usr/local/go
export GOBIN=$GOROOT/bin
export GOPATH=$HOME/gopath
export PATH=$PATH:$GOBIN:$GOPATH/bin
#############################
$ source /etc/profile
```

参考：

1. [Ubuntu 16.04安装GOLANG](https://blog.csdn.net/h363659487/article/details/81812799)

2. [Download and build etcd](https://coreos.com/etcd/docs/latest/dl_build.html)

### 安装指定版本[etcd-v3.3.12](https://github.com/etcd-io/etcd/releases/tag/v3.3.12)

```shell
ETCD_VER=v3.3.12

# choose either URL
GOOGLE_URL=https://storage.googleapis.com/etcd
GITHUB_URL=https://github.com/etcd-io/etcd/releases/download
DOWNLOAD_URL=${GITHUB_URL}

rm -f /tmp/etcd-${ETCD_VER}-linux-amd64.tar.gz
rm -rf /tmp/etcd-download-test && mkdir -p /tmp/etcd-download-test

curl -L ${DOWNLOAD_URL}/${ETCD_VER}/etcd-${ETCD_VER}-linux-amd64.tar.gz -o /tmp/etcd-${ETCD_VER}-linux-amd64.tar.gz
tar xzvf /tmp/etcd-${ETCD_VER}-linux-amd64.tar.gz -C /tmp/etcd-download-test --strip-components=1
rm -f /tmp/etcd-${ETCD_VER}-linux-amd64.tar.gz

/tmp/etcd-download-test/etcd --version
ETCDCTL_API=3 /tmp/etcd-download-test/etcdctl version
```

安装步骤如下：

```shell
# 下载etcd v3.3.12
# Google: https://storage.googleapis.com/etcd/v3.3.12/etcd-v3.3.12-linux-amd64.tar.gz
$ wget https://github.com/etcd-io/etcd/releases/download/v3.3.12/etcd-v3.3.12-linux-amd64.tar.gz
$ tar -xzvf etcd-v3.3.12-linux-amd64.tar.gz
$ cd etcd-v3.3.12-linux-amd64
$ sudo mv etcd etcdctl /usr/local/bin

$ export ETCDCTL_API=3
# 查看etcd版本
$ etcd --version
# 配置etcd配置文件和数据目录
$ sudo mkdir -p /var/lib/etcd/
$ sudo mkdir /etc/etcd
# 创建etcd系统用户
$ sudo groupadd --sytem etcd
$ sudo useradd -s /sbin/nologin --system -g etcd etcd
# 将/var/lib/etcd/目录所有权设置为etcd用户
$ sudo chown -R etcd:etcd /var/lib/etcd/

# 配置system-daemon并启动etcd服务
# 为etcd创建一个新的systemd服务文件
$ sudo vim /etc/systemd/system/etcd.service
#################################################################
[Unit]
Description=etcd key-value store
Documentation=https://github.com/etcd-io/etcd
After=network.target

[Service]
User=etcd
Type=notify
Environment=ETCD_DATA_DIR=/var/lib/etcd
Environment=ETCD_NAME=%m
ExecStart=/usr/local/bin/etcd
Restart=always
RestartSec=10s
LimitNOFILE=40000

[Install]
WantedBy=multi-user.target
#################################################################
# 重新启动systemd服务，并启动etcd
$ sudo systemctl daemon-reload
# 关闭etcd： sudo system start etcd.service
$ sudo systemctl start etcd.service
# 检查服务状态
$ sudo systemctl status etcd.service
# 该服务将在localhost:2379端口上启动
$ ss -tunelp | gerp 2379

# 查看节点列表
$ etcdctl member list
```

参考：[在Ubuntu 18.04/Ubuntu 16.04服务器上安装etcd的方法](https://ywnz.com/linuxyffq/3953.html)

## etcdctl

### 设置etcdctl版本的环境变量

```shell
$ export ETCDCTL_API=3

$ etcdctl --version
```

## 键值对命令

#### put 新增 | 更新键值对

设置键值对，若key不存在则新增该key。

```shell
$ etcdctl update msg "Hello!"
OK
$ etcdctl update msg "Hello, I'm Yobol!"
OK
```

#### get获得键值对

```shell
$ etcdctl get msg
msg
Hello, I'm Yobol!
```

#### del删除键值对

```shell
$ etcdctl del msg
1
$ etcdctl get msg
```

#### ls查看所有key

```shell
# ls: retrieve a directory
$ etcdctl ls
```

#### lease租约管理

etcd也能为key设置超时时间，但与redis不同的是，etcd需要先创建lease，然后使用`put`命令加上参数`--lease=<lease ID>`来设置。

```shell
# 创建一个TTL为120s的lease，回显lease ID
$ etcdctl lease grant 120
lease 694d6ad41b4a200d granted with TTL(120s)
# 为键值对绑定lease，设置过期时间
# 需要lease在key之前存在，这样在lease失效之后，设置了lease的键值对也会失效
$ etcdctl put msg "Hello, I'm yobol!" --lease=694d6ad41b4a2013
# 查看lease总时间和剩余时间
$ etcdctl lease timetolive 694d6ad41b4a2013
lease 694d6ad41b4a2013 granted with TTL(120s), remaining(62s)
# 查看有哪些键设置了指定的lease
$ etcdctl lease timetoleave 694d6ad41b4a2013 --keys
lease 694d6ad41b4a2013 granted with TTL(120s), remaining(49s), attached keys([msg])
# 删除未过期的lease
$ etcdctl lease revoke 694d6ad41b4a2018
lease 694d6ad41b4a2018 revoked
```

## 数据备份与恢复

`注：etcd v2和v3的数据不能混合存放。若使用v3备份时存在v2的数据则不影响恢复，但是使用v2备份数据时存在v3的数据则会导致恢复失败。`

### 备份数据

```shell
$ export ETCDCTL_API=3
# 备份数据
$ etcdctl --endpoints localhost:2379 snapshot save snapshot.db
```

### 恢复数据

```shell
$ export ETCDCTL_API=3
# 恢复数据
# 恢复数据后的文件需要修改权限为etcd:etcd
# --name 重新指定一个数据目录，默认为default.etcd
# --data-dir 指定数据目录
# 建议使用时不指定name但是指定data-dir。并将data-dir对应于etcd服务中配置的data-dir
$ etcdctl snapshot restore snapshot.db --name m3 --data--dir=/home/etcd_data
$ sudo chown -R etcd:etcd /home/etcd_data
```


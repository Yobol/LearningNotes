# [etcd](https://coreos.com/etcd/)

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
$ sudo systemctl start etcd.service
# 检查服务状态
$ sudo systemctl status etcd.service
# 该服务将在localhost:2379端口上启动
$ ss -tunelp | gerp 2379

# 查看节点列表
$ etcdctl member list
```

参考：[在Ubuntu 18.04/Ubuntu 16.04服务器上安装etcd的方法](https://ywnz.com/linuxyffq/3953.html)


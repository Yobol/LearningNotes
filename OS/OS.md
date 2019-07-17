# OS

## Process Scheduling

### Process Status

```shell
# 动态地查看系统整体的运行情况
$ top

# 直接查看系统当前的进程状态
# a - 显示所有用户的进程，否则只显示当前用户的进程
# u - 显示进程的拥有者
# x - 显示后台运行的程序，否则只显示所有依赖于终端的进程
$ ps -aux
# 查看与Python相关的进程
$ ps -aux | grep python
```

### Kill Process

```shell
# 首先使用top或者ps命令查看进程ID
# 然后通过进程ID或者名字结束进程
# Signal Name	Single Value	Effect
# SIGHUP		1				挂起
# SIGINT		2				键盘的中断信号
# SIGKILL		9				发出杀死信号
# SIGTERM		15				发出终止信号
# SIGSTOP		17, 19, 23		停止进程

# kill SIGNAL PID
# 通过进程ID来结束进程
$ kill -9 8080

# killall SIGNAL PNAME
# 通过进程名来结束所有相关进程
$ killall -9 python
```

## File System

### Device Mount

#### 挂载设备

```shell
# 将设备（包括磁盘）里的文件树连接到Linux系统的文件树上
# type表示要挂载设备文件系统的类型
# device表示要挂载的设备
# dir表示设备在系统上的挂载点
$ mount -t type device dir
```

##### 挂载U盘

```shell
# 查看系统的磁盘列表
$ fdisk -l

# 新建一个目录作为U盘的挂载点
$ mkdir /mnt/usb

# 挂载
$ mount /dev/sda1 /mnt/usb
```

##### 解除挂载设备

```shell
$ umount dir
```

##### 解除挂载U盘

```shell
$ mount umount /mnt/usb
```



## Safety

### Firewall

#### CentOS

##### 查看当前防火墙状态

```shell
$ systemctl status firewalld.service
```

##### 开启防火墙

```shell
$ systemctl start firewalld.service
```

##### 允许开机自启动防火墙

```shell
$ systemctl enable firewalld.service
```

##### 关闭防火墙

```shell
$ systemctl stop firewalld.service
```

##### 禁止开机自启动防火墙

```shell
$ systemctl disable firewalld.service
```

##### 开放端口

```shell
$ firewall-cmd --zone=public --add-port=[port]/tcp --permanent
$ firewall-cmd --reload
```

##### 关闭端口

```shell
$ firewall-cmd --remove-port=[port]/udp --permanent
$ firewall-cmd --reload
```

##### 查看端口使用情况

```shell
$ ss

# 查看指定端口
$ ss -lpn src :[port]
```



##### 查看开放了哪些端口

```shell
$ firewall-cmd --list-all

public (active)
  target: default
  icmp-block-inversion: no
  interfaces: eno1 ens7f1
  sources: 
  services: ssh dhcpv6-client
  ports: 10081/tcp 8080/tcp
  protocols: 
  masquerade: no
  forward-ports: 
  source-ports: 
  icmp-blocks: 
  rich rules:
```



#### Ubuntu

##### 查看当前防火墙状态

```shell
$ sudo ufw status
Status: active
# 使用了如下命令，会显示下面非注释部分，表示对外开放本机的40001端口
# firewall-cmd --zone=public --add-port=40001/tcp --permanent
# firewall-cmd --reload
To                         Action      From
--                         ------      ----
40001                      ALLOW       Anywhere                  
40001 (v6)                 ALLOW       Anywhere (v6) 
```

##### 开启并允许开机自启动防火墙

```shell
$ sudo ufw enable
```

##### 关闭并禁止开机自启动防火墙

```shell
$ sudo ufw disable
```

##### 允许/拒绝外部访问所有端口

```shell
$ sudo ufw allow/deny
```

##### 允许/拒绝外部访问某个端口

```shell
$ sudo ufw allow/deny <port>
```

##### 删除定义的允许/拒绝访问端口的规则

```shell
$ sudo ufw delete allow/deny <port>
```

##### 其他

```shell
# ufw从/etc/services中找到对应service的端口，进行过滤。
$ sudo ufw allow/deny servicename

# 允许自10.0.1.0/10的tcp封包访问本机的25端口
$ sudo ufw allow proto tcp from 10.0.1.0/10 to 本机ip port 25
```



##### 参考

[Ubuntu怎么开启/关闭防火墙](https://jingyan.baidu.com/article/73c3ce283ee2c1e50343d9f6.html)
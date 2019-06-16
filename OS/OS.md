# OS

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
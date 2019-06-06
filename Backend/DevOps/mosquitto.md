# MQTT-Mosquitto

## 安装

```shell
# 引入仓库并更新
$ sudo app-add-repository ppa:mosquitto-dev/mosquitto-ppa
$ sudo apt-get update

# 安装mosquitto
$ sudo apt-get install mosquitto
# 这时已经能使用mosquitto_sub和mosquitto_pub命令了

# 安装mosquitto开发包
$ sudo apt-get install lib mosquitto-dev

# 安装mosquitto客户端
$ sudo apt-get install mosquitto-clients

# 查询mosquitto是否能正常运行
$ sudo service mosquitto status
```

## 发布消息

```shell
$ mosquitto_pub -h localhost -t 'topic_name' -m 'message_body'
```

## 订阅消息

```shell
# -t '#'表示订阅所有主题的消息
$ mosqutto_sub -h localhost -t 'topic_name'
```

## 参考

[在ubuntu上安装，使用MQTT Mosquitto](https://blog.csdn.net/swedenfeng/article/details/53510048)
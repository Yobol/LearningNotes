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

## Python [paho-mqtt](https://pypi.org/project/paho-mqtt/)

### 安装

#### 使用PyPi（Python Package Index）

```shell
$ pip install paho-mqtt
# Question enhanced
# WARNING: Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None))
# after connection broken by 'ReadTimeoutError("HTTPSConnectionPool(host='pypi.org', 
# port=443): Read timed out. (read timeout=15)",)': /simple/paho-mqtt/


# Solution: change image registry
# pip install paho-mqtt -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
```

#### 使用virtualenv

```shell
$ virtualenv paho-mqtt
$ source paho-mqtt/bin/activate
$ pip install paho-mqtt
```

#### 编译源码

```shell
$ git clone https://github.com/eclipse/paho.mqtt.python
$ cd pacho.mqtt.python
$ python setup.py install
```

#### 客户端实现

```python
import paho.mqtt.client as mqtt


```

### 关闭

```shell
$ sudo service mosquitto stop
```

### 参考

[Python MQTT客户端实现](https://blog.csdn.net/itas109/article/details/78873257)

## 参考

[在ubuntu上安装，使用MQTT Mosquitto](https://blog.csdn.net/swedenfeng/article/details/53510048)
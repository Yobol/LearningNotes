# Docker安装

## [TICK和Docker Compose入门](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#getting-started-with-tick-and-docker-compose)

这篇简短的教程将演示使用Docker Compose启动TICK堆栈组件（InfluxDB，Telegraf，Kapacitor），然后使用该堆栈来学习使用Kapacitor和[TICKscript](https://docs.influxdata.com/kapacitor/v1.5/tick/)域特定语言（DSL）的基本知识。以下讨论基于可从此[位置](https://docs.influxdata.com/downloads/tik-docker-tutorial.tar.gz)下载的教程项目包（名为tik-docker-tutorial.tar.gz）。它将创建这些应用程序的运行部署，可用于Kapacitor的初始评估和测试。Chronograf目前不包含在包装中。

本教程依赖于Docker Compose 3.0来部署InfluxDB，Telegraf和Kapacitor的最新Docker 17.0+兼容映像。

要使用此软件包，Docker和Docker Compose应安装在运行它的主机上。

Docker安装在[Docker网站上提供](https://docs.docker.com/engine/installation/)。

Docker Compose安装也包含在[Docker网站上](https://docs.docker.com/compose/install/)。

为了密切关注日志文件，本文档将描述在两个单独的控制台中运行参考包。在第一个控制台中将运行Docker Compose。第二个将用于发出命令以演示基本的Kapacitor功能。

在撰写本文时，该软件包仅在Linux（Ubuntu 16.04）上进行了测试。它包含一个`docker-compose.yml`用于配置测试文件的目录。

*演示包装内容*

```
.
├── docker-compose.yml
├── etc
│   ├── kapacitor
│   │   └── kapacitor.conf
│   └── telegraf
│       └── telegraf.conf
├── home
│   └── kapacitor
│       ├── cpu_alert_batch.tick
│       └── cpu_alert_stream.tick
├── README.md
└── var
    └── log
        └── kapacitor
            └── README.md
```

请将包克隆或复制到主机，并在继续之前打开两个控制台到其安装位置。

### [使用Docker Compose加载堆栈](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#loading-the-stack-with-docker-compose)

该软件包的核心是`docker-compose.yml`文件，Docker Compose用它来提取Docker镜像，然后创建并运行Docker容器。

还准备了标准的Unix风格目录。这些映射到docker容器中，以便于访问后续演示中的脚本和日志。一个重要的目录是卷`var/log/kapacitor`。这里`kapacitor.log`以及之后的`alert-*.log`文件将可供检查。

在第一个控制台中，在程序包的根目录中，要启动堆栈并使日志保持可见，请运行以下命令：

```
 $ docker-compose up
```

*登录标准控制台流*

```
Starting tik_influxdb_1 ...
Starting tik_telegraf_1 ...
Starting tik_telegraf_1
Starting tik_influxdb_1
Starting tik_kapacitor_1 ...
Starting tik_influxdb_1 ... done
Attaching to tik_telegraf_1, tik_kapacitor_1, tik_influxdb_1
kapacitor_1  |
kapacitor_1  | '##:::'##::::'###::::'########:::::'###:::::'######::'####:'########::'#######::'########::
kapacitor_1  |  ##::'##::::'## ##::: ##.... ##:::'## ##:::'##... ##:. ##::... ##..::'##.... ##: ##.... ##:
kapacitor_1  |  ##:'##::::'##:. ##:: ##:::: ##::'##:. ##:: ##:::..::: ##::::: ##:::: ##:::: ##: ##:::: ##:
kapacitor_1  |  #####::::'##:::. ##: ########::'##:::. ##: ##:::::::: ##::::: ##:::: ##:::: ##: ########::
kapacitor_1  |  ##. ##::: #########: ##.....::: #########: ##:::::::: ##::::: ##:::: ##:::: ##: ##.. ##:::
kapacitor_1  |  ##:. ##:: ##.... ##: ##:::::::: ##.... ##: ##::: ##:: ##::::: ##:::: ##:::: ##: ##::. ##::
kapacitor_1  |  ##::. ##: ##:::: ##: ##:::::::: ##:::: ##:. ######::'####:::: ##::::. #######:: ##:::. ##:
kapacitor_1  | ..::::..::..:::::..::..:::::::::..:::::..:::......:::....:::::..::::::.......:::..:::::..::
kapacitor_1  |
kapacitor_1  | 2017/08/17 08:46:55 Using configuration at: /etc/kapacitor/kapacitor.conf
influxdb_1   |
influxdb_1   |  8888888           .d888 888                   8888888b.  888888b.
influxdb_1   |    888            d88P"  888                   888  "Y88b 888  "88b
influxdb_1   |    888            888    888                   888    888 888  .88P
influxdb_1   |    888   88888b.  888888 888 888  888 888  888 888    888 8888888K.
influxdb_1   |    888   888 "88b 888    888 888  888  Y8bd8P' 888    888 888  "Y88b
influxdb_1   |    888   888  888 888    888 888  888   X88K   888    888 888    888
influxdb_1   |    888   888  888 888    888 Y88b 888 .d8""8b. 888  .d88P 888   d88P
influxdb_1   |  8888888 888  888 888    888  "Y88888 888  888 8888888P"  8888888P"
influxdb_1   |
influxdb_1   | [I] 2017-08-17T08:46:55Z InfluxDB starting, version 1.3.3, branch HEAD, commit e37afaf09bdd91fab4713536c7bdbdc549ee7dc6
influxdb_1   | [I] 2017-08-17T08:46:55Z Go version go1.8.3, GOMAXPROCS set to 8
influxdb_1   | [I] 2017-08-17T08:46:55Z Using configuration at: /etc/influxdb/influxdb.conf
influxdb_1   | [I] 2017-08-17T08:46:55Z Using data dir: /var/lib/influxdb/data service=store
influxdb_1   | [I] 2017-08-17T08:46:56Z reading file /var/lib/influxdb/wal/_internal/monitor/1/_00001.wal, size 235747 engine=tsm1 service=cacheloader
influxdb_1   | [I] 2017-08-17T08:46:56Z reading file /var/lib/influxdb/wal/telegraf/autogen/2/_00001.wal, size 225647 engine=tsm1 service=cacheloader
telegraf_1   | 2017/08/17 08:46:55 I! Using config file: /etc/telegraf/telegraf.conf
telegraf_1   | 2017-08-17T08:46:56Z I! Starting Telegraf (version 1.3.3)
telegraf_1   | 2017-08-17T08:46:56Z I! Loaded outputs: influxdb
telegraf_1   | 2017-08-17T08:46:56Z I! Loaded inputs: inputs.kernel inputs.mem inputs.processes inputs.swap inputs.system inputs.cpu inputs.disk inputs.diskio
telegraf_1   | 2017-08-17T08:46:56Z I! Tags enabled: host=f1ba76bcbbcc
telegraf_1   | 2017-08-17T08:46:56Z I! Agent Config: Interval:10s, Quiet:false, Hostname:"f1ba76bcbbcc", Flush Interval:10s
influxdb_1   | [I] 2017-08-17T08:46:56Z reading file /var/lib/influxdb/wal/_internal/monitor/1/_00002.wal, size 0 engine=tsm1 service=cacheloader
influxdb_1   | [I] 2017-08-17T08:46:56Z /var/lib/influxdb/data/_internal/monitor/1 opened in 228.044556ms service=store

...
```

### [验证堆栈](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#verifying-the-stack)

控制台日志应与上面的示例类似。在第二个控制台中，可以直接使用docker确认状态。

```
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                          NAMES
f1ba76bcbbcc        telegraf:latest     "/entrypoint.sh te..."   43 minutes ago      Up 2 minutes        8092/udp, 8125/udp, 8094/tcp   tik_telegraf_1
432ce34e3b00        kapacitor:latest    "/entrypoint.sh ka..."   43 minutes ago      Up 2 minutes        9092/tcp                       tik_kapacitor_1
2060eca01bb7        influxdb:latest     "/entrypoint.sh in..."   43 minutes ago      Up 2 minutes        8086/tcp                       tik_influxdb_1
```

记下容器名称，尤其是Kapacitor。如果当前部署中的Kapacitor容器名称不相同（即`tik_kapacitor_1`），请确保在下面的Docker命令行示例中替换它。这也适用`tik_influxdb_1`于下一个示例中使用的InfluxDB容器名称（）。

### [什么在运行？](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#what-is-running)

此时应该在主机上运行：InfluxDB，Telegraf和Kapacitor。使用配置文件`etc/telegraf/telegraf.conf`配置Telegraf 。使用文件`etc/kapacitor/kapacitor.conf`配置Kapacitor 。已在`docker-compose.yml`文件中定义了网桥。此桥接网络具有简单的名称解析服务，允许将容器名称用作刚才提到的配置文件中的服务器名称。

`influx`可以直接从InfluxDB容器使用命令行客户端进一步检查运行配置。

```
$ docker exec -it tik_influxdb_1 influx --precision rfc3339
Connected to http://localhost:8086 version 1.3.3
InfluxDB shell version: 1.3.3
> show databases
name: databases
name
----
_internal
telegraf
> use telegraf
Using database telegraf
> show subscriptions
name: telegraf
retention_policy name                                           mode destinations
---------------- ----                                           ---- ------------
autogen          kapacitor-dc455e9d-b306-4687-aa39-f146a250dd76 ANY  [http://kapacitor:9092]

name: _internal
retention_policy name                                           mode destinations
---------------- ----                                           ---- ------------
monitor          kapacitor-dc455e9d-b306-4687-aa39-f146a250dd76 ANY  [http://kapacitor:9092]
> exit
```

## [Kapacitor警报和TICKscript](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#kapacitor-alerts-and-the-tickscript)

TICKscript的顶级节点定义了执行底层节点链的模式。可以设置它们，以便Kapacitor以稳定的流方式接收已处理的数据，或者触发处理一批数据点，从中接收结果。

### [设置实时流CPU警报](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#setting-up-a-live-stream-cpu-alert)

要创建警报流，必须：

- 在TICKscript中声明所需的功能
- 在Kapacitor中定义实际的警报任务
- 通过记录流活动的样本然后播放它来测试警报任务
- 启用警报

已在`home/kapacitor`目录中准备了一个初始脚本，该脚本作为卷映射到Kapacitor容器（`home/kapacitor/cpu_alert_stream.tick`）中。

这个简单的脚本只涉及丰富的域特定TICKscript语言的基础知识。它具有自我描述性，应易于理解。

*cpu_alert_stream.tick*

```
stream
    // Select just the cpu measurement from our example database.
    |from()
        .measurement('cpu')
    |alert()
        .crit(lambda: "usage_idle" <  70)
        // Whenever we get an alert write it to a file
        .log('/var/log/kapacitor/alerts-stream.log')
```

请注意，该`alerts-stream.log`文件将写入映射回包目录树的卷`./var/log/kapacitor`。这将简化日志检查。

然后可以在Docker上使用TICKscript在Kapacitor容器中定义新警报。

```
$ docker exec tik_kapacitor_1 sh -c "cd /home/kapacitor && kapacitor define cpu_alert_stream -type stream -tick ./cpu_alert_stream.tick -dbrp telegraf.autogen"
```

使用以下内容验证是否已创建警报。

```
$ docker exec tik_kapacitor_1 kapacitor show cpu_alert_stream
ID: cpu_alert_stream
Error:
Template:
Type: stream
Status: disabled
Executing: false
Created: 17 Aug 17 09:30 UTC
Modified: 17 Aug 17 09:30 UTC
LastEnabled: 01 Jan 01 00:00 UTC
Databases Retention Policies: ["telegraf"."autogen"]
TICKscript:
stream
    // Select just the cpu measurement from our example database.
    |from()
        .measurement('cpu')
    |alert()
        .crit(lambda: "usage_idle" < 70)
        // Whenever we get an alert write it to a file.
        .log('/var/log/kapacitor/alerts-stream.log')

DOT:
digraph cpu_alert_stream {
stream0 -> from1;
from1 -> alert2;
}
```

#### [使用'record'测试流警报](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#test-the-stream-alert-using-record)

在启用警报之前，检查其行为是明智的。可以使用Kapacitor'record'命令完成警报流的行为测试。这将返回一个UUID，然后可以将其用作列出和重放测试运行中捕获的内容的参考。

```
$ docker exec tik_kapacitor_1 kapacitor record stream -task cpu_alert_stream -duration 60s
fd7d7081-c985-433e-87df-97ab0c267161
```

在记录此测试运行的那一刻，为了强制一个或多个CPU具有低空闲测量，这将触发警报，执行将产生一些人为负载的过程将是有用的。例如，在第三个控制台中，可能会执行以下操作。

```shell
while true; do i=0; done;
```

使用以下命令列出录制内容：

```
$ docker exec tik_kapacitor_1 kapacitor list recordings fd7d7081-c985-433e-87df-97ab0c267161
ID                                   Type    Status    Size      Date                   
fd7d7081-c985-433e-87df-97ab0c267161 stream  finished  1.9 kB    17 Aug 17 09:34 UTC
```

#### [重新录制流警报的录像](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#rerunning-a-recording-of-a-stream-alert)

重新运行录制时，警报将写入`alerts-stream.log`启用警报时将发生的警报。重播录音如下：

```
docker exec tik_kapacitor_1 kapacitor replay -recording fd7d7081-c985-433e-87df-97ab0c267161  -task cpu_alert_stream
c8cd033f-a79e-46a6-bb5d-81d2f56722b2
```

检查本地`var/log/kapacitor`目录的内容。

```
$ ls -1 var/log/kapacitor/
alerts-stream.log
kapacitor.log
README.md
```

检查内容`alerts-stream.log`。

```
$ sudo less -X var/log/kapacitor/alerts-stream.log
{"id":"cpu:nil","message":"cpu:nil is CRITICAL","details":"{...}\n","time":"2017-08-17T09:36:09.693216014Z","duration":0,"level":"CRITICAL","data":{...
```

#### [启用警报流](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#enable-the-alert-stream)

一旦明确新警报不会产生垃圾邮件，并且它实际上会捕获有意义的信息，就可以在Kapacitor中启用它。

```
$ docker exec tik_kapacitor_1 kapacitor enable cpu_alert_stream
```

通过再次显示任务来验证是否已启用它。

```
$ docker exec tik_kapacitor_1 kapacitor show cpu_alert_stream
ID: cpu_alert_stream
Error:
Template:
Type: stream
Status: enabled
Executing: true
...
```

如果不再需要警报流，则同样可以禁用它。

```
$ docker exec tik_kapacitor_1 kapacitor disable cpu_alert_stream
```

### [设置批量CPU警报](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#setting-up-a-batch-cpu-alert)

设置TICKscript节点链的第二种方式是批处理。可以在时间序列数据点的窗口上周期性地执行批处理。

要创建批处理，必须：

- 声明要采样的所需功能，窗口或时间段，并在TICKscript中运行频率
- 在Kapacitor中定义实际的警报任务
- 通过记录数据点样本然后播放来测试警报任务
- 启用警报

可能已经注意到已在目录中创建了示例批处理TICKscript `home/kapacitor`。

与基于流的TICKscript一样，内容是自描述的，应该易于理解。

*cpu_alert_batch.tick*

```
batch
    |query('''
        SELECT usage_idle
        FROM "telegraf"."autogen"."cpu"
    ''')
        .period(5m)
        .every(5m)
    |alert()
        .crit(lambda: "usage_idle" < 70)
        .log('/var/log/kapacitor/alerts-batch.log')
```

这里`alerts-batch.log`将再次写入映射为卷的目录到Kapacitor容器中。

然后可以在Docker上使用TICKscript在Kapacitor容器中定义新警报。

```
$ docker exec tik_kapacitor_1 sh -c "cd /home/kapacitor && kapacitor define cpu_alert_batch -type batch -tick ./cpu_alert_batch.tick -dbrp telegraf.autogen"
```

验证是否已创建任务。

```
$ docker exec tik_kapacitor_1 kapacitor show cpu_alert_batch
ID: cpu_alert_batch
Error:
Template:
Type: batch
Status: disabled
Executing: false
Created: 17 Aug 17 12:41 UTC
Modified: 17 Aug 17 13:06 UTC
LastEnabled: 01 Jan 01 00:00 UTC
Databases Retention Policies: ["telegraf"."autogen"]
TICKscript:
batch
    |query('''
        SELECT usage_idle
        FROM "telegraf"."autogen"."cpu"
    ''')
        .period(5m)
        .every(5m)
    |alert()
        .crit(lambda: "usage_idle" < 70)
        .log('/var/log/kapacitor/alerts-batch.log')

DOT:
digraph cpu_alert_batch {
query1 -> alert2;
}
```

#### [使用'record'测试批处理警报](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#test-the-batch-alert-using-record)

与流警报一样，建议在启用警报任务之前对其进行测试。

通过创建人为CPU负载来准备一些警报触发数据点。例如，在第三个控制台中，以下可能会运行一两分钟。

```shell
while true; do i=0; done;
```

可以使用Kapacitor'record'命令生成警报批处理方式的测试运行。

```
docker exec tik_kapacitor_1 kapacitor record batch -task cpu_alert_batch -past 5m
b2c46972-8d01-4fab-8088-56fd51fa577c
```

使用以下命令列出录制内容。

```
$ docker exec tik_kapacitor_1 kapacitor list recordings b2c46972-8d01-4fab-8088-56fd51fa577c
ID                                   Type    Status    Size      Date                   
b2c46972-8d01-4fab-8088-56fd51fa577c batch   finished  2.4 kB    17 Aug 17 13:06 UTC  
```

#### [重新运行批量警报的记录](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#rerunning-a-recording-of-a-batch-alert)

重新运行录制`alerts-batch.log`时，会在批处理期间发现警报时将警报写入。重播录音如下：

```
$ docker exec tik_kapacitor_1 kapacitor replay -recording b2c46972-8d01-4fab-8088-56fd51fa577c -task cpu_alert_batch
0cc65a9f-7dba-4a02-a118-e95b4fccf123
```

检查本地`var/log/kapacitor`目录的内容。

```
$ ls -1 var/log/kapacitor/
alerts-batch.log
alerts-stream.log
kapacitor.log
README.md
README.md
```

检查内容`alerts-batch.log`。

```
$ sudo less -X var/log/kapacitor/alerts-batch.log
{"id":"cpu:nil","message":"cpu:nil is CRITICAL","details":"{...}\n","time":"2017-08-17T13:07:00.156730835Z","duration":0,"level":"CRITICAL","data":{...
```

#### [启用批处理警报](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#enable-the-batch-alert)

一旦明确新警报不会产生垃圾邮件，并且它实际上会捕获有意义的信息，就可以在Kapacitor中启用它。

```
$ docker exec tik_kapacitor_1 kapacitor enable cpu_alert_batch
```

通过再次显示任务来验证是否已启用它。

```
$ docker exec tik_kapacitor_1 kapacitor show cpu_alert_batch
ID: cpu_alert_batch
Error:
Template:
Type: batch
Status: enabled
Executing: true
Created: 17 Aug 17 12:41 UTC
...
```

如果不再需要警报流，则同样可以禁用它。

```
$ docker exec tik_kapacitor_1 kapacitor disable cpu_alert_batch
```

### [摘要](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#summary)

这篇简短的教程介绍了使用Docker启动TICK堆栈并检查Kapacitor最基本功能的最基本步骤：配置和测试由写入InfluxDB的数据更改触发的警报。此安装可用于进一步探索Kapacitor及其与InfluxDB和Telegraf的集成。

### [关闭堆栈](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/#shutting-down-the-stack)

可以通过两种方式拆除堆栈。*或者，在第一个控制台中按CTRL + C *或者，在第二个控制台中运行`$ docker-compose down --volumes`


# Kapacitor入门

Kapacitor是一个处理流和批处理数据的数据处理引擎。本指南介绍了两种工作流程，并讲授了使用Kapacitor的基础知识。

## [要求](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#requirements)

- [InfluxDB](https://docs.influxdata.com/influxdb/latest/) 1.3.0+ - *您可以在没有InfluxDB的情况下使用Kapacitor，但它很容易设置。本指南中的步骤假设已安装InfluxDB。*
- [Telegraf](https://docs.influxdata.com/telegraf/latest/) 1.4.0+
- [Kapacitor](https://docs.influxdata.com/kapacitor/latest/) - [下载最新版本的Kapacitor](https://portal.influxdata.com/downloads)

## [用例](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#the-use-case)

本指南遵循触发服务器上高CPU使用率警报的经典用例。CPU数据是Telegraf开箱即用的默认系统指标之一。

## [这个过程](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#the-process)

1. 安装InfluxDB和Telegraf。
2. 启动InfluxDB并从Telegraf发送数据。
3. 安装Kapacitor。
4. 启动Kapacitor。
5. 定义并运行流任务以触发CPU警报。
6. 定义并运行批处理任务以触发CPU警报。

## [安装](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#installing)

可以安装TICKStack服务作为Systemd的一部分在主机上运行，也可以从Docker容器运行它们。本指南将重点介绍如何在与Systemd服务相同的主机上安装和运行它们。

如果您想探索使用这些组件的Docker部署，[请查看这些说明。](https://docs.influxdata.com/kapacitor/v1.5/introduction/install-docker/)

InfluxDB，Telegraf和Kapacitor应用程序需要按顺序安装在同一主机上。

所有示例都假设Kapacitor正在运行`http://localhost:9092`并且InfluxDB 正在运行`http://localhost:8086`。

## [InfluxDB + Telegraf](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#influxdb-telegraf)

使用Linux系统软件包（，）（如果可用）安装[InfluxDB](https://docs.influxdata.com/influxdb/latest/introduction/installation/)。`.deb``.rpm`

使用systemctl启动InfluxDB：

```bash
$ sudo systemctl start influxdb
```

验证InfluxDB启动：

```bash
$ sudo journalctl -f -n 128 -u influxdb
zář 01 14:47:43 algonquin systemd[1]: Started InfluxDB is an open-source, distributed, time series database.
zář 01 14:47:43 algonquin influxd[14778]:  8888888           .d888 888                   8888888b.  888888b.
zář 01 14:47:43 algonquin influxd[14778]:    888            d88P"  888                   888  "Y88b 888  "88b
zář 01 14:47:43 algonquin influxd[14778]:    888            888    888                   888    888 888  .88P
zář 01 14:47:43 algonquin influxd[14778]:    888   88888b.  888888 888 888  888 888  888 888    888 8888888K.
zář 01 14:47:43 algonquin influxd[14778]:    888   888 "88b 888    888 888  888  Y8bd8P\' 888    888 888  "Y88b
zář 01 14:47:43 algonquin influxd[14778]:    888   888  888 888    888 888  888   X88K   888    888 888    888
zář 01 14:47:43 algonquin influxd[14778]:    888   888  888 888    888 Y88b 888 .d8""8b. 888  .d88P 888   d88P
zář 01 14:47:43 algonquin influxd[14778]:  8888888 888  888 888    888  "Y88888 888  888 8888888P"  8888888P"
zář 01 14:47:43 algonquin influxd[14778]: [I] 2017-09-01T12:47:43Z InfluxDB starting, version 1.3.5, branch HEAD, commit 9d9001036d3585cf21925c13a57881bc6c8dcc7e
zář 01 14:47:43 algonquin influxd[14778]: [I] 2017-09-01T12:47:43Z Go version go1.8.3, GOMAXPROCS set to 8
zář 01 14:47:43 algonquin influxd[14778]: [I] 2017-09-01T12:47:43Z Using configuration at: /etc/influxdb/influxdb.conf
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z Using data dir: /var/lib/influxdb/data service=store
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z opened service service=subscriber
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z Starting monitor system service=monitor
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z 'build' registered for diagnostics monitoring service=monitor
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z 'runtime' registered for diagnostics monitoring service=monitor
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z 'network' registered for diagnostics monitoring service=monitor
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z 'system' registered for diagnostics monitoring service=monitor
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z Starting precreation service with check interval of 10m0s, advance period of 30m0s service=shard-precreation
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z Starting snapshot service service=snapshot
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z Starting continuous query service service=continuous_querier
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z Starting HTTP service service=httpd
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z Authentication enabled:false service=httpd
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z Listening on HTTP:[::]:8086 service=httpd
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z Starting retention policy enforcement service with check interval of 30m0s service=retention
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z Listening for signals
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z Sending usage statistics to usage.influxdata.com
zář 01 14:47:44 algonquin influxd[14778]: [I] 2017-09-01T12:47:44Z Storing statistics in database '_internal' retention policy 'monitor', at interval 10s service=monitor
...
```

接下来使用Linux系统软件包（，）（如果可用）安装[Telegraf](https://docs.influxdata.com/telegraf/latest/introduction/installation/)。`.deb``.rpm`

安装并启动Telegraf后，默认情况下，它会将系统指标发送到InfluxDB，后者会自动创建“telegraf”数据库。

Telegraf配置文件可以在其默认位置找到：`/etc/telegraf/telegraf.conf`。对于此介绍，值得注意的是与将在下面显示的Kapacitor任务相关的一些值。即：

- `[agent].interval` - 声明将系统指标发送到InfluxDB的频率
- `[[outputs.influxd]]` - 声明如何连接到InfluxDB和目标数据库，这是默认的'telegraf'数据库。
- `[[inputs.cpu]]` - 声明如何收集要发送到InfluxDB的系统cpu指标。

*示例 - 相关部分 /etc/telegraf/telegraf.conf*

```
[agent]
  ## Default data collection interval for all inputs
  interval = "10s"

...
[[outputs.influxdb]]
  ## The HTTP or UDP URL for your InfluxDB instance.  Each item should be
  ## of the form:
  ##   scheme "://" host [ ":" port]
  ##
  ## Multiple urls can be specified as part of the same cluster,
  ## this means that only ONE of the urls will be written to each interval.
  # urls = ["udp://localhost:8089"] # UDP endpoint example
  urls = ["http://localhost:8086"] # required
  ## The target database for metrics (telegraf will create it if not exists).
  database = "telegraf" # required
...
[[inputs.cpu]]
  ## Whether to report per-cpu stats or not
  percpu = true
  ## Whether to report total system cpu stats or not
  totalcpu = true
  ## If true, collect raw CPU time metrics.
  collect_cpu_time = false
```

Telegraf很可能已经开始安装。

检查Telegraf服务的当前状态：

```
 $ sudo systemctl status telegraf
● telegraf.service - The plugin-driven server agent for reporting metrics into InfluxDB
   Loaded: loaded (/lib/systemd/system/telegraf.service; enabled; vendor preset: enabled)
   Active: active (running) since Pá 2017-09-01 14:52:10 CEST; 20min ago
     Docs: https://github.com/influxdata/telegraf
 Main PID: 15068 (telegraf)
    Tasks: 18
   Memory: 14.4M
      CPU: 6.789s
   CGroup: /system.slice/telegraf.service
           └─15068 /usr/bin/telegraf -config /etc/telegraf/telegraf.conf -config-directory /etc/telegraf/telegraf.d

zář 01 14:52:10 algonquin systemd[1]: Started The plugin-driven server agent for reporting metrics into InfluxDB.
zář 01 14:52:11 algonquin telegraf[15068]: 2017-09-01T12:52:11Z I! Starting Telegraf (version 1.3.3)
zář 01 14:52:11 algonquin telegraf[15068]: 2017-09-01T12:52:11Z I! Loaded outputs: influxdb
zář 01 14:52:11 algonquin telegraf[15068]: 2017-09-01T12:52:11Z I! Loaded inputs: inputs.cpu inputs.disk inputs.diskio inputs.kernel inputs.mem inputs.processes in
zář 01 14:52:11 algonquin telegraf[15068]: 2017-09-01T12:52:11Z I! Tags enabled: host=algonquin
zář 01 14:52:11 algonquin telegraf[15068]: 2017-09-01T12:52:11Z I! Agent Config: Interval:10s, Quiet:false, Hostname:"algonquin", Flush Interval:10s
```

如果Telegraf处于“非活动状态”，请按以下步骤启动：

```
$ sudo systemctl start telegraf
```

检查其状态，并检查系统日志以确保与InfluxDB没有连接错误。

```
 $ sudo journalctl -f -n 128 -u telegraf
-- Logs begin at Pá 2017-09-01 09:59:06 CEST. --
zář 01 15:15:42 algonquin systemd[1]: Started The plugin-driven server agent for reporting metrics into InfluxDB.
zář 01 15:15:43 algonquin telegraf[16968]: 2017-09-01T13:15:43Z I! Starting Telegraf (version 1.3.3)
zář 01 15:15:43 algonquin telegraf[16968]: 2017-09-01T13:15:43Z I! Loaded outputs: influxdb
zář 01 15:15:43 algonquin telegraf[16968]: 2017-09-01T13:15:43Z I! Loaded inputs: inputs.disk inputs.diskio inputs.kernel inputs.mem inputs.processes inputs.swap inputs.system inputs.cpu
zář 01 15:15:43 algonquin telegraf[16968]: 2017-09-01T13:15:43Z I! Tags enabled: host=algonquin
zář 01 15:15:43 algonquin telegraf[16968]: 2017-09-01T13:15:43Z I! Agent Config: Interval:10s, Quiet:false, Hostname:"algonquin", Flush Interval:10s
```

InfluxDB和Telegraf现在正在运行并监听localhost。等待一分钟，Telegraf向InfluxDB提供少量系统指标数据。然后，确认InfluxDB具有Kapacitor将使用的数据。

这可以通过以下查询来实现：

```bash
$ curl -G 'http://localhost:8086/query?db=telegraf' --data-urlencode 'q=SELECT mean(usage_idle) FROM cpu'
```

这应返回类似于以下示例的结果。

*示例 - 来自InfluxDB REST查询的结果*

```
{"results":[{"statement_id":0,"series":[{"name":"cpu","columns":["time","mean"],"values":[["1970-01-01T00:00:00Z",91.82304336748372]]}]}]}
```

## [安装和启动Kapacitor](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#installing-and-starting-kapacitor)

使用Linux系统软件包（，）（如果可用）安装[Kapacitor](https://docs.influxdata.com/kapacitor/v1.5/introduction/installation/)。`.deb``.rpm`

默认的Kapacitor配置文件已解压缩到`/etc/kapacitor/kapacitor.conf`。可以从Kapacitor守护程序中提取当前配置的副本，如下所示：

```bash
kapacitord config > kapacitor.conf
```

配置是一个[toml](https://github.com/toml-lang/toml)文件，与InfluxDB配置非常相似。这是因为可以为InfluxDB配置的任何输入也适用于Kapacitor。

启动Kapacitor服务：

```bash
$ sudo systemctl start kapacitor
```

验证Kapacitor服务的状态：

```bash
$ sudo systemctl status kapacitor
● kapacitor.service - Time series data processing engine.
   Loaded: loaded (/lib/systemd/system/kapacitor.service; enabled; vendor preset: enabled)
   Active: active (running) since Pá 2017-09-01 15:34:16 CEST; 3s ago
     Docs: https://github.com/influxdb/kapacitor
 Main PID: 18526 (kapacitord)
    Tasks: 13
   Memory: 9.3M
      CPU: 122ms
   CGroup: /system.slice/kapacitor.service
           └─18526 /usr/bin/kapacitord -config /etc/kapacitor/kapacitor.conf

zář 01 15:34:16 algonquin systemd[1]: Started Time series data processing engine..
zář 01 15:34:16 algonquin kapacitord[18526]: '##:::'##::::'###::::'########:::::'###:::::'######::'####:'########::'#######::'########::
zář 01 15:34:16 algonquin kapacitord[18526]:  ##::'##::::'## ##::: ##.... ##:::'## ##:::'##... ##:. ##::... ##..::'##.... ##: ##.... ##:
zář 01 15:34:16 algonquin kapacitord[18526]:  ##:'##::::'##:. ##:: ##:::: ##::'##:. ##:: ##:::..::: ##::::: ##:::: ##:::: ##: ##:::: ##:
zář 01 15:34:16 algonquin kapacitord[18526]:  #####::::'##:::. ##: ########::'##:::. ##: ##:::::::: ##::::: ##:::: ##:::: ##: ########::
zář 01 15:34:16 algonquin kapacitord[18526]:  ##. ##::: #########: ##.....::: #########: ##:::::::: ##::::: ##:::: ##:::: ##: ##.. ##:::
zář 01 15:34:16 algonquin kapacitord[18526]:  ##:. ##:: ##.... ##: ##:::::::: ##.... ##: ##::: ##:: ##::::: ##:::: ##:::: ##: ##::. ##::
zář 01 15:34:16 algonquin kapacitord[18526]:  ##::. ##: ##:::: ##: ##:::::::: ##:::: ##:. ######::'####:::: ##::::. #######:: ##:::. ##:
zář 01 15:34:16 algonquin kapacitord[18526]: ..::::..::..:::::..::..:::::::::..:::::..:::......:::....:::::..::::::.......:::..:::::..::
zář 01 15:34:16 algonquin kapacitord[18526]: 2017/09/01 15:34:16 Using configuration at: /etc/kapacitor/kapacitor.conf
```

由于InfluxDB在`http://localhost:8086`Kapacitor 上运行，因此在启动时会发现它并在InfluxDB上创建多个[订阅](https://github.com/influxdata/influxql/blob/master/README.md#create-subscription)。这些订阅告诉InfluxDB将它收到的所有数据发送给Kapacitor。

要获取更多日志数据，请检查传统`/var/log/kapacitor`目录中的日志文件。

```
$ sudo tail -f -n 128 /var/log/kapacitor/kapacitor.log
[run] 2017/09/01 15:34:16 I! Kapacitor starting, version 1.3.1, branch master, commit 3b5512f7276483326577907803167e4bb213c613
[run] 2017/09/01 15:34:16 I! Go version go1.7.5
[srv] 2017/09/01 15:34:16 I! Kapacitor hostname: localhost
[srv] 2017/09/01 15:34:16 I! ClusterID: e181c0c9-f173-42b5-92c7-10878c15887b ServerID: b0a73d8a-dae8-473c-a053-c06fcaacae7d
[task_master:main] 2017/09/01 15:34:16 I! opened
[scrapers] 2017/09/01 15:34:17 I! [Starting target manager...]
[httpd] 2017/09/01 15:34:17 I! Starting HTTP service
[httpd] 2017/09/01 15:34:17 I! Authentication enabled: false
[httpd] 2017/09/01 15:34:17 I! Listening on HTTP: [::]:9092
[run] 2017/09/01 15:34:17 I! Listening for signals
[httpd] 127.0.0.1 - - [01/Sep/2017:15:34:20 +0200] "POST /write?consistency=&db=_internal&precision=ns&rp=monitor HTTP/1.1" 204 0 "-" "InfluxDBClient" 422971ab-8f1a-11e7-8001-000000000000 1373
[httpd] 127.0.0.1 - - [01/Sep/2017:15:34:20 +0200] "POST /write?consistency=&db=telegraf&precision=ns&rp=autogen HTTP/1.1" 204 0 "-" "InfluxDBClient" 42572567-8f1a-11e7-8002-000000000000 336
...
```

这里可以看到一些基本的启动消息：侦听HTTP端口并将数据发布到InfluxDB。此时，InfluxDB正在将从Telegraf收到的数据流式传输到Kapacitor。

## [Kapacitor的任务](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#kapacitor-tasks)

Kapacitor `task`定义了对一组数据进行的工作。有两种类型的任务：`stream`和`batch`。

一个`stream`任务反映书面InfluxDB到Kapacitor所有数据。这会将查询开销从InfluxDB卸载到Kapacitor，但需要Kapacitor将数据存储在磁盘上。

一个`batch`任务在设定的时间间隔从查询数据InfluxDB和它的查询处理数据。

Kapacitor任务使用[TICKscript](https://docs.influxdata.com/kapacitor/v1.5/tick/)语法定义数据处理管道。任务文件通常称为“TICKscripts”。

### [任务执行](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#task-execution)

在每个TICKscript的开头，您指定包含TICKscript应使用`dbrp`关键字操作的数据的数据库和保留策略。

```js
dbrp "telegraf"."autogen"

// ...
```

当Kapacitor从数据库接收数据并且保留策略与指定的数据匹配时，它会执行TICKscript。

您只能根据数据库和保留策略执行Kapacitor任务。Kapacitor不支持基于其他条件的任务执行。

## [从流数据触发警报](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#triggering-alerts-from-stream-data)

现在设置了TICKStack（不包括Chronograf，这里没有介绍）。本指南现在将介绍实际使用Kapacitor的基本原理。

那么应该指示Kapacitor做什么？

最常见的Kapacitor用例是触发警报。下面的示例将设置高CPU使用率的警报。如何定义高CPU使用率？Telegraf根据cpu在空闲状态下花费的时间百分比向InfluxDB写入cpu指标。出于演示目的，假设当空闲使用率降至70％以下时，应触发严重警报。

现在可以编写TICKscript来涵盖这些标准。将下面的脚本复制到一个名为的文件中`cpu_alert.tick`：

```js
dbrp "telegraf"."autogen"

stream
    // Select just the cpu measurement from our example database.
    |from()
        .measurement('cpu')
    |alert()
        .crit(lambda: int("usage_idle") <  70)
        // Whenever we get an alert write it to a file.
        .log('/tmp/alerts.log')
```

Kapacitor有一个HTTP API，所有通信都会发生。该`kapacitor`客户端应用程序公开通过命令行的API。现在使用此CLI工具来定义`task`它可以访问的数据库（包括保留策略）：

```bash
kapacitor define cpu_alert -tick cpu_alert.tick
```

> 关于声明数据库和保留策略的注意事项：从Kapacitor 1.4开始，可以使用脚本中的可选语句声明将应用TICKscript的数据库和保留策略：例如`dbrp "telegraf"."autogen"`。如果未在脚本中声明，则必须在使用kapacitor标志`-dbrp`后跟参数“<DBNAME>” 定义任务时定义它。“<RETENTION_POLICY>”。

使用该`list`命令验证是否已创建警报。

```
$ kapacitor list tasks
ID        Type      Status    Executing Databases and Retention Policies
cpu_alert stream    disabled  false     ["telegraf"."autogen"]
```

使用该`show`命令查看有关任务的详细信息。

```
$ kapacitor show cpu_alert
ID: cpu_alert
Error:
Template:
Type: stream
Status: disabled
Executing: false
...
```

下面将详细介绍此命令。

Kapacitor现在知道如何触发警报。

但是，在启用任务之前不会发生任何事情。在启用之前，应首先测试该任务，以确保它不会通过警报将日志文件或通信通道垃圾邮件。记录当前数据流并使用它来测试新任务：

```bash
kapacitor record stream -task cpu_alert -duration 60s
```

由于任务是使用数据库和保留策略对定义的，因此记录知道仅记录来自该数据库和保留策略的数据。

- **注 - 拒绝连接故障排除 -**如果在运行record命令时返回类型`getsockopt: connection refused`（Linux）或`connectex: No connection could be made...`（Windows）的错误，请确保Kapacitor服务正在运行。请参阅上面的[安装和启动Kapacitor部分](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#installing-and-starting-kapacitor)。如果启动了Kapacitor并且仍然遇到此错误，请检查主机的防火墙设置并确保该端口`9092`可访问。检查中的消息`/var/log/kapacitor/kapacitor.log`。该`http`配置或其他配置可能存在问题，`/etc/kapacitor/kapacitor.conf`这将显示在日志中。如果Kapacitor服务正在另一台主机上运行，请将`KAPACITOR_URL`本地shell中的环境变量设置为远程计算机上的Kapacitor端点。

现在获取返回的ID并将其放入bash变量中以便以后使用（返回的实际UUID将不同）：

```bash
rid=cd158f21-02e6-405c-8527-261ae6f26153
```

确认录制内容捕获了一些数据。跑

```bash
kapacitor list recordings $rid
```

输出应如下所示：

```
ID                                      Type    Status    Size      Date
cd158f21-02e6-405c-8527-261ae6f26153    stream  finished  2.2 kB    04 May 16 11:44 MDT
```

只要大小超过几个字节，就可以确定捕获了一些数据。如果Kapacitor尚未收到数据，请检查每一层：Telegraf→InfluxDB→Kapacitor。如果Telegraf无法与InfluxDB通信，它将记录错误。InfluxDB将记录一个错误，`connection refused`如果它无法向Kapacitor发送数据。运行查询`SHOW SUBSCRIPTIONS`以查找InfluxDB用于将数据发送到Kapacitor的端点。

```
$ curl -G 'http://localhost:8086/query?db=telegraf' --data-urlencode 'q=SHOW SUBSCRIPTIONS'

{"results":[{"statement_id":0,"series":[{"name":"_internal","columns":["retention_policy","name","mode","destinations"],"values":[["monitor","kapacitor-ef3b3f9d-0997-4c0b-b1b6-5d0fb37fe509","ANY",["http://localhost:9092"]]]},{"name":"telegraf","columns":["retention_policy","name","mode","destinations"],"values":[["autogen","kapacitor-ef3b3f9d-0997-4c0b-b1b6-5d0fb37fe509","ANY",["http://localhost:9092"]]]}]}]}
```

利用从流中记录的数据的快照，然后可以将该数据重放到新任务。该`replay`操作仅将数据重播到特定任务。这样就可以完全隔离测试任务：

```bash
kapacitor replay -recording $rid -task cpu_alert
```

由于数据已经被记录，因此可以尽快重放，而不是等待实时通过。`-real-clock`设置标志后，将通过等待时间戳传递之间的增量来重放数据，但无论实时是否通过，结果都是相同的。这是因为它接收的数据点在每个节点上测量时间。

使用以下命令检查日志。

```bash
sudo cat /tmp/alerts.log
```

是否收到任何警报？该文件应包含JSON行，其中每行代表一个警报。JSON行包含警报级别和触发警报的数据。

根据主机的繁忙程度，可能不是。

可以将任务修改为非常敏感，以确保警报正常工作。在TICKscript中将lamda函数更改`.crit(lambda: "usage_idle" < 70)`为`.crit(lambda: "usage_idle" < 100)`，并再次定义任务。

每当您想要更新任务时，请更改TICKscript，然后`define`仅使用`TASK_NAME`和`-tick`参数再次运行命令：

现在，录制期间收到的每个数据点都会触发警报。

```bash
kapacitor define cpu_alert -tick cpu_alert.tick
```

再次重播并验证结果。

```bash
kapacitor replay -recording $rid -task cpu_alert
```

一旦`alerts.log`结果验证它正在工作，将`usage_idle`阈值更改回更合理的级别，并使用`define`上面显示的命令再次重新定义任务。

启用任务，以便它可以开始处理实时数据流，具有：

```bash
kapacitor enable cpu_alert
```

现在，警报将实时写入日志。

要查看任务是否正在接收数据并按预期运行，请`show`再次运行该命令以获取有关它的更多信息：

```bash
$ kapacitor show cpu_alert
|from()
ID: cpu_alert
Error:
Type: stream
Status: Enabled
Executing: true
Created: 04 May 16 21:01 MDT
Modified: 04 May 16 21:04 MDT
LastEnabled: 04 May 16 21:03 MDT
Databases Retention Policies: [""."autogen"]
TICKscript:
stream
    // Select just the cpu me
        .measurement('cpu')
    |alert()
        .crit(lambda: "usage_idle" <  70)
        // Whenever we get an alert write it to a file.
        .log('/tmp/alerts.log')

DOT:
digraph asdf {
graph [throughput="0.00 points/s"];

stream0 [avg_exec_time_ns="0" ];
stream0 -> from1 [processed="12"];

from1 [avg_exec_time_ns="0" ];
from1 -> alert2 [processed="12"];

alert2 [alerts_triggered="0" avg_exec_time_ns="0" ];
}
```

第一部分包含有关任务状态的信息以及可能遇到的任何错误。该`TICKscript`部分显示Kapacitor存储在其本地数据库中的TICKscript版本。

最后一部分`DOT`是[graphviz点](http://www.graphviz.org/)格式树，其中包含有关TICKscript定义的数据处理管道的信息。其成员是键值关联数组条目，包含有关每个节点的统计信息以及沿边缘到下一个节点的链接，还包括关联数组统计信息。链接/边缘成员中的已*处理*密钥指示已沿图的指定边传递的数据点的数量。例如，在上面的`stream0`节点（也就是`stream`来自TICKscript 的var）已经向`from1`节点发送了12个点。该`from1`节点还向该节点发送了12个`alert2`点。由于Telegraf配置为发送`cpu`数据，所有12个点都与`from1`节点的起始/测量标准相匹配并被传递。

> 注意：在Debian或RedHat上安装graphviz（如果尚未安装）时，请使用OS提供程序提供的软件包。graphviz网站下载部分提供的软件包不是最新的。

现在任务正在使用实时数据运行，这是一个快速入侵，使用100％的一个核心来生成一些人工cpu活动：

```bash
while true; do i=0; done
```

有很多方法可以获得阈值警报。那么，为什么所有这些管道TICKscript的东西呢？总之，因为TICKscripts可以迅速扩展为*多*更强大。

### [陷阱 - 单引号和双引号](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#gotcha-single-versus-double-quotes)

TICKscripts中的单引号和双引号有很多不同之处：

请注意以下示例：

```js
var data = stream
    |from()
        .database('telegraf')
        .retentionPolicy('autogen')
        .measurement('cpu')
        // NOTE: Double quotes on server1
        .where(lambda: "host" == "server1")
```

此搜索的结果将始终为空，因为在“server1”周围使用了双引号。这意味着Kapacitor将搜索字段“host”等于*字段* “server1”中保存的值的系列。这可能不是预期的。更有可能的目的是搜索标签“host” *的值为* “server1”的系列，因此应使用单引号。双引号表示数据字段，单引号字符串值。要匹配该*值*，上面的tick脚本应如下所示：

```js
var data = stream
    |from()
        .database('telegraf')
        .retentionPolicy('autogen')
        .measurement('cpu')
        // NOTE: Single quotes on server1
        .where(lambda: "host" == 'server1')
```

### [扩展TICKscripts](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#extending-tickscripts)

下面的TICKscript将计算运行平均值并将当前值与其进行比较。如果值远离平均值超过3个标准偏差，它将触发警报。用`cpu_alert.tick`下面的TICKscript 替换脚本：

```js
stream
    |from()
        .measurement('cpu')
    |alert()
        // Compare values to running mean and standard deviation
        .crit(lambda: sigma("usage_idle") > 3)
        .log('/tmp/alerts.log')
```

就像这样，可以创建动态阈值，并且，如果cpu使用量在当天下降或在夜间出现峰值，则会发出警报。试试看。使用`define`更新任务TICKscript。

```bash
kapacitor define cpu_alert -tick cpu_alert.tick
```

> 注意：如果已启用任务，则使用该`define`命令重新定义任务将自动执行`reload`。要在不重新加载的情况下定义任务，请使用`-no-reload`

现在尾随警报日志：

```bash
sudo tail -f /tmp/alerts.log
```

不应该有任何警报触发。接下来，启动while循环以添加一些负载：

```bash
while true; do i=0; done
```

一旦创建了足够的人工负载，就应该立即将警报触发器写入日志。让循环运行几分钟。取消循环后，应发出另一个警报，指示cpu使用率已再次更改。使用此技术，可以为cpu使用的上升沿和下降沿以及任何异常值生成警报。

### [一个现实世界的例子](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#a-real-world-example)

既然已经涵盖了基础知识，这里有一个更真实的例子。一旦来自多个主机的指标流式传输到Kapacitor，就可以执行以下操作：聚合并对每个数据中心中运行的每个服务的CPU使用情况进行分组，然后根据第95个百分位触发警报。除了将警报写入日志之外，Kapacitor还可以与第三方实用程序集成：目前支持Slack，PagerDuty，HipChat，VictorOps等。警报也可以通过电子邮件发送，发布到自定义端点或触发自定义脚本的执行。还可以定义自定义消息格式，以便警报具有正确的上下文和含义。这个TICKscript看起来像下面的例子。

*示例 - 多个服务cpu上的流的TICKscript和第95百分位的警报*

```js
stream
    |from()
        .measurement('cpu')
    // create a new field called 'used' which inverts the idle cpu.
    |eval(lambda: 100.0 - "usage_idle")
        .as('used')
    |groupBy('service', 'datacenter')
    |window()
        .period(1m)
        .every(1m)
    // calculate the 95th percentile of the used cpu.
    |percentile('used', 95.0)
    |eval(lambda: sigma("percentile"))
        .as('sigma')
        .keep('percentile', 'sigma')
    |alert()
        .id('{{ .Name }}/{{ index .Tags "service" }}/{{ index .Tags "datacenter"}}')
        .message('{{ .ID }} is {{ .Level }} cpu-95th:{{ index .Fields "percentile" }}')
        // Compare values to running mean and standard deviation
        .warn(lambda: "sigma" > 2.5)
        .crit(lambda: "sigma" > 3.0)
        .log('/tmp/alerts.log')

        // Post data to custom endpoint
        .post('https://alerthandler.example.com')

        // Execute custom alert handler script
        .exec('/bin/custom_alert_handler.sh')

        // Send alerts to slack
        .slack()
        .channel('#alerts')

        // Sends alerts to PagerDuty
        .pagerDuty()

        // Send alerts to VictorOps
        .victorOps()
        .routingKey('team_rocket')
```

定义警报这么简单的事情可以很快扩展到适用于更大范围的事情。使用上面的脚本，如果任何数据中心中的任何服务偏离正常行为超过3个标准偏差（如历史记录的第95百分位数cpu使用量），将触发警报，并且将在1分钟内完成！

有关警报如何工作的详细信息，请参阅[AlertNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/alert_node/)文档。

## [从批处理数据触发警报](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#triggering-alerts-from-batch-data)

Kapacitor不仅可以处理流中的数据，还可以定期查询InfluxDB，然后批量处理这些数据。虽然触发基于cpu使用的警报更适合于流式传输案例，但是`batch`通过遵循相同的用例来演示任务如何工作的基本思想。

此TICKscript与早期的流任务大致相同，但作为批处理任务：

```js
dbrp "telegraf"."autogen"

batch
    |query('''
        SELECT mean(usage_idle)
        FROM "telegraf"."autogen"."cpu"
    ''')
        .period(5m)
        .every(5m)
        .groupBy(time(1m), 'cpu')
    |alert()
        .crit(lambda: "mean" < 70)
        .log('/tmp/batch_alerts.log')
```

将上面的脚本复制到文件中`batch_cpu_alert.tick`。

定义此任务：

```bash
kapacitor define batch_cpu_alert -tick batch_cpu_alert.tick
```

验证其创建：

```bash
$ kapacitor list tasks
ID              Type      Status    Executing Databases and Retention Policies
batch_cpu_alert batch     disabled  false     ["telegraf"."autogen"]
cpu_alert       stream    enabled   true      ["telegraf"."autogen"]
```

可以像这样记录任务中的查询结果（同样，实际的UUID会有所不同）：

```bash
kapacitor record batch -task batch_cpu_alert -past 20m
# Save the id again
rid=b82d4034-7d5c-4d59-a252-16604f902832
```

这将使用`batch_cpu_alert`任务中的查询记录批次的最后20分钟。在这种情况下，由于`period`是5分钟，最后4批将保存在录音中。

批量录制可以以相同的方式重播：

```bash
kapacitor replay -recording $rid -task batch_cpu_alert
```

检查警报日志以确保按预期生成警报。`sigma`上面的基于警报也可以适用于处理批量数据。在Kapacitor中玩耍并熟悉更新，测试和运行任务。

## [使用Kapacitor守护程序加载任务](https://docs.influxdata.com/kapacitor/v1.5/introduction/getting-started/#loading-tasks-with-the-kapacitor-daemon)

也可以将TICKscripts保存在声明的*加载*目录中 `kapacitor.conf`。通过这种方式，可以在Kapacitor守护程序启动时直接加载和启用任务和任务模板。此类脚本必须包含数据库和保留策略声明`dbrp`。

有关更多信息，请参阅“ [加载目录”](https://docs.influxdata.com/kapacitor/v1.5/guides/load_directory/)指南
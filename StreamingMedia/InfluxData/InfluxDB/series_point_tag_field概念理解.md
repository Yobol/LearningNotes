# series/point/tag/field

`point`对应InfluxDB中的一条记录，有三个重要属性：必须存在的time、string类型的`tag`、以及其他成员`field`；而`series`对应InfluxDB中一个measurement的保存策略和tag集。

## point

在InfluxDB中，`point`对应一条记录，而一个`point`由`measurement`、`tag set`、`field set`和`time`四部分组成。

在`point`中，`time`用来将数据与时间关联起来，`tag`用来检索，`field`用来记录一些信息，`measurement`用来归集相同类型的数据。

每个`point`由`timestamp` + `series`来保证唯一性。

## tag

`tag`的`key/value`都是字符串类型。

## field

一条记录中不需要建立索引的普通字段。

一般来说，不太会进行查询操作的字段可以设置为`field`，否则就设置为`tag`。

与`tag`强制为字符串类型不同，`field`类型可以为整型、浮点型、字符串。

## series

The collection of data in the InfluxDB data structure that share a measurement, tag set, and retention policy.

`series`是由`measurement`，`tag set`，`retention policy`共同定义的，即只有`measurement`，`point的tag`，`measurement的retention policy`都相等时，才认定为一个`series`。

## 参考

1. [InfluxDB术语](https://docs.influxdata.com/influxdb/v1.7/concepts/glossary/)
2. [series/point/tag/field](https://www.cnblogs.com/yihuihui/p/11386679.html)


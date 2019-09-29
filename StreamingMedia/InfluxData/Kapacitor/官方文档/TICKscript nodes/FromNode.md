# FromNode

The `from` node selects a subset of the data flowing through a [StreamNode.](https://docs.influxdata.com/kapacitor/v1.5/nodes/stream_node/) The stream node allows you to select which portion of the stream you want to process.

Example:

```js
stream
  |from()
    .database('mydb')
    .retentionPolicy('myrp')
    .measurement('mymeasurement')
    .where(lambda: "host" =~ /logger\d+/)
  |window()
  ...
```

The above example selects only data points from the database `mydb` and retention policy `myrp` and measurement `mymeasurement` where the tag `host` matches the regex `logger\d+`.

### [Constructor](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#constructor)

| Chaining Method | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| **from ( )**    | Creates a new stream node that can be further filtered using the Database, RetentionPolicy, Measurement and Where properties. From can be called multiple times to create multiple independent forks of the data stream. |

### [Property Methods](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#property-methods)

| Setters                             | Description                                                  |
| ----------------------------------- | ------------------------------------------------------------ |
| **database ( value string)**        | The database name. If empty any database will be used.       |
| **groupBy ( tag ...interface{})**   | Group the data by a set of tags.                             |
| **groupByMeasurement ( )**          | If set will include the measurement name in the group ID. Along with any other group by dimensions. |
| **measurement ( value string)**     | The measurement name If empty any measurement will be used.  |
| **quiet ( )**                       | Suppress all error logging events from this node.            |
| **retentionPolicy ( value string)** | The retention policy name If empty any retention policy will be used. |
| **round ( value time.Duration)**    | Optional duration for rounding timestamps. Helpful to ensure data points land on specific boundaries Example: stream |
| **truncate ( value time.Duration)** | Optional duration for truncating timestamps. Helpful to ensure data points land on specific boundaries Example: stream |
| **where ( lambda ast.LambdaNode)**  | Filter the current stream using the given expression. This expression is a Kapacitor expression. Kapacitor expressions are a superset of InfluxQL WHERE expressions. See the [expression](https://docs.influxdata.com/kapacitor/latest/tick/expr/) docs for more information. |

### [Chaining Methods](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#chaining-methods)

[Alert](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#alert), [Barrier](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#barrier), [Bottom](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#bottom), [ChangeDetect](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#changedetect), [Combine](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#combine), [Count](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#count), [CumulativeSum](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#cumulativesum), [Deadman](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#deadman), [Default](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#default), [Delete](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#delete),[Derivative](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#derivative), [Difference](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#difference), [Distinct](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#distinct), [Ec2Autoscale](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#ec2autoscale), [Elapsed](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#elapsed), [Eval](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#eval), [First](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#first), [Flatten](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#flatten), [From](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#from), [HoltWinters](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#holtwinters),[HoltWintersWithFit](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#holtwinterswithfit), [HttpOut](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#httpout), [HttpPost](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#httppost), [InfluxDBOut](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#influxdbout), [Join](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#join), [K8sAutoscale](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#k8sautoscale), [KapacitorLoopback](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#kapacitorloopback), [Last](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#last), [Log](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#log),[Max](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#max), [Mean](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#mean), [Median](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#median), [Min](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#min), [Mode](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#mode), [MovingAverage](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#movingaverage), [Percentile](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#percentile), [Sample](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#sample), [Shift](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#shift), [Sideload](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#sideload), [Spread](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#spread), [StateCount](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#statecount),[StateDuration](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#stateduration), [Stats](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#stats), [Stddev](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#stddev), [Sum](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#sum), [SwarmAutoscale](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#swarmautoscale), [Top](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#top), [Union](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#union), [Window](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#window)

------

## [Properties](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#properties)

Property methods modify state on the calling node. They do not add another node to the pipeline, and always return a reference to the calling node. Property methods are marked using the `.` operator.

### [Database](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#database)

The database name. If empty any database will be used.

```js
from.database(value string)
```



### [GroupBy](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#groupby)

Group the data by a set of tags.

Can pass literal * to group by all dimensions. Example:

```js
  stream
      |from()
          .groupBy(*)
from.groupBy(tag ...interface{})
```



### [GroupByMeasurement](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#groupbymeasurement)

If set will include the measurement name in the group ID. Along with any other group by dimensions.

Example:

```js
 stream
      |from()
          .database('mydb')
          .groupByMeasurement()
          .groupBy('host')
```

The above example selects all measurements from the database ‘mydb’ and then each point is grouped by the host tag and measurement name. Thus keeping measurements in their own groups.

```js
from.groupByMeasurement()
```



### [Measurement](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#measurement)

The measurement name If empty any measurement will be used.

```js
from.measurement(value string)
```



### [Quiet](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#quiet)

Suppress all error logging events from this node.

```js
from.quiet()
```



### [RetentionPolicy](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#retentionpolicy)

The retention policy name If empty any retention policy will be used.

```js
from.retentionPolicy(value string)
```



### [Round](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#round)

Optional duration for rounding timestamps. Helpful to ensure data points land on specific boundaries Example:

```js
    stream
       |from()
           .measurement('mydata')
           .round(1s)
```

All incoming data will be rounded to the nearest 1 second boundary.

```js
from.round(value time.Duration)
```



### [Truncate](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#truncate)

Optional duration for truncating timestamps. Helpful to ensure data points land on specific boundaries Example:

```js
    stream
       |from()
           .measurement('mydata')
           .truncate(1s)
```

All incoming data will be truncated to 1 second resolution.

```js
from.truncate(value time.Duration)
```



### [Where](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#where)

Filter the current stream using the given expression. This expression is a Kapacitor expression. Kapacitor expressions are a superset of InfluxQL WHERE expressions. See the [expression](https://docs.influxdata.com/kapacitor/latest/tick/expr/) docs for more information.

Multiple calls to the Where method will `AND` together each expression.

Example:

```js
    stream
       |from()
          .where(lambda: condition1)
          .where(lambda: condition2)
```

The above is equivalent to this example:

```js
    stream
       |from()
          .where(lambda: condition1 AND condition2)
```

NOTE: Becareful to always use `|from` if you want multiple different streams.

Example:

```js
  var data = stream
      |from()
          .measurement('cpu')
  var total = data
      .where(lambda: "cpu" == 'cpu-total')
  var others = data
      .where(lambda: "cpu" != 'cpu-total')
```

The example above is equivalent to the example below, which is obviously not what was intended.

Example:

```js
  var data = stream
      |from()
          .measurement('cpu')
          .where(lambda: "cpu" == 'cpu-total' AND "cpu" != 'cpu-total')
  var total = data
  var others = total
```

The example below will create two different streams each selecting a different subset of the original stream.

Example:

```js
  var data = stream
      |from()
          .measurement('cpu')
  var total = stream
      |from()
          .measurement('cpu')
          .where(lambda: "cpu" == 'cpu-total')
  var others = stream
      |from()
          .measurement('cpu')
          .where(lambda: "cpu" != 'cpu-total')
```

If empty then all data points are considered to match.

```js
from.where(lambda ast.LambdaNode)
```



## [Chaining Methods](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#chaining-methods-1)

Chaining methods create a new node in the pipeline as a child of the calling node. They do not modify the calling node. Chaining methods are marked using the `|` operator.

### [Alert](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#alert)

Create an alert node, which can trigger alerts.

```js
from|alert()
```

Returns: [AlertNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/alert_node/)



### [Barrier](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#barrier)

Create a new Barrier node that emits a BarrierMessage periodically.

One BarrierMessage will be emitted every period duration.

```js
from|barrier()
```

Returns: [BarrierNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/barrier_node/)



### [Bottom](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#bottom)

Select the bottom `num` points for `field` and sort by any extra tags or fields.

```js
from|bottom(num int64, field string, fieldsAndTags ...string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [ChangeDetect](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#changedetect)

Create a new node that only emits new points if different from the previous point.

```js
from|changeDetect(field string)
```

Returns: [ChangeDetectNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/change_detect_node/)



### [Combine](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#combine)

Combine this node with itself. The data is combined on timestamp.

```js
from|combine(expressions ...ast.LambdaNode)
```

Returns: [CombineNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/combine_node/)



### [Count](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#count)

Count the number of points.

```js
from|count(field string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [CumulativeSum](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#cumulativesum)

Compute a cumulative sum of each point that is received. A point is emitted for every point collected.

```js
from|cumulativeSum(field string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [Deadman](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#deadman)

Helper function for creating an alert on low throughput, a.k.a. deadman’s switch.

- Threshold: trigger alert if throughput drops below threshold in points/interval.
- Interval: how often to check the throughput.
- Expressions: optional list of expressions to also evaluate. Useful for time of day alerting.

Example:

```js
    var data = stream
        |from()...
    // Trigger critical alert if the throughput drops below 100 points per 10s and checked every 10s.
    data
        |deadman(100.0, 10s)
    //Do normal processing of data
    data...
```

The above is equivalent to this example:

```js
    var data = stream
        |from()...
    // Trigger critical alert if the throughput drops below 100 points per 10s and checked every 10s.
    data
        |stats(10s)
            .align()
        |derivative('emitted')
            .unit(10s)
            .nonNegative()
        |alert()
            .id('node \'stream0\' in task \'{{ .TaskName }}\'')
            .message('{{ .ID }} is {{ if eq .Level "OK" }}alive{{ else }}dead{{ end }}: {{ index .Fields "emitted" | printf "%0.3f" }} points/10s.')
            .crit(lambda: "emitted" <= 100.0)
    //Do normal processing of data
    data...
```

The `id` and `message` alert properties can be configured globally via the ‘deadman’ configuration section.

Since the [AlertNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/alert_node/) is the last piece it can be further modified as usual. Example:

```js
    var data = stream
        |from()...
    // Trigger critical alert if the throughput drops below 100 points per 10s and checked every 10s.
    data
        |deadman(100.0, 10s)
            .slack()
            .channel('#dead_tasks')
    //Do normal processing of data
    data...
```

You can specify additional lambda expressions to further constrain when the deadman’s switch is triggered. Example:

```js
    var data = stream
        |from()...
    // Trigger critical alert if the throughput drops below 100 points per 10s and checked every 10s.
    // Only trigger the alert if the time of day is between 8am-5pm.
    data
        |deadman(100.0, 10s, lambda: hour("time") >= 8 AND hour("time") <= 17)
    //Do normal processing of data
    data...
from|deadman(threshold float64, interval time.Duration, expr ...ast.LambdaNode)
```

Returns: [AlertNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/alert_node/)



### [Default](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#default)

Create a node that can set defaults for missing tags or fields.

```js
from|default()
```

Returns: [DefaultNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/default_node/)



### [Delete](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#delete)

Create a node that can delete tags or fields.

```js
from|delete()
```

Returns: [DeleteNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/delete_node/)



### [Derivative](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#derivative)

Create a new node that computes the derivative of adjacent points.

```js
from|derivative(field string)
```

Returns: [DerivativeNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/derivative_node/)



### [Difference](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#difference)

Compute the difference between points independent of elapsed time.

```js
from|difference(field string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [Distinct](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#distinct)

Produce batch of only the distinct points.

```js
from|distinct(field string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [Ec2Autoscale](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#ec2autoscale)

Create a node that can trigger autoscale events for a ec2 autoscalegroup.

```js
from|ec2Autoscale()
```

Returns: [Ec2AutoscaleNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/ec2_autoscale_node/)



### [Elapsed](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#elapsed)

Compute the elapsed time between points.

```js
from|elapsed(field string, unit time.Duration)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [Eval](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#eval)

Create an eval node that will evaluate the given transformation function to each data point. A list of expressions may be provided and will be evaluated in the order they are given. The results are available to later expressions.

```js
from|eval(expressions ...ast.LambdaNode)
```

Returns: [EvalNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/eval_node/)



### [First](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#first)

Select the first point.

```js
from|first(field string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [Flatten](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#flatten)

Flatten points with similar times into a single point.

```js
from|flatten()
```

Returns: [FlattenNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/flatten_node/)



### [From](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#from)

Creates a new stream node that can be further filtered using the Database, RetentionPolicy, Measurement and Where properties. From can be called multiple times to create multiple independent forks of the data stream.

Example:

```js
    // Select the 'cpu' measurement from just the database 'mydb'
    // and retention policy 'myrp'.
    var cpu = stream
        |from()
            .database('mydb')
            .retentionPolicy('myrp')
            .measurement('cpu')
    // Select the 'load' measurement from any database and retention policy.
    var load = stream
        |from()
            .measurement('load')
    // Join cpu and load streams and do further processing.
    cpu
        |join(load)
            .as('cpu', 'load')
        ...
from|from()
```

Returns: [FromNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/)



### [HoltWinters](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#holtwinters)

Compute the Holt-Winters (https://docs.influxdata.com/influxdb/latest/query_language/functions/#holt-winters) forecast of a data set.

```js
from|holtWinters(field string, h int64, m int64, interval time.Duration)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [HoltWintersWithFit](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#holtwinterswithfit)

Compute the Holt-Winters (https://docs.influxdata.com/influxdb/latest/query_language/functions/#holt-winters) forecast of a data set. This method also outputs all the points used to fit the data in addition to the forecasted data.

```js
from|holtWintersWithFit(field string, h int64, m int64, interval time.Duration)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [HttpOut](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#httpout)

Create an HTTP output node that caches the most recent data it has received. The cached data is available at the given endpoint. The endpoint is the relative path from the API endpoint of the running task. For example, if the task endpoint is at `/kapacitor/v1/tasks/<task_id>` and endpoint is `top10`, then the data can be requested from `/kapacitor/v1/tasks/<task_id>/top10`.

```js
from|httpOut(endpoint string)
```

Returns: [HTTPOutNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/http_out_node/)



### [HttpPost](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#httppost)

Creates an HTTP Post node that POSTS received data to the provided HTTP endpoint. HttpPost expects 0 or 1 arguments. If 0 arguments are provided, you must specify an endpoint property method.

```js
from|httpPost(url ...string)
```

Returns: [HTTPPostNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/http_post_node/)



### [InfluxDBOut](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#influxdbout)

Create an influxdb output node that will store the incoming data into InfluxDB.

```js
from|influxDBOut()
```

Returns: [InfluxDBOutNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_d_b_out_node/)



### [Join](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#join)

Join this node with other nodes. The data is joined on timestamp.

```js
from|join(others ...Node)
```

Returns: [JoinNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/join_node/)



### [K8sAutoscale](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#k8sautoscale)

Create a node that can trigger autoscale events for a kubernetes cluster.

```js
from|k8sAutoscale()
```

Returns: [K8sAutoscaleNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/k8s_autoscale_node/)



### [KapacitorLoopback](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#kapacitorloopback)

Create an kapacitor loopback node that will send data back into Kapacitor as a stream.

```js
from|kapacitorLoopback()
```

Returns: [KapacitorLoopbackNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/kapacitor_loopback_node/)



### [Last](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#last)

Select the last point.

```js
from|last(field string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [Log](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#log)

Create a node that logs all data it receives.

```js
from|log()
```

Returns: [LogNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/log_node/)



### [Max](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#max)

Select the maximum point.

```js
from|max(field string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [Mean](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#mean)

Compute the mean of the data.

```js
from|mean(field string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [Median](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#median)

Compute the median of the data.

> **Note:** This method is not a selector. If you want the median point, use `.percentile(field, 50.0)`.

```js
from|median(field string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [Min](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#min)

Select the minimum point.

```js
from|min(field string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [Mode](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#mode)

Compute the mode of the data.

```js
from|mode(field string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [MovingAverage](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#movingaverage)

Compute a moving average of the last window points. No points are emitted until the window is full.

```js
from|movingAverage(field string, window int64)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [Percentile](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#percentile)

Select a point at the given percentile. This is a selector function, no interpolation between points is performed.

```js
from|percentile(field string, percentile float64)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [Sample](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#sample)

Create a new node that samples the incoming points or batches.

One point will be emitted every count or duration specified.

```js
from|sample(rate interface{})
```

Returns: [SampleNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/sample_node/)



### [Shift](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#shift)

Create a new node that shifts the incoming points or batches in time.

```js
from|shift(shift time.Duration)
```

Returns: [ShiftNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/shift_node/)



### [Sideload](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#sideload)

Create a node that can load data from external sources.

```js
from|sideload()
```

Returns: [SideloadNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/sideload_node/)



### [Spread](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#spread)

Compute the difference between `min` and `max` points.

```js
from|spread(field string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [StateCount](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#statecount)

Create a node that tracks number of consecutive points in a given state.

```js
from|stateCount(expression ast.LambdaNode)
```

Returns: [StateCountNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/state_count_node/)



### [StateDuration](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#stateduration)

Create a node that tracks duration in a given state.

```js
from|stateDuration(expression ast.LambdaNode)
```

Returns: [StateDurationNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/state_duration_node/)



### [Stats](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#stats)

Create a new stream of data that contains the internal statistics of the node. The interval represents how often to emit the statistics based on real time. This means the interval time is independent of the times of the data points the source node is receiving.

```js
from|stats(interval time.Duration)
```

Returns: [StatsNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/stats_node/)



### [Stddev](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#stddev)

Compute the standard deviation.

```js
from|stddev(field string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [Sum](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#sum)

Compute the sum of all values.

```js
from|sum(field string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [SwarmAutoscale](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#swarmautoscale)

Create a node that can trigger autoscale events for a Docker swarm cluster.

```js
from|swarmAutoscale()
```

Returns: [SwarmAutoscaleNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/swarm_autoscale_node/)



### [Top](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#top)

Select the top `num` points for `field` and sort by any extra tags or fields.

```js
from|top(num int64, field string, fieldsAndTags ...string)
```

Returns: [InfluxQLNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/influx_q_l_node/)



### [Union](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#union)

Perform the union of this node and all other given nodes.

```js
from|union(node ...Node)
```

Returns: [UnionNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/union_node/)



### [Window](https://docs.influxdata.com/kapacitor/v1.5/nodes/from_node/#window)

Create a new node that windows the stream by time.

NOTE: Window can only be applied to stream edges.

```js
from|window()
```

Returns: [WindowNode](https://docs.influxdata.com/kapacitor/v1.5/nodes/window_node/)
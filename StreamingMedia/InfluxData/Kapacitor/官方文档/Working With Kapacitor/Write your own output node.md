# 贡献新的Kapacitor输出节点

如果您还没有准备好，请查看[Kapacitor贡献指南](https://github.com/influxdb/kapacitor/blob/master/CONTRIBUTING.md) ，了解有关如何开始贡献的信息。

## [目标](https://docs.influxdata.com/kapacitor/v1.5/working/custom_output/#the-goal)

将新节点添加到Kapacitor，可以将数据输出到自定义端点。对于本指南，假设我们要将数据输出到名为HouseDB的虚拟内部数据库。

## [概观](https://docs.influxdata.com/kapacitor/v1.5/working/custom_output/#overview)

Kapacitor通过`pipeline`处理数据。`pipeline`实际上一个是有向无环图（[DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph)）。基本思想是图中的每个节点代表对数据的某种形式的处理，并且每条边在节点之间传递数据。为了添加新类型的节点，需要编写两个组件：

1. 用于创建和配置节点的API（TICKscript），以及
2. 实现数据处理步骤。

在我们的示例中，数据处理步骤将数据输出到HouseDB。

该代码使用两个Go包反映了这些要求。

1. `pipeline`：此程序包定义可用的节点类型及其配置方式。
2. `kapacitor`：此程序包提供`pipeline`程序包中定义的每个节点的实现。

为了使API（即TICKscript）清晰可读，定义节点将从节点的实现中分离出来。

### [更新TICKscript](https://docs.influxdata.com/kapacitor/v1.5/working/custom_output/#updating-tickscript)

首先，我们需要更新TICKscript，以便用户可以定义我们的新节点。TICKscript应该如何将数据发送到HouseDB？要连接到HouseDB实例，我们需要一个URL和数据库名，因此我们需要一种方法来提供该信息。这个怎么样？

```js
node
    |houseDBOut()
    .url('house://housedb.example.com')
    .database('metrics')
```

为了更新TICKscript以支持这些新方法，我们需要编写一个实现该`pipeline.Node`接口的Go类型。可以在[此处](https://github.com/influxdb/kapacitor/blob/master/pipeline/node.go)找到该接口以及`pipeline.node`类型的完整实现。由于`Node`为我们完成了实现，我们只需要使用它。首先我们需要一个名字。`HouseDBOutNode`遵循命名惯例。让我们定义一个Go `struct`，它将通过组合实现该接口。在使用以下内容`pipeline`调用的目录中创建一个文件`housedb_out.go`：

```go
package pipeline

// A HouseDBOutNode will take the incoming data stream and store it in a
// HouseDB instance.
type HouseDBOutNode struct {
    // Include the generic node implementation.
    node
}
```

就像我们在Go中有一个类型实现了所需的接口。为了允许我们需要的`.url`和`.database`方法，只需在类型上定义具有相同名称的字段。第一个字母需要大写，以便导出。导出字段非常重要，因为它们将被`kapacitor`包中的节点使用。名称的其余部分应与方法名称一样需要首字母大写。TICKscript将在运行时进行匹配。更新`housedb_out.go`文件。

```go
package pipeline

// A HouseDBOutNode will take the incoming data stream and store it in a
// HouseDB instance.
type HouseDBOutNode struct {
    // Include the generic node implementation.
    node

    // URL for connecting to HouseDB
    Url string

    // Database name
    Database string
}
```

接下来，我们需要一种一致的方法来创建节点的新实例。但要做到这一点，我们需要考虑这个节点如何连接到其他节点。由于我们是输出节点，就Kapacitor而言，这是`pipeline`的终点。我们不会提供任何出边，图表在此节点上结束。我们想象中的HouseDB非常灵活，可以批量存储数据或作为单个数据点存储数据。因此，我们不关心HouseDBOutNode节点接收的数据类型。考虑到这些事实，我们可以定义一个函数来创建一个新的HouseDBOutNode。将此函数添加到`housedb_out.go`文件末尾：

```go
// Create a new HouseDBOutNode that accepts any edge type.
func newHouseDBOutNode(wants EdgeType) *HouseDBOutNode {
    return &HouseDBOutNode{
        node: node{
            desc: "housedb",
            wants: wants,
            // 如果有出边的话， NoEdge换为wants
            provides: NoEdge,
        }
    }
}
```

通过明确写明节点边`wants`和`provides`的类型，Kapacitor会做必要的类型检查，以防止无效`pipeline`。

最后，我们需要添加一个新的`chaining method`以便用户可以将HouseDBOutNodes连接到他们现有的`pipeline`。在chainnode中为结点添加 `chaining method`方法，来创建新节点并将其添加为调用节点的子节点。实际上，该方法将节点链接在一起。该`pipeline.chainnode`类型包含可用于链接节点的所有方法的集合。一旦我们将方法添加到该类型，任何其他节点现在都可以使用HouseDBOutNode链接。将此函数添加到`pipeline/node.go`文件末尾：

```go
// Create a new HouseDBOutNode as a child of the calling node.
func (c *chainnode) HouseDBOut() *HousPeDBOutNode {
    h := newHouseDBOutNode(c.Provides())
    c.linkChild(h)
    return h
}
```

我们现在已经定义了所有必需的部分，以便TICKscripts可以定义HouseDBOutNodes：

```js
    node
        |houseDBOut() // added as a method to the 'chainnode' type
            .url('house://housedb.example.com') // added as a field to the HouseDBOutNode
            .database('metrics') // added as a field to the HouseDBOutNode
```

### [实现HouseDB输出](https://docs.influxdata.com/kapacitor/v1.5/working/custom_output/#implementing-the-housedb-output)

现在TICKscript可以定义我们的新输出节点，我们需要实际提供一个实现，以便Kapacitor知道如何处理节点。`pipeline`包中的每个节点在`kapacitor`包中都有一个同名的节点。创建一个名为`housedb_out.go`的文件并将其放在repo的根目录中。将下面的内容放在文件中。

```go
package kapacitor

import (
    "github.com/influxdb/kapacitor/pipeline"
)

type HouseDBOutNode struct {
    // Include the generic node implementation
    node
    // Keep a reference to the pipeline node
    h *pipeline.HouseDBOutNode
}
```

`kapacitor`包还定义了一个名为`Node`的接口，并通过`kapacitor.node`类型提供默认实现。我们再次使用组合来实现接口。请注意，我们还有一个字段，其中包含我们刚刚完成定义的`pipeline.HouseDBOutNode`的实例。这个`pipeline.HouseDBOutNode`字段就像一个配置结构，告诉`kapacitor.HouseDBOutNode`它需要做什么工作。

现在我们有了一个结构，让我们定义一个用于创建新结构实例的函数。`kapacitor`包中的`newXXXNode`方法遵循以下约定：

```go
func newXXXNode(et *ExecutingTask, n *pipeline.NodeName) (*NodeName, error) {}
```

在我们的例子中，我们想要定义一个名为`newHouseDBOutNode`的函数。将以下方法添加到`housedb_out.go`文件中：

```go
func newHouseDBOutNode(et *ExecutingTask, n *pipeline.HouseDBOutNode, d NodeDiagnostic) (*HouseDBOutNode, error) {
    h := &HouseDBOutNode{
        // pass in necessary fields to the 'node' struct
        node: node{Node: n, et: et, diag: d},
        // Keep a reference to the pipeline.HouseDBOutNode
        h: n,
    }
    // Set the function to be called when running the node
    // more on this in a bit.
    h.node.runF = h.runOut
    return h
}
```

为了创建节点的实例，我们需要将它与`pipeline`包中的节点相关联。这可以通过`task.go`文件中`createNode`方法中的switch语句来完成：

```go
// Create a node from a given pipeline node.
func (et *ExecutingTask) createNode(p pipeline.Node, d NodeDiagnostic) (n Node, err error) {
    switch t := p.(type) {
    ...
	case *pipeline.HouseDBOutNode:
		n, err = newHouseDBOutNode(et, t, d)
    ...
}
```

现在我们已经关联了两种类型，让我们回过头来实现输出代码。请注意`newHouseDBOutNode`函数中的`h.node.runF = h.runOut`。该行设置`kapacitor.HouseDBOutNode`节点开始执行时将调用的方法。现在我们需要定义`runOut`方法。在文件中`housedb_out.go`添加此方法：

```go
func (h *HouseDBOutNode) runOut(snapshot []byte) error {
    return nil
}
```

随着这种变化，`HouseDBOutNode`语法完整，但还没有做任何事情。让我们来做点什么吧！

我们之前了解到节点通过边进行通信。有一种Go类型`edge.Edge`可以处理这种通信。我们要做的就是从边读取数据并将其发送到HouseDB。数据以`edge.Message`类型的形式表示。节点使用`edge.Consumer`读取消息，通过实现`edge.Receiver`接口来处理消息。`Consumer`和`Receiver`接口在[edge/customer.go](https://github.com/influxdb/kapacitor/blob/master/edge/consumer.go)中定义。

我们通过组合方式包含在`HouseDBOutNode`中的`node`提供了名为`ins`字段的入边列表。由于`HouseDBOutNode`只能有一个父项，我们所关注的边是第0条边（只有一条边）。我们可以使用`customer.go`中`NewConsumerWithReceiver`函数从边消费和处理消息。

```go
// NewConsumerWithReceiver creates a new consumer for the edge e and receiver r.
func NewConsumerWithReceiver(e Edge, r Receiver) Consumer {
	return &consumer{
		edge: e,
		r:    r,
	}
}
```

在`runOut`函数中使用`NewConsumerWithReceiver`函数读取和处理消息。

```go
func (h *HouseDBOutNode) runOut(snapshot []byte) error {
	consumer := edge.NewConsumerWithReceiver(
		n.ins[0],
		h,
	)
	return consumer.Consume()
}
```

剩下的就是`HouseDBOutNode`实现`Receiver`接口并编写一个带有一批点并将写入HouseDB的函数。为了方便，我们可以使用`edge.BatchBuffer`接收批处理消息。我们还可以将单点消息转换为仅包含一个点的批处理消息。

```go
func (h *HouseDBOutNode) BeginBatch(begin edge.BeginBatchMessage) (edge.Message, error) {
	return nil, h.batchBuffer.BeginBatch(begin)
}

func (h *HouseDBOutNode) BatchPoint(bp edge.BatchPointMessage) (edge.Message, error) {
	return nil, h.batchBuffer.BatchPoint(bp)
}

func (h *HouseDBOutNode) EndBatch(end edge.EndBatchMessage) (edge.Message, error) {
    msg := h.batchBuffer.BufferedBatchMessage(end)
    return msg, h.write(msg)
}

func (h *HouseDBOutNode) Point(p edge.PointMessage) (edge.Message, error) {
	batch := edge.NewBufferedBatchMessage(
		edge.NewBeginBatchMessage(
			p.Name(),
			p.Tags(),
			p.Dimensions().ByName,
			p.Time(),
			1,
		),
		[]edge.BatchPointMessage{
			edge.NewBatchPointMessage(
				p.Fields(),
				p.Tags(),
				p.Time(),
			),
		},
		edge.NewEndBatchMessage(),
	)
    return p, h.write(batch)
}

func (h *HouseDBOutNode) Barrier(b edge.BarrierMessage) (edge.Message, error) {
	return b, nil
}
func (h *HouseDBOutNode) DeleteGroup(d edge.DeleteGroupMessage) (edge.Message, error) {
	return d, nil
}
func (h *HouseDBOutNode) Done() {}

// Write a batch of data to HouseDB
func (h *HouseDBOutNode) write(batch edge.BufferedBatchMessage) error {
    // Implement writing to HouseDB here...
    return nil
}
```

一旦我们实现了`write`方法，我们就完成了。当数据到达时`HouseDBOutNode`，它将被写入指定的HouseDB实例。

### [摘要](https://docs.influxdata.com/kapacitor/v1.5/working/custom_output/#summary)

1. 首先在`pipeline`包中编写了一个节点（filepath: `pipeline/housedb_out.go`)来定义TICKscript API，以便将数据发送到HouseDB实例。
2. 然后在`kapacitor`包中编写了该节点的实现（filepath:  `housedb_out.go`)。
3. 更新`pipeline/node.go`了添加新的链接方法并`task.go`关联这两种类型。

以下是完整的文件内容：

管道/ housedb_out.go：

```go
package pipeline

// A HouseDBOutNode will take the incoming data stream and store it in a
// HouseDB instance.
type HouseDBOutNode struct {
    // Include the generic node implementation.
    node

    // URL for connecting to HouseDB
    Url string

    // Database name
    Database string
}

// Create a new HouseDBOutNode that accepts any edge type.
func newHouseDBOutNode(wants EdgeType) *HouseDBOutNode {
    return &HouseDBOutNode{
        node: node{
            desc: "housedb",
            wants: wants,
            provides: NoEdge,
        }
    }
}
```

housedb_out.go

```go
package kapacitor

import (
    "github.com/influxdb/kapacitor/pipeline"
)

type HouseDBOutNode struct {
    // Include the generic node implementation
    node
    // Keep a reference to the pipeline node
    h *pipeline.HouseDBOutNode
    // Buffer for a batch of points
    batchBuffer *edge.BatchBuffer
}

func newHouseDBOutNode(et *ExecutingTask, n *pipeline.HouseDBOutNode, d NodeDiagnostic) (*HouseDBOutNode, error) {
    h := &HouseDBOutNode{
        // pass in necessary fields to the 'node' struct
        node: node{Node: n, et: et, diag: d},
        // Keep a reference to the pipeline.HouseDBOutNode
        h: n,
        // Buffer for a batch of points
        batchBuffer: new(edge.BatchBuffer),
    }
    // Set the function to be called when running the node
    h.node.runF = h.runOut
    return h
}

func (h *HouseDBOutNode) runOut(snapshot []byte) error {
	consumer := edge.NewConsumerWithReceiver(
		n.ins[0],
		h,
	)
	return consumer.Consume()
}

func (h *HouseDBOutNode) BeginBatch(begin edge.BeginBatchMessage) (edge.Message, error) {
	return nil, h.batchBuffer.BeginBatch(begin)
}

func (h *HouseDBOutNode) BatchPoint(bp edge.BatchPointMessage) (edge.Message, error) {
	return nil, h.batchBuffer.BatchPoint(bp)
}

func (h *HouseDBOutNode) EndBatch(end edge.EndBatchMessage) (edge.Message, error) {
    msg := h.batchBuffer.BufferedBatchMessage(end)
    return msg, h.write(msg)
}

func (h *HouseDBOutNode) Point(p edge.PointMessage) (edge.Message, error) {
	batch := edge.NewBufferedBatchMessage(
		edge.NewBeginBatchMessage(
			p.Name(),
			p.Tags(),
			p.Dimensions().ByName,
			p.Time(),
			1,
		),
		[]edge.BatchPointMessage{
			edge.NewBatchPointMessage(
				p.Fields(),
				p.Tags(),
				p.Time(),
			),
		},
		edge.NewEndBatchMessage(),
	)
    return p, h.write(batch)
}

func (h *HouseDBOutNode) Barrier(b edge.BarrierMessage) (edge.Message, error) {
	return b, nil
}
func (h *HouseDBOutNode) DeleteGroup(d edge.DeleteGroupMessage) (edge.Message, error) {
	return d, nil
}
func (h *HouseDBOutNode) Done() {}

// Write a batch of data to HouseDB
func (h *HouseDBOutNode) write(batch edge.BufferedBatchMessage) error {
    // Implement writing to HouseDB here...
    return nil
}
```

pipeline / node.go（仅显示新的链接方法）：

```go
...
// Create a new HouseDBOutNode as a child of the calling node.
func (c *chainnode) HouseDBOut() *HouseDBOutNode {
    h := newHouseDBOutNode(c.Provides())
    c.linkChild(h)
    return h
}
...
```

task.go（仅显示新案例）：

```go
...
// Create a node from a given pipeline node.
func (et *ExecutingTask) createNode(p pipeline.Node, d NodeDiagnostic) (n Node, err error) {
    switch t := p.(type) {
    ...
	case *pipeline.HouseDBOutNode:
		n, err = newHouseDBOutNode(et, t, d)
    ...
}
...
```

### [为你的新节点生成文档](https://docs.influxdata.com/kapacitor/v1.5/working/custom_output/#documenting-your-new-node)

由于TICKscript是它自己的语言，我们已经构建了一个[类似于](https://godoc.org/golang.org/x/tools/cmd/godoc)[godoc](https://github.com/influxdb/kapacitor/tree/master/tick/cmd/tickdoc)的小实用程序，名为[tickdoc](https://github.com/influxdb/kapacitor/tree/master/tick/cmd/tickdoc)。 `tickdoc`从代码中的注释生成文档。该`tickdoc`工具理解两条特殊注释，以帮助它生成干净的文档。

1. `tick:ignore`：可以添加到任何字段，方法，函数或结构中。`tickdoc`将跳过它并且不为它生成任何文档。这对于忽略通过属性方法设置的字段非常有用。
2. `tick:property`：仅添加到方法中。通知`tickdoc`该方法`property method`不是a `chaining method`。

将其中一条注释单独放在一行上，`tickdoc`找到它并按行为进行操作。否则，将为您的代码生成文档，`tickdoc`并完成其余的工作。

### [贡献非输出节点。](https://docs.influxdata.com/kapacitor/v1.5/working/custom_output/#contributing-non-output-node)

编写任何节点（不仅仅是输出节点）是一个非常相似的过程，并留给读者练习。有几件事可以有所不同：

第一个区别是，如果新节点可以将数据发送到后继节点，则它将使用实现了`pipeline.Node`接口的`pipeline.chainnode`。例如：

```go
package pipeline

type MyCustomNode struct {
    // Include pipeline.chainnode so we have all the chaining methods available
    // to our new node
    chainnode

}

func newMyCustomNode(e EdgeType, n Node) *MyCustomNode {
    m := &MyCustomNode{
        chainnode: newBasicChainNode("mycustom", e, e),
    }
    n.linkChild(m)
    return m
}
```

第二个区别是可以定义一个方法来设置管道节点上的字段并返回相同的实例以创建一个`property method`。例如：

```go
package pipeline

type MyCustomNode struct {
    // Include pipeline.chainnode so we have all the chaining methods available
    // to our new node
    chainnode

    // Mark this field as ignored for docs
    // Since it is set via the Names method below
    // tick:ignore
    NameList []string `tick:"Names"`

}

func newMyCustomNode(e EdgeType, n Node) *MyCustomNode {
    m := &MyCustomNode{
        chainnode: newBasicChainNode("mycustom", e, e),
    }
    n.linkChild(m)
    return m
}

// Set the NameList field on the node via this method.
//
// Example:
//    node.names('name0', 'name1')
//
// Use the tickdoc comment 'tick:property' to mark this method
// as a 'property method'
// tick:property
func (m *MyCustomNode) Names(name ...string) *MyCustomNode {
    m.NameList = name
    return m
}
```
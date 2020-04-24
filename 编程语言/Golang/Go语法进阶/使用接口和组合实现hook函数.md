# Golang使用接口和组合实现hook函数

面向对象的高级编程语言（以Java为例）主要有四大特性：抽象、封装、继承和多态：

- 抽象是指提取出某一类事物的共性（包括特征和行为），形成**类**模型，用类的属性和方法分别表示这类事物的特征和行为。
- 封装是指把抽象出来的特征和行为保存在类的内部，只有拥有访问权限的其他类才能进行访问。
- 继承是指子类可以复用父类定义的属性和方法，可以帮助我们解决代码复用问题。
- 多态有两种形式：一种是重写（Override），是指重新编写父类中的方法，子类的方法必须和父类的方法保持方法头（方法名+参数列表）一致，且子类的访问权限大于等于父类的访问权限。另一种是重载（Overload），是指一个类可以拥有多个同名方法，具体调用哪个方法，取决于参数类型。

而Go语言不提倡继承，而使用组合来达到代码复用的效果。

## 继承和组合的优缺点

### 继承的优缺点

#### 优点

1. 简单，直观，关系在编译时静态定义；
2. 被复用的实现易于修改，派生类可以覆盖基类的实现。

#### 缺点

1. 无法在运行时变更从基类继承的实现；
2. 派生类的部分实现通常定义在基类中（派生类可以拓展基类的属性和行为）；
3. 基类的实现细节直接暴露给派生类，破坏了封装；
4. 基类的任何变更都强制子类进行变更（除非子类重写了该方法）。

### 组合的优缺点

#### 优点

1. 可以在运行时动态对象的行为；
2. 保持类的封装以专注于单一业务；
3. 只通过接口来访问对象，不会破坏封装；
4. 减少对象的依赖关系，更加灵活。

#### 缺点

1. 系统的行为将依赖于不同对象，而不是定义在单个类中，不便于管理；
2. 当需要新的行为时，需要不断定义新的对象来满足需求。

## 实现父类调用子类方法的效果

**需求介绍**

应用系统A需要对所在操作系统上文件进行定时清理/上传。

**解决方案**

任务类型包括按照文件过期时间清理，按照文件夹容量进行清理及将文件上传至服务器，对于这些任务而言，具有某些共同点：如都是定时执行的，并且支持启动、停止等操作。

通过Executable接口来将任务的共同点抽象为方法，并且由结构体Task（类）实现该接口定义任务的通用行为。每类任务也定义为一个具体的结构体（类），并且通过组合Task类来复用Task的代码，使其具有通用行为，对于各类任务的特有行为而言，如`按过期时间清理任务需要遍历文件夹筛选出满足过期条件的文件`，`按照文件夹容量清理任务需要先统计文件夹的总容量，当总容量大于警戒容量时再按照修改时间对文件列表进行排序，从过期时间最久的文件开始删除，直至文件夹容量小于安全容量`，则通过实现Executable接口定义的方法Execute来定义各自的行为。

**代码示例**

```golang
package main

import "time"

type Executable interface {
	Start()
	Execute()
}

type Task struct {
	executor Executable // 实现hook函数的效果：由子类负责编写业务代码
}

func (t *Task) Start() {
	println("Task.Start()")
	// 复用父类代码
	ticker := time.NewTicker(5 * time.Second)
	for range ticker.C {
		t.executor.Execute() // 实现hook函数的效果：由子类负责编写业务代码
	}
}

func (t *Task) Execute() {
	println("Task.Execute()")
}

type CleanTask struct {
	Task
}

func (ct *CleanTask) Execute() {
	println("CleanTask.Execute()")
}

func main () {
	cleanTask := &CleanTask{
		Task{},
	}
	cleanTask.executor = cleanTask // 实现hook函数的效果：由子类负责编写业务代码
	cleanTask.Start()
}
```

**运行结果**

```
Task.Start()
CleanTask.Execute()
CleanTask.Execute()
...
```

Java可以通过继承很容易地实现上述效果。

```java
class Task {
	
	Task() {}
	
	void start() {
    	System.out.println("Task.start()");
		execute();
	}
	
	void execute() {
    	System.out.println("Task.execute()");
	}
}

class CleanTask extends Task {
	
	CleanTask() {}
	
	void execute() {
    	System.out.println("CleanTask.execute()");
	}
}

public class Main {
    public static void main(String []args) {
		Task cleanTask = new CleanTask();
		cleanTask.start();
    }
}
```

**运行结果**

```
Task.start()
CleanTask.execute()
```




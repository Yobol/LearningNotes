# Python

## 基础语法

## 高级语法

### yield

使所在函数的返回值为一个迭代器对象。

```python
def yield_generate_iterator() {
    yield 1
    yield 2
    yield 3
    for i in range(4, 10):
    	yield i
}

if __name__ == '__main__':
    yield_iterator =  yield_generate_iterator()
    for i in yield_iterator:
        print(i, end=' ')
        
########################
#########Output#########
1 2 3 4 5 6 7 8 9
########################
```

### with

**用法**

with语句适用于对资源进行访问的场合，确保不管使用过程中是否发生异常都会执行必要的“清理”操作，释放资源。

可以替代`try...catch...finally...`语句，减少冗长，自动处理上下文环境产生的异常。

```python
# 使用try...catch...finally...完成文件读操作
try:
    file_a = open('a.txt', 'r')
    data_a = file.read()
    print(data_a)
    
    file_b = open('b.txt', 'r')
    data_b = file.read()
    print(data_b)
except IOError:
    print('Fail to open')
finally:
    file_a.close()
    file_b.close()

# 使用with完成两个文件的读操作
with open('a.txt', 'r') as file_a， open('b.txt', 'r') as file_b:
    data_a = file_a.read()
    print(data_a)
    
    data_b = file_b.read()
    print(data_b)
```

**原理**

1. 紧跟在`with`后面语句被求值后，将调用返回对象的`__enter__()`方法，该方法的返回值将被赋值给`as`后面的变量；
2. 当with中的代码块全部被执行完后，将调用前面返回对象的`__exit__()方法`。

```python
class Sample():
    
    def __enter__(self):
        print('_enter__')
        return 'foo'
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """
        :param exc_type: 错误的类型
        :param exc_val: 错误类型对应的值
        :param exc_tb: 代码中发生错误的位置
        """
        print('__exit__')
        
def get_sample():
    return Sample()

if __name__ == '__main__':
	with get_sample() as sample:
        print('Sample: %s', sample)
        
########################
__enter__
Sample: foo
__exit__
########################
```

参考：[**Python 中 with用法及原理**](https://blog.csdn.net/u012609509/article/details/72911564)

## 内置函数

### enumerate()

enumerate()函数用于将一个可遍历的数据对象（如列表/元组/字符串）组合为一个索引序列，同时列出数据和数据下标，一般用在for循环中。

Python 2.3 以上可用，2.6以上添加start参数。

#### 语法

```python
# sequence - 一个序列，迭代器或其他支持迭代的对象
# start - 下标起始地址
enumerate(sequence[, start=0])
```

#### 示例

```python
seq = ['one', 'two', 'three']
for i, element in enumerate(seq):
	print(str(i) + " " + element)

    
#########
0 one
1 two
2 three
########
```

## 附录

### Python语言规范

### Python风格规范

#### 注释

##### 类

类应该在其定义下有一个描述该类的文档字符串。如果类中有公有属性（Attributes），那么文档中应该有一个属性（Attributes）段，并且应该和函数参数保持相同的格式。

```python
class SampleClass(object):
    """Summary of class here.

    Longer class information....
    Longer class information....

    Attributes:
        likes_spam: A boolean indicating if we like SPAM or not.
        eggs: An integer count of the eggs we have laid.
    """

    def __init__(self, likes_spam=False):
        """Inits SampleClass with blah."""
        self.likes_spam = likes_spam
        self.eggs = 0

    def public_method(self):
        """Performs operation blah."""
```



#### 类

`如果一个类不继承自其它类，就显式地继承object类。嵌套类也一样。`

```python
# correct style
# case 1:
class SampleClass(object):
    pass


# case 2:
class ChildClass(ParentClass):
    """A derived class not inherited from object
    
    Explicitly inheriting from another class already, 
    this class don't need to inherit object explicitly.
    """


# case 3:
class OuterClass(object):
    
    class InnerClass(object):
        pass

    
# error style
class SampleClass:
	pass


class OuterClass:
    
	class InnerClass:
		pass
```

继承自 `object` 是为了使属性(properties)正常工作, 并且这样可以保护你的代码, 使其不受 [PEP-3000](http://www.python.org/dev/peps/pep-3000/) 的一个特殊的潜在不兼容性影响. 这样做也定义了一些特殊的方法, 这些方法实现了对象的默认语义, 包括 `__new__, __init__, __delattr__, __getattribute__, __setattr__, __hash__, __repr__, and __str__`.

#### 命名

**应该避免的名称**

1. 单字符名称, 除了计数器和迭代器；
2. 包/模块名中的连字符`-`；
3. 双下划线开头并结尾的名称（Python保留, 例如`__init__`）；

**命名约定**

1. 所谓”内部（Internal）”表示仅模块内可用，或者在类内是保护或私有的；
2. 用单下划线`_`开头表示模块变量或函数是protected的（使用from module import *时不会包含）；
3. 用双下划线`__`开头的实例变量或方法表示类内私有；
4. 将相关的类和顶级函数放在同一个模块里， 不像Java，没必要限制一个类一个模块；
5. 对类名使用大写字母开头的单词（如CapWords, 即Pascal风格），但是模块名应该用小写加下划线的方式（如lower_with_under.py）。尽管已经有很多现存的模块使用类似于CapWords.py这样的命名，但现在已经不鼓励这样做，因为如果模块名碰巧和类名一致，这会让人困扰。

**Python之父Guido推荐的规范**

| Type                       | Public             | Internal                                                     |
| -------------------------- | ------------------ | ------------------------------------------------------------ |
| Modules                    | lower_with_under   | _lower_with_under                                            |
| Packages                   | lower_with_under   |                                                              |
| Classes                    | CapWords           | _CapWords                                                    |
| Exceptions                 | CapWords           |                                                              |
| Functions                  | lower_with_under() | _lower_with_under()                                          |
| Global/Class Constants     | CAPS_WITH_UNDER    | _CAPS_WITH_UNDER                                             |
| Global/Class Variables     | lower_with_under   | _lower_with_under                                            |
| Instance Variables         | lower_with_under   | _lower_with_under (protected) or __lower_with_under (private) |
| Method Names               | lower_with_under() | _lower_with_under() (protected) or __lower_with_under() (private) |
| Function/Method Parameters | lower_with_under   |                                                              |
| Local Variables            | lower_with_under   |                                                              |

### 在Ubuntu下管理Python

#### 下载指定的版本

```shell
# 下载3.5版本
$ sudo apt-get update
$ sudo apt-get install python3.5

# 查看版本信息
$ sudo python3.5 -v

# 配置环境变量
# 1 需要根据系统update-alternatives --list python结果决定
# update-alternatives --list python显示没有可供替代的python版本，就将该数字配置为1
$ sudo update-alternatives --install /usr/bin/python python /usr/bin/python2.7 0
$ sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.5 1
```

参考：[安装Python 3.6 在Ubuntu 16.04 LTS 版本](https://blog.csdn.net/lzzyok/article/details/77413968)

#### 查看当前使用的版本

```shell
$ python -v
# 或者 python --version

# 查看当前使用的Python对应的文件目录
$ which python
```

#### 查看安装的所有版本

```shell
$ update-alternatives --list python
```

#### 切换默认使用的版本

```shell
$ sudo update-alternatives --config python
```

### pip

pip是Python包管理工具，提供的对Python包的查找，安装，更新和卸载功能。

#### 安装pip

```shell
# 下载安装脚本
$ curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py

# 运行安装脚本
# 使用哪个版本的Python运行安装脚本，pip就被关联到哪个版本
$ sudo python3 get-pip.py
```

#### 查看当前pip版本

```shell
$ pip3 --verson
```

#### 更新pip

```shell
$ pip3 install -U pip
```

#### 安装包

```shell
$ pip3 install some-package 			# 最新版本
$ pip3 install some-package==1.0.0 	# 指定版本
$ pip3 install 'some-package>=1.0.0' # 最小版本
```

#### 更新包

```shell
# 升级指定的包，通过使用>=, >, ==, <, <=来指定版本
$ pip3 install --upgrade some-package
```

#### 卸载包

```shell
$ pip3 uninstall some-package
```

#### 搜索包

```shell
$ pip3 search some-package
```

#### 查看指定包的详细信息

```shell
$ pip3 show -f some-package
```

#### 列出已安装的包

```shell
$ pip3 list
```

#### 查看可升级的包

```shell
$ pip3 list -o
```

#### 常用命令

#### 参考

1. [Python pip 安装与使用](https://www.runoob.com/w3cnote/python-pip-install-usage.html)
2. [pip documentation - installation](https://pip.pypa.io/en/stable/installing/)

### os 目录/文件操作

#### os.walk()

**介绍**

在目录树中向上或向下游走，帮助我们输出目录中的文件名。

**语法**

```python
os.walk(top[, topdown=True[, onerror=None[, followlinks=False]]])
```

**参数**

- **top** -- 是你所要遍历的目录的地址, 返回的是一个三元组(root,dirs,files)。
  - root 所指的是当前正在遍历的这个文件夹的本身的地址
  - dirs 是一个 list ，内容是该文件夹中所有的**目录的名字**(不包括子目录)
  - files 同样是 list , 内容是该文件夹中所有的**文件的名字**(不包括子目录)
- **topdown** --可选， 默认为True。当为 True时，则优先遍历 top 目录；否则优先遍历 top 的子目录。
- **onerror** -- 可选，需要一个 callable 对象，当 walk 出现异常时，会调用。
- **followlinks** -- 可选，如果为 True，则会遍历目录下的快捷方式(linux 下是软连接 symbolic link )实际所指的目录(默认关闭)，如果为 False，则优先遍历 top 的子目录。

**返回值**

要遍历目录及其下所有子目录的(root, dirs, files)元组列表。

**示例**

```python
import os


for root, dirs, files in os.walk('.', topdown=False):
    for name in dirs:
        print(os.path.join(root, name))
    for name in files:
        print(os.path.join(root, name))
```

### threading多线程

threading是Python中常用的线程模块。

> 多进/线程并发处理都能够提高任务处理效率：
>
> - IO密集型（不用CPU）：多线程；
>
> - 计算密集型（使用CPU）：多进程。

#### 线程创建&启动

```python
import threading
import time

def run(a, b):
    time.sleep(5)
    print(a + b)

# 创建线程
t = threading.Thread(target=run, args=(12,13))
# 启动线程
t.start()
```

#### 线程销毁

#### 线程间通信和同步

##### threading.Thread.setDaemon(bool)

在主线程A中，创建子线程B并调用了B.setDaemon(True)；那么表示B把主线程A设置为自己的守护线程，要是主线程A执行结束了，就不管子线程B是否完成，一并和主线程A退出。此外，还有个要特别注意的：必须在start() 方法调用之前设置，如果不设置为守护线程，主线程会被无限挂起，只有等待了所有子线程结束它才结束。

```python
t = threading.Thread(target=f, args=())
# 默认情况下，主线程会等待所有子线程全部执行完毕后再结束
t.setDaemon(True) # 主线程无需等待子线程，主线程结束则全部结束
t.start()
```

##### threading.Thread.join([timeout])

在主线程A中，创建子线程B并调用了B.join()；那么，主线程A会在调用的地方被阻塞，直到子线程B执行完毕后，才可以接着往下执行。Thread.join([timeout]) 里面的参数时可选的，代表线程运行的最大时间，即如果超过这个时间，不管这个此线程有没有执行完毕都会被回收，然后主线程或函数都会接着执行；如果线程执行时间小于参数表示的时间，则接着执行，不用一定要等待到参数表示的时间。

```python
t = threading.Thread(target=f, args=())
# 默认情况下，主线程会和所有子线程抢占CPU执行，即主线程和子线程并发执行
t.join() # 主线程会等待子线程执行完毕后再执行
t.start()
```

##### threading.Event()

```python
import threading
import time


def do(event):
    print('start')
    event.wait()  # 红灯，所有线程执行都这里都在等待
    print('end')


event_obj = threading.Event()  # 创建一个事件
for i in range(5):  # 创建5个线程
    t = threading.Thread(target=do, args=(event_obj,))
    t.start()

time.sleep(1)

data = input('是否让子线程继续执行(y/n)：')
if data == 'y':
    event_obj.set()  # 变绿灯
```

##### threading.Condition() 条件变量

Condition被称为条件变量，除了提供与Lock类似的acquire和release方法外，还提供了wait，notify和notifyAll等方法。

线程首先acquire一个条件变量，然后判断一些条件：

- 如果条件不满足则wait；
- 如果条件满足，进行一些处理改变条件后，通过notify通知其他线程，其他处于wait状态的线程接到通知后会重新判断条件，不断地重复这一过程，从而解决复杂的同步问题。

可以认为Condition对象维护了一个锁（Lock/RLock）和一个waiting池。线程通过acquire获得Condition对象，当调用wait方法时，线程会释放Condition内部的锁并进入blocked状态，同时在waiting池中记录这个线程。当调用notify方法时，Condition对象会从waiting池中挑选出一个线程，通知其调用acquire方法尝试取到锁。

Condition对象的构造函数可以接受一个Lock/RLock对象作为参数，如果没有指定，则会自行创建一个RLock。

notifyAll方法会通知waiting池中的所有线程尝试acquire锁，防止有线程永远处于阻塞状态。

```python
import threading
import time

con = threading.Condition()
counter = 0


class Producer(threading.Thread):

    def run(self):
        while True:
            global counter
            if con.acquire():
                if counter > 1000:
                    con.wait()
                else:
                    counter += 100
                    msg = threading.current_thread().name + ' produce 100, count = ' + str(counter)
                    print(msg)
                    con.notifyAll()
                con.release()
                time.sleep(1)


class Consumer(threading.Thread):

    def run(self):
        global counter
        while True:
            if con.acquire():
                if counter < 100:
                    con.wait()
                else:
                    counter -= 30
                    msg = threading.current_thread().name + ' consume 30, count = ' + str(counter)
                    print(msg)
                    con.notifyAll()
                con.release()
                time.sleep(3)


if __name__ == '__main__':
    p = Producer()
    c = Consumer()
    p.start()
    c.start()
```

#### 参考

1. [Python之threading多线程](https://www.cnblogs.com/xiaobeibei26/p/6481707.html)
2. [Python Docs - threading](https://docs.python.org/3/library/threading.html)

### subprocess执行CMD命令

```python
import subprocess

# subprocess.Popen会以当前进程为父进程开启一个子进程
# stdout=subprocess.PIPE的作用是重定向标准输出，不出现在命令行中
# stderr=subprocess.PIPE的作用是重定向错误输出，不出现在命令行中
sp = subprocess.Popen('cd /etc/hosts', shell=True, 
                      stdout=subprocess.PIPE, stderr=subprocess.PIPE)
# 阻塞当前进程，等待子线程sp运行结束
sp.wait()
```

### requests网络请求与响应

#### get请求

**用法**

```python
import requests

response = request.get(url, params, kwargs)
```

**用例：在URL中传递参数**

```python
import requests

payload = {
    'user_id': '7f955504-9331-11e9-86de-a402b97f912b',
}
url = 'http://127.0.0.1:8080/api/user'

r = requests.get(url=url, params=payload)
# 打印请求的URL
print(r.url)
```

#### post请求

**用法**

```python
import requests

# 发起post请求
response = requests.post(url, data, json, kwargs)
# 打印请求的响应码
# 请求成功返回 200
print(response.status_code)
```

**用例：在Request Body中传递Json**

> a.json

```json
{
	"name": "Yobol",
	"password": "123456"
}
```

> test_post.py

```python
import requests
import os
import json

# 发送Json数据
fd = open('./a.json','rb')
r = request.post(url='http://127.0.0.1:8080/api/user', json=json.load(fd))
```

#### delete请求

**用法**

```python
import requests

response = requests.delete(url, kwargs)
```

### unittest单元测试



#### 参考

[The Python Standard Library - unittest](https://docs.python.org/3/library/unittest.html)
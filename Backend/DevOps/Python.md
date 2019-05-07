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

### 更新pip

```shell
$ python -m pip install --upgrade pip
```

### 在Ubuntu下管理Python

#### 查看Ubuntu下Python当前使用的版本

```shell
$ python -v
# 或者 python --version

# 查看当前使用的Python对应的文件目录
$ which python
```

#### 查看Ubuntu下安装的所有Python版本

```shell
$ update-alternatives --list python
```

#### 切换Ubuntu下默认使用的Python版本

```shell
$ sudo update-alternatives --config python
```


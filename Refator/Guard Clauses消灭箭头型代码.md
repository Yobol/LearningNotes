# 消灭箭头型代码

## 问题

条件语句的多层嵌套会导致代码可读性较差，难以维护。

```java
for (;;) {
    // statement block before condition1
    if (condition1) {
        // statement block 1
    	// statement block before condition2
        if (condition2) {
        	// statement block 2
    		// statement block before condition3
            if (condition3) {
        		// statement block 3
    			// statement block before condition4
                if (condition4) {
        			// statement block 4
                }
    			// statement block after condition4
            }
            // statement block after condition3
        }
        // statement block after condition2
    }
    // statement block after condition1
}
```

## 使用Gaurd Clauses取代嵌套式条件语句

### 适用情况

- 在循环体内；
- 可以使用continue关键字；

### 主要思想

在循环体内，使用continue关键字，让代码：

- 在不满足执行条件的时候直接进入下次循环；
- 只有在满足执行条件的时候才继续执行后续代码；

### 实现效果

```Java
for (;;) {
    // statement block before condition1
    if (!condition1) {
    	// statement block after condition1
        continue;
    }
    // statement block 1
    // statement block after condition1
    
    // statement block before condition2
    if (!condition2) {
    	// statement block after condition2
        continue;
    }
    // statement block 2
    // statement block after condition2
    
    // statement block before condition3
    if (!condition3) {
    	// statement block after condition3
        continue;
    }
    // statement block 3
    // statement block after condition3
    
    // statement block before condition4
    if (!condition4) {
    	// statement block after condition4
        continue;
    }
    // statement block after condition4
    // statement block 4
}
```

如果`conditionX`中的代码改变了`statement block after conditionX`依赖的状态，那么代码就会像上面那样包含两份`statement block after conditionX`。

否则，即`statement block after conditionX`不依赖`conditionX`的话，我们就可以只保留一份`statement block after conditionX`，代码如下：

```java
for (;;) {
    // statement block before condition1
    // statement block after condition1
    
    if (!condition1) break;
    // statement block 1
    // statement block after condition2
    // statement block before condition2
    
    if (!condition2) break;
    // statement block 2
    // statement block after condition3
    // statement block before condition3
    
    if (!condition3) break;
    // statement block 3
    // statement block after condition4
    // statement block before condition4
    
    if (!condition4) break;
    // statement block 4
}
```

所有的if语句都在判断是否出错的情况，所以在维护代码的时候，你可以完全不理会这些if语句。而剩下的代码都是正常的功能代码，让你的关注点可以集中在这些代码上，更容易阅读和维护。

## 拆分封装成函数

### 适用情况

- 不在循环体内；
- 不可以使用continue关键字；

### 主要思想

将具有一定语义层数的嵌套语句封装成函数，使用return关键字，让代码：

- 在不满足执行条件的时候直接退出当前函数；
- 只有在满足执行条件的时候才继续执行后续代码；

### 实现效果

```java
for (;;) {
    fun1()
}

void fun() {
    // statement block before condition1
    if (!condition1) {
    	// statement block after condition1
        break;
    }
    // statement block 1
    // statement block after condition1
    
    // statement block before condition2
    if (!condition2) {
    	// statement block after condition2
        break;
    }
    // statement block 2
    // statement block after condition2
    
    // statement block before condition3
    if (!condition3) {
    	// statement block after condition3
        break;
    }
    // statement block 3
    // statement block after condition3
    
    // statement block before condition4
    if (!condition4) {
    	// statement block after condition4
        break;
    }
    // statement block 4
    // statement block after condition4
}
```

如果`conditionX`中的代码改变了`statement block after conditionX`依赖的状态，那么代码就会像上面那样包含两份`statement block after conditionX`。

否则，即`statement block after conditionX`不依赖`conditionX`的话，我们就可以只保留一份`statement block after conditionX`，代码如下：

```java
for (;;) {
    fun1()
}

void fun() {
    // statement block before condition1
    // statement block after condition1
    
    if (!condition1) break;
    // statement block 1
    // statement block after condition2
    // statement block before condition2
    
    if (!condition2) break;
    // statement block 2
    // statement block after condition3
    // statement block before condition3
    
    if (!condition3) break;
    // statement block 3
    // statement block after condition4
    // statement block before condition4
    
    if (!condition4) break;
    // statement block 4
}
```

可以继续将上面的代码重构如下：

```java
for (;;) {
    boolean con  = fun1();
    if (con) con = fun2();
    if (con) con = fun3();
    if (con) con = fun4();
    if (con) {
    	// statement block 4
    }
}

void fun1() {
    // statement block before condition1
    // statement block after condition1
    return condition1;
}

void fun2() {
    // stement block 1
    // statement block after condition2
    // statement block before condition2
    return condition2;
}

void fun3() {
    // stement block 2
    // statement block after condition3
    // statement block before condition3
    return condition3;
}

void fun4() {
    // stement block 3
    // statement block after condition4
    // statement block before condition4
    return condition4;
}
```



函数可以屏蔽实现细节，封装或抽象相关代码逻辑，让代码阅读和维护者更加关注于业务，同时也更利于阅读和维护代码。

## 参考

1. [如何重构“箭头型”代码](https://coolshell.cn/articles/17757.html)
2. [Replace Nested Conditional with Guard Clauses - Martin Fowler](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html)
3. [Flattening Arrow Code](https://blog.codinghorror.com/flattening-arrow-code/)


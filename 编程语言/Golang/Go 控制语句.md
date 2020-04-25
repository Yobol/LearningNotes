# Go 控制语句

控制语句用来实现对程序流程的选择、循环、转向和返回等进行控制。

## 条件语句

### if 语句

```go
// if 语句
if condition1 {
    
} else if condition2 {
    
} else {
    
}
```

### switch语句

```go
switch condition {
	case case1:
    	// case1 operation
	case case2:
    	// case2 operation
    default:
    	// default operation
}
```

`注：Golang中switch语句的每个case自带break效果。`

## 循环语句

### for 循环

#### 基本循环

```go
var str string = "Hello, Golang!"
for i := 0; i < len(str); i++ {
    
}
```

#### 死循环

```Go
for true {
    
}

// 或者使用如下的简写形式
for {
    
}
```

#### 集合遍历

```go
// for range 循环
// 关键字 range 可以用于迭代数组、字符串、切片、映射 map 和通道

// 使用 for range 迭代字符串时，每次迭代会返回两个值：
// 第一个值是 char 在 string 中的索引位置;
// 第二个值是 char 的 一个副本。
// 因为中文由三个字符组成，而英文仅由一个字符表示，所以使用传统遍历方式遍历含有中文的字符串很容易会出现乱码的情况
str := "你好, Golang!"
for index, ch := range str {
    fmt.Printf("index = %v, value = %c", index, char)
}
// index = 0, value = 你
// index = 3, value = 好
// index = 6, value = ,
// index = 7, value =  
// index = 8, value = G
// ...


// 使用 for range 迭代切片时，每次迭代会返回两个值：
// 第一个值是 element 在 elements 中的索引位置;
// 第二个值是 element 的 一个副本。
elements := []int{1, 2, 3, 4, 5}
for index, element := range elements {
    
}

// 使用 for range 迭代 map 时，每次迭代会返回两个值：
// 第一个值是 element 的 key；
// 第二个值是 element 的 value。
elements := make(map[string]string, 0)
for key, value := range elements {
    
}
```
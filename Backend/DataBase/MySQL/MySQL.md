# MySQL

## MySQL基本操作

### MySQL-数据库连接

使用mysql命令启动数据库客户端程序，连接数据库服务器（必须是运行态，默认是端口号3306）。

#### 基本命令

`mysql -h <Server Ip> -u <user> -p<password>`

### MySQL-数据库列表

查看数据库服务器端有哪些数据库。

#### 基本命令

`show database;`

### MySQL-创建数据库

#### 基本命令

`create database <Database Name>;`

### MySQL-删除数据库

#### 基本命令

`drop database <Database Name>;`

### MySQL-数据库选择

#### 基本命令

`use <Database Name>;`

### MySQL-表列表

查看当前选择的数据库中有哪些数据表。

#### 基本命令

`show tables;`

### MySQL-创建数据表

#### 基本命令

```mysql
create table table_name (
	i int
) engine = MyISAM;
```

### MySQL-查看表结构

#### 基本命令

```mysql
show create table table_name engine=InnoDB\G;
```

### MySQL-增

#### 基本命令

#### 底层原理

1.  MySQL中插入一条数据底层做了什么？

   **存储引擎**将事务写进**日志缓冲**（log buffer），再由**日志缓冲**把事务刷新到**事务日志**中，然后**引擎**再将事务写进**缓冲池**。以上步骤执行完毕整个事务就算提交完毕了。

### MySQL-删

#### 基本命令

### MySQL-改

#### 基本命令

### MySQL-查

#### 基本命令

## MySQL索引

### MySQL索引的数据结构

MySQL索引的数据结构是树。默认的InnoDB引擎采用的数据结构是B+树。
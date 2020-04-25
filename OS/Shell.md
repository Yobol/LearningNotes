# Shell

## 变量说明

```shell
# Shell本身的PID
$$

# Shell最后运行的后台Process的PID
$!

# Shell最后运行的命令的结束代码（返回值）
$?

# 使用Set命令设定的Flag一览
$-

# $*和$@都表示传递给函数或者脚本的所有参数
# 当二者不被""包围时，没有任何区别，都是将接受到的每个参数看作是一份数据，以空格分隔
# 当二者被""包围时：
# "$*"将所有的参数从整体上看作一份数据，而不是把每个参数都看作是一份数据；
# "$@"仍然将每个参数都看作是独立的数据。
$* | $@

# 传递给函数或者脚本的参数个数
$#

# Shell本身的文件名
$0

# 传递给函数或者脚本的各参数值
$1~$n
```

## echo命令

```shell
uname=Yobol

# 结果重定向
echo "Hello, $uname!" > log # 将 Hello,Yobol! 写入log文件中

# 原样输出字符串，不进行转义或取变量
echo '$uname \n' # $uname \n
# 显示命令执行结果
echo `date` # Fri Apr 19 10:07:34 CST 2019
```

## vim命令

```shell
vim <file-name>
```

> file-name

```
:/<query-string>    # 定位到 query-string 所在的位置
```

## 进程

### 关闭进程

```shell
$ kill -9 PID
```

## 网络

## 文件操作

### inode

Linux会将硬盘拆分成两个区域。一个是数据区，存放文件本身；另一个是索引区（`inode table`），存放文件的索引信息。

文件元信息存储在`inode`中，因此inode也称为索引节点。可以通过`sudo dumpe2fs -h <file-system> | grep "Inode size"`查看当前操作系统中每个`inode`节点自身占用的空间 。一个`inode`节点通常占用128或256个字节。

```shell
$ sudo dumpe2fs -h /dev/sda1 | grep "Inode size"
dumpe2fs 1.44.1 (24-Mar-2018)
Inode size:	          256
```

每个`inode`都有一个编号，操作系统内部使用`inode`编号来识别文件，文件名只是为了让用户方便告知文件的存在。当用户通过文件名查看文件时，操作系统内部通常执行如下三步：

1. 找到文件名对应的`inode`编号；
2. 通过`inode`编号获取到`inode`详细信息；
3. 根据`inode`信息定位到文件所在的文件块，读出数据。

`可以使用 ls -i 查看文件对应的inode编号。`

`可以使用 stat <file-name> 查看指定文件的inode信息。`

`Q：当文件很大时，会占用多个inode吗? A：一个文件只会对应一个inode，inode中有一个字段指向存储文件数据的块的数组。`

### `df`工具查看磁盘空间

#### 用例

```shell
# 显示每个文件所在文件系统的信息
# 默认情况（不带任何参数，只输入df）下显示所有文件系统信息
$ df [OPTION]... [FILE]...
```

#### 选项

| 短选项形式 |      长选项形式       | 说明                                                         |
| :--------: | :-------------------: | ------------------------------------------------------------ |
|     -a     |         --all         | 显示所有文件系统，包括虚拟的（pseudo），重复的，不可访问的文件系统。 |
|     -B     |   --block-size=SIZE   | 默认情况下`nX-blocks `/`Used`/`Available`以1KB为单位，可以使用`-B2M`或`--block-size=2M`将显示单位从`1KB`转换为`2MB`，支持`KB/MB/GB/TB/PB/EB/ZB/YB`等存储单位。<br/>数字默认为1，可省略；<br/>可以省略`KB/MB/GB/TB/PB/EB/ZB/YB`中的`B`。 |
|     -h     |   --human-readable    | 以`K/M/G/T/P/E/Z/Y`的形式呈现数据，而不像默认那样以`KB`为单位。<br/>以1024为进制。 |
|     -H     |         --si          | 以`K/M/G/T/P/E/Z/Y`的形式呈现数据，而不像默认那样以`KB`为单位。<br/>以1000为进制。 |
|     -i     |       --inodes        | 列出文件索引信息（inode）而不是块使用情况。                  |
|     -k     |                       | 等价于`--block-size=1K。`                                    |
|     -l     |        --local        | 列出本地文件系统的块使用情况（？？和默认情况显示内容一样）。 |
|            |       --no-sync       | 在获取磁盘使用情况之前不调用`sync`（默认）。                 |
|            | --output[=FIELD_LIST] | 可使用`FILED_LIST`定义呈现的字段，如果忽略`=FILED_LIST`，则显示所有字段。<br/>字段名皆小写：`--output=iuse,ifree`。 |
|     -P     |     --portability     | 使用POSIX输出格式。                                          |
|            |        --sync         | 造获取磁盘使用情况之前调用`sync`。                           |
|            |        --total        | 排除所有与可用空间无关紧要的条目，并添加总计行。             |
|     -t     |      --type=TYPE      | 列出指定格式的文件系统，如`-text4`只显示`ext4`格式的文件系统。 |
|     -T     |     --print-type      | 在显示结果中添加`Type`列，输出文件系统的格式，如`ext4`。     |
|     -x     |  --exclude-type=TYPE  | 在显示结果中剔除指定格式的文件系统。                         |
|     -v     |                       | ？？？                                                       |
|            |        --help         | 显示`df`工具的帮助文档。                                     |
|            |       --version       | 显示`df`工具的版本信息。                                     |

#### 示例

```shell
# 不带任何参数，展示所有有效的（下略）文件系统的信息
$ df
Filesystem     1K-blocks     Used Available Use% Mounted on
udev             4038876        0   4038876   0% /dev
tmpfs             812492     2960    809532   1% /run
/dev/sda1       65791532 43851304  18568504  71% /

# 以可读性更好的方式呈现数据
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            3.9G     0  3.9G   0% /dev
tmpfs           794M  2.9M  791M   1% /run
/dev/sda1        63G   42G   18G  71% /

# 展示所有文件系统的索引信息
# 解读：/dev/sda1文件系统下最多可创建4194304个inode，当前已经创建823720个。
# 当IUsed == Inodes时，即使文件没有占满内存，也会提示磁盘空间不足的错误（可使用软连接解决）
$ df -i
Filesystem      Inodes  IUsed   IFree IUse% Mounted on
udev           1009719    491 1009228    1% /dev
tmpfs          1015612   1214 1014398    1% /run
/dev/sda1      4194304 823720 3370584   20% /
```

`du`工具计算文件夹实际占用空间

### 技能实操

#### 创建一个空文件实际需要多大的磁盘空间？

```shell
# 首先查看创建空文件前系统使用了多少inode
$ df -i .
Filesystem      Inodes  IUsed   IFree IUse% Mounted on
/dev/sda1      4194304 818107 3376197   20% /


$ touch a.txt
$ ll
total 0
-rw-r--r-- 1 yobol yobol  0 4月  17 18:01 a.txt

# 在创建完成后再次查看系统使用了多少inode
# 可以看到当前文件系统的IUsed字段较之前增加了1，可以得知一个空文件会占用一个inode
Filesystem      Inodes  IUsed   IFree IUse% Mounted on
/dev/sda1      4194304 818108 3376196   20% /
```

> 一个空文件会占用一个inode

那么一个`inode`占用多大的空间呢？可以使用如下命令查看当前机器上指定文件系统中inode的大小。

```shell
# 查看 指定ext4文件系统 /dev/sda1中 inode 的大小
$ sudo dumpe2fs /dev/sda1 | grep "Inode size"
dumpe2fs 1.44.1 (24-Mar-2018)
Inode size:	          256
```

可以通过查看[Linux文件系统源码](https://github.com/torvalds/linux/blob/master/fs)查看各类文件系统中`inode`存储了哪些信息，以[`ext4`](https://github.com/torvalds/linux/blob/master/fs/ext4/ext4.h)文件系统格式为例：

```c
struct ext4_inode {
	__le16	i_mode;		/* File mode */
	__le16	i_uid;		/* Low 16 bits of Owner Uid */
	__le32	i_size_lo;	/* Size in bytes */
	__le32	i_atime;	/* Access time */
	__le32	i_ctime;	/* Inode Change time */
	__le32	i_mtime;	/* Modification time */
	__le32	i_dtime;	/* Deletion Time */
	__le16	i_gid;		/* Low 16 bits of Group Id */
	__le16	i_links_count;	/* Links count */
	__le32	i_blocks_lo;	/* Blocks count */
	...
	__le32	i_block[EXT4_N_BLOCKS];/* Pointers to blocks */
    ...
};
```

可以看到文件的访问权限/所有者ID/所属组ID/占用空间/创建时间等信息都存储在`inode`中，但是文件名并没有被包含在`inode`中。那么文件名是由什么数据结构维护的呢？可以在`inode`定义的同文件中找到`ext4_dir_entry`结构体：

```c
#define EXT4_NAME_LEN 255

struct ext4_dir_entry {
	__le32	inode;			/* Inode number */
	__le16	rec_len;		/* Directory entry length */
	__le16	name_len;		/* Name length */
	char	name[EXT4_NAME_LEN];	/* File name */
};
```

**这些信息会和文件一同保存在所属文件夹的block块中（可以在文件夹下创建多个空文件证明）。**

**综上所述，新建一个空文件：**

1. 需要消耗一个`inode`，每个`inode`通常占用128B或256B，用来保存文件的访问权限/所有者ID/所属组ID/占用空间/创建时间等信息；
2. `inode`中并不包含文件名，因此还需要额外的空间来保存inode和文件名之间的映射关系。

#### 创建一个空文件夹实际需要多大的磁盘空间

1. 新建一个文件夹同样需要消耗一个`inode`；
2. 并且使用`ll`查看文件列表时，会发现文件夹的大小显示为`4.0k`（由文件系统格式决定，ext4格式中每个block大小为4k）。这是因为每个目录会默认带两个目录项`.`和`..`，因此会默认占用`4k`的空间。
### 一、JavaSE部分 

#### **❤2、基础**

 	2、介绍一下volatile？

​	4、什么时候用assert？

 	6、wait方法底层原理？

 	12、讲讲什么是泛型？

 	13、解释 extends 和 super 泛型限定符-上界不存下界不取。

 	18、Comparable和Comparator接口是干什么的？列出它们的区别。

 	32、请问Query接口的list方法和iterate方法有什么区别？

 

#### **❤4、集合**

 	14、什么是迭代器？Iterator和ListIterator的区别是什么？

 	16、快速失败(fail-fast)和安全失败(fail-safe)的区别是什么？

 	19、ArrayList,Vector,LinkedList的存储性能和特性是什么？



#### **❤5、线程**

 	4、介绍一下生产者消费者模式？ 

 	7、讲一下AQS吧。 

 	12、CyclicBarrier和CountDownLatch的区别？

 	13、如何理解Java多线程回调方法？

 	18、在监视器(Monitor)内部，是如何做线程同步的？程序应该做哪种级别的同步？  

 	20、同步和异步有何异同，在什么情况下分别使用他们？举例说明。 

 	21、设计4个线程，其中两个线程每次对j增加1，另外两个线程对j每次减少1。使用内部类实现线程，对j增减的时候没有考虑顺序问题。 

 	25、stop()和suspend()方法为何不推荐使用？ 

 	28、请说出与线程同步以及线程调度相关的方法。



#### **❤6、锁** 

​	1、讲一下非公平锁和公平锁在ReetrantLock里的实现。 

 	2、讲一下synchronized，可重入怎么实现。

 	5、如何确保N个线程可以访问N个资源同时又不导致死锁？ 

 	7、Java中的 LongAdder 和 AtomicLong 的区别？https://blog.csdn.net/yao123long/article/details/63683991

​	

**😀9、JVM**

 	2、类加载过程。

 	8、JVM内存模型是什么？ 

 	9、JVM是如何实现线程的？

 	12、描述一下JVM加载class文件的原理机制? 

 	

#### **❤10、GC**   

 	1、Java中内存泄露是啥，什么时候出现内存泄露？

 	2、minor gc如果运行的很频繁，可能是什么原因引起的，minor gc如果运行的很慢，可能是什么原因引起的? ​	



#### **❤11、IO和NIO、AIO**  

 	1、怎么打印日志？

 	6、Java中有几种类型的流？JDK为每种类型的流提供了一些抽象类以供继承，请说出他们分别是哪些类？

 	7、什么是Java序列化，如何实现Java序列化？



### 二、JavaEE部分 

#### **❤1、Spring**  	

 	1、说一下IoC和AOP? 

 	2、介绍一下bean的生命周期 

 	3、谈谈Spring中自动装配的方式有哪些？Spring注解@Autowired 和@Resource区别？ 

 	4、@Controller和@RestController的区别？

 	5、依赖注入的方式有几种，哪几种？

 	6、SpringIoC原理？自己实现IoC要怎么做，哪些步骤？

 	7、Spring中BeanFactory和ApplicationContext的区别？

 	8、什么是IoC和DI？DI是如何实现的？

 	9、请问Spring中Bean的作用域有哪些？

 	13、你如何理解AOP中的连接点（Joinpoint）、切点（Pointcut）、增强（Advice）、引介（Introduction）、织入（Weaving）、切面（Aspect）这些概念？

 	14、Spring支持的事务管理类型有哪些？你在项目中使用哪种方式？

 	15、介绍一下Spring？Spring框架的优点？

 	16、AOP的原理是什么？AOP的应用场景？Struts拦截器和Spring AOP区别？

 	18、选择使用Spring框架的原因（Spring框架为企业级开发带来的好处有哪些）？

 	19、持久层设计要考虑的问题有哪些？你用过的持久层框架有哪些？



#### **❤4、Mybatis**  	

 	1、解释一下MyBatis中命名空间（namespace）的作用。

 	2、MyBatis中的动态SQL是什么意思？

 	

#### **❤5、MVC**  	

 	1、Spring MVC注解的优点？

 	2、Spring MVC和Spring Boot区别？

 	3、SpringMVC的运行机制，运行机制的每一部分的相关知识？

 	

#### **❤6、各框架对比与项目优化**  	

 	1、Mybatis和Hibernate区别？

 	2、介绍一下你了解的Java领域的Web Service框架。

 	

#### **❤7、JPA**  	

 	1、EJB是基于哪些技术实现的？并说出SessionBean和EntityBean的区别，StatefulBean和StatelessBean的区别。 

 	2、EJB与JAVA BEAN的区别？ 

 	3、EJB包括（SessionBean,EntityBean）说出他们的生命周期，及如何管理事务的？ 

 	4、EJB的角色和三个对象是什么？ 

 	5、说说EJB规范规定EJB中禁止的操作有哪些？ 

 	6、EJB的激活机制是什么？ 

 	7、EJB的几种类型分别是什么 

 	8、EJB需直接实现它的业务接口或Home接口吗，请简述理由。 

 	

### 三、Java  web编程

#### **❤1、web编程基础**  	

 	1、启动项目时如何实现不在链接里输入项目名就能启动? 

 	2、1分钟之内只能处理1000个请求，你怎么实现，手撕代码? 

 	4、JAVA应用服务器有那些？ 

 	5、JSP的内置对象及方法。 

 	6、JSP和Servlet有哪些相同点和不同点，他们之间的联系是什么？（JSP） 

 	7、说一说四种会话跟踪技术 

 	8、讲讲Request对象的主要方法 

 	9、说说weblogic中一个Domain的缺省目录结构?比如要将一个简单的helloWorld.jsp放入何目录下,然后在浏览器上就可打入主机？ 

 	10、JSP有哪些动作?作用分别是什么? 

 	11、请谈谈JSP有哪些内置对象？作用分别是什么？ 

 	12、说一下表达式语言（EL）的隐式对象及其作用 

 	13、JSP中的静态包含和动态包含有什么区别？ 

 	14、过滤器有哪些作用和用法？ 

 	15、请谈谈你对Javaweb开发中的监听器的理解？ 

 	16、说说web.xml文件中可以配置哪些内容？ 

 	

#### **❤2、Web编程进阶**

 	2、Servlet生命周期，是否单例，为什么是单例。

 	3、说出Servlet的生命周期，并说出Servlet和CGI的区别。

 	4、Servlet执行时一般实现哪几个方法？

 	5、阐述一下阐述Servlet和CGI的区别？

 	6、说说Servlet接口中有哪些方法？

 	7、Servlet 3中的异步处理指的是什么？

 	8、如何在基于Java的Web项目中实现文件上传和下载？

 	9、服务器收到用户提交的表单数据，到底是调用Servlet的doGet()还是doPost()方法？

 	10、Servlet中如何获取用户提交的查询参数或表单数据？

 	11、Servlet中如何获取用户配置的初始化参数以及服务器上下文参数？

 	12、讲一下Redis 的主从复制怎么做的？

 	13、Redis 为什么读写速率快性能好？

 	14、Redis 为什么是单线程？

 	15、缓存的优点？

 	16、aof，rdb，优点，区别？

 	17、Redis 的 List 能用做什么场景？

 	18、说说MVC的各个部分都有那些技术来实现?如何实现？

 	19、什么是DAO模式？

 	20、请问Java Web开发的Model 1和Model 2分别指的是什么？ 

 	21、你的项目中使用过哪些JSTL标签？ 

 	22、使用标签库有什么好处？如何自定义JSP标签？（JSP标签） 

 	

#### **❤3、Web编程原理**  	

 	1、Get和Post区别？ 

 	2、请谈谈转发和重定向的区别，redirect的状态码是多少？ 

 	4、Cookie 和Session 的区别？

 	6、BS与CS的联系与区别。

 	7、如何设置请求的编码以及响应内容的类型？

 	8、什么是Web Service（Web服务）？

 	9、谈谈Session的save()、update()、merge()、lock()、saveOrUpdate()和persist()方法分别是做什么的？有什么区别？ 

 	

### 四、JDBC编程 

#### **❤1、SQL基础**

  	1、写SQL：找出每个城市的最新一条记录。

 	2、一个学生表，一个课程成绩表，怎么找出学生课程的最高分数？

 	3、有一组合索引（A,B,C），会出现哪几种查询方式？

 	

#### **❤2、JDBC基础**  

​	1、数据库水平切分，垂直切分？

 	2、数据库索引介绍一下。介绍一下什么时候用Innodb，什么时候用MyISAM。

 	4、索引了解嘛，底层怎么实现的，什么时候会失效。

 	6、数据库乐观锁和悲观锁。

 	7、数据库的三范式？

 	9、MySQL主从复制？

 	11、数据库优化方法。

 	12、谈一下你对继承映射的理解。

 	13、说出数据连接池的工作机制是什么？

 	15、JDBC中如何进行事务处理？

 	

#### **❤3、JDBC进阶**  

 	2、Jdo是什么? 

 	3、Statement和PreparedStatement有什么区别？哪个性能更好？

 	4、使用JDBC操作数据库时，如何提升读取数据的性能？如何提升更新数据的性能？

 	

### 六、计算机网络

#### **❤2、应用层**

 	1、DNS寻址过程。

 	2、负载均衡反向代理模式优点及缺点。

​	6、讲一下浏览器从接收到一个URL到最后展示出页面，经历了哪些过程。

 	9、http1.1和1.0的区别。

 	10、说说SSL四次握手的过程。

 	

#### **❤3、网络层**  

 	1、ARP协议，ARP攻击 

 	2、ICMP协议 

 	3、讲一下路由器和交换机的区别？ 

 	

### 七、操作系统 

#### **❤1、操作系统概论**  

 	1、CentOS 和 Linux的关系？ 

 	2、64位和32位的区别？ 

 	

#### **❤2、进程的描述与控制**  	

 	1、怎么杀死进程？ 

 	3、系统线程数量上限是多少？ 

 	4、进程和线程的区别是什么？ 

 	5、解释一下LINUX下线程，GDI类。 

 	

#### **❤3、输入输出系统**  	

 	1、Socket编程，BIO，NIO，epoll？ 

 	

#### **❤4、存储器管理**  	

 	1、什么是页式存储？ 

 	2、操作系统里的内存碎片你怎么理解，有什么解决办法？ 

 	

#### **❤5、处理机调度与死锁**  	

 	1、什么情况下会发生死锁，解决策略有哪些？

 	2、系统CPU使用率比较高是什么原因？

 	3、系统如何提高并发性？

 	

### 八、算法与数据结构

#### **❤1、哈希** 

 	3、一致性哈希算法。



#### **❤2、树** 

 	1、说一下B+树和B-树？

 	3、二叉树层序遍历，进一步提问：要求每层打印出一个换行符？

 	4、二叉树任意两个节点之间路径的最大长度？

 	6、如何打印二叉树每层的节点？

 	7、TreeMap和TreeSet在排序时如何比较元素？Collections工具类中的sort()方法如何比较元素？



#### **❤3、遍历**

 	1、编程题：写一个函数，找到一个文件夹下所有文件，包括子文件夹？

 	2、二叉树 Z 字型遍历？

 	

#### **❤4、链表**  

 	2、随机链表的复制 

 	3、链表-奇数位升序偶数位降序-让链表变成升序？

 	4、HashMap中的 bucket 如果用链表存储，它的缺点是什么？ 

 	5、如何判断链表检测环？



#### **❤5、数组**  

 	1、寻找一数组中前K个最大的数？

 	2、求一个数组中连续子向量的最大和？

 	3、找出数组中和为S的一对组合，找出一组就行？

 	4、一个数组，除一个元素外其它都是两两相等，求那个元素? 



#### **❤6、排序** 

 	2、如何得到一个数据流中的中位数？

 	3、堆排序的原理是什么？

 	4、归并排序的原理是什么？



#### **❤8、队列**

 	1、什么是Java优先级队列(Priority Queue)？ 

 	

#### **❤9、高级算法**  

 	1、Design and implement a data structure for Least Frequently Used (LFU) cache. It should support the following operations: get and put. 

 	get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1. 

 	put(key, value) - Set or insert the value if the key is not already present. When the cache reaches its capacity, it should invalidate the least frequently used item before inserting a new item. For the purpose of this problem, when there is a tie (i.e., two or more keys that have the same frequency), the least recently used key would be evicted. 

 	Could you do both operations in O(1) time complexity? 

 	2、id全局唯一且自增，如何实现？ 

 	3、如何设计算法压缩一段URL？ 

 	4、为什么要设计后缀表达式，有什么好处？ 

 	5、LRU算法的实现原理？ 

 	

### 十、场景题 

#### **❤1、场景题汇总**  

​	1、如果一个外卖配送单子要发布，现在有200个骑手都想要接这一单，如何保证只有一个骑手接到单子？

 	2、美团首页每天会从10000个商家里面推荐50个商家置顶，每个商家有一个权值，你如何来推荐？第二天				怎么更新推荐的商家？

​	 可以借鉴下stackoverflow，视频网站等等的推荐算法。

 	3、微信抢红包问题

 	悲观锁，乐观锁，存储过程放在mysql数据库中。

 	4、1000个任务，分给10个人做，你怎么分配，先在纸上写个最简单的版本，然后优化。

 	全局队列，把1000任务放在一个队列里面，然后每个人都是取，完成任务。

​	分为10个队列，每个人分别到自己对应的队列中去取务。

 	5、保证发送消息的有序性，消息处理的有序性。

 	6、如何把一个文件快速下发到100w个服务器

 	7、给每个组分配不同的IP段，怎么设计一种结构使的快速得知IP是哪个组的?

 	9、有几台机器存储着几亿淘宝搜索日志，你只有一台2g的电脑，怎么选出搜索热度最高的十个搜索关键词？

 	10、分布式集群中如何保证线程安全？

 	11、给个淘宝场景，怎么设计一消息队列？

 	12、10万个数，输出从小到大？

 		先划分成多个小文件，送进内存排序，然后再采用多路归并排序。
